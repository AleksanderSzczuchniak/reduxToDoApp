import { database } from '../firebaseConfig'

const ADD_TODO_INPUT = 'todo/ADD_TODO_INPUT'
const SHOW_TASKS = 'todo/SHOW_TASKS'
const SHOW_COMPLETE_TASK = 'todo/SHOW_COMPLETE_TASK'
const RENDER_LIST = 'todo/RENDER_LIST'
const DELETE_TASK = 'todo/DELETE_TASK'
const SHOW_UNCOMPLETE_TASK = 'todo/SHOW_UNCOMPLETE_TASK'
const FILTER_INPUT = 'todo/FILTER_INPUT'

const INITIAL_STATE = {
    visibleToDos: [],
    currentFilter: '',
    textTask: '',
    allToDos: [],
    isCompleted: false,
};

export const toogleTasksAsyncAction = (task) => (dispatch, getState) => {
    const uuid = getState().auth.user.uid

    database.ref(`users/${uuid}/tasks/${task.key}`).update({
        completed: !task.completed
    })
}

export const addTaskAsyncAction = () => (dispatch, getState) => {
    const newTask = getState().toDo.textTask
    const uuid = getState().auth.user.uid

    database.ref(`users/${uuid}/tasks`).push({
        text: newTask,
        completed: false
    })
}

export const deleteTaskAsyncAction = (key) => (dispatch, getState) => {
    const uuid = getState().auth.user.uid

    database.ref(`users/${uuid}/tasks`).child(key).remove()
}



export const tasksListAsyncAction = () => (dispatch, getState) => {
    const uuid = getState().auth.user.uid
    database.ref(`users/${uuid}/tasks`).on(
        'value',
        snapshot => {
            if (snapshot.val()) {
                const tasks = Object.entries(
                    snapshot.val()
                ).map(entry => ({
                    ...entry[1],
                    key: entry[0]
                }))
                dispatch(renderTaskList(tasks))
            } else {
                dispatch(renderTaskList(null))
            }
        }

    )
}

const renderTaskList = tasks => ({
    type: RENDER_LIST,
    tasks
})
export const addTaskInputChange = text => ({
    type: ADD_TODO_INPUT,
    text
})

export const showCompleteTaskAction = () => ({
    type: SHOW_COMPLETE_TASK
})

export const showUncompleteTaskAction = () => ({
    type: SHOW_UNCOMPLETE_TASK
})

export const showTasks = () => ({
    type: SHOW_TASKS
})

export const filterInputChange = text => ({
    type: FILTER_INPUT,
    text
})


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RENDER_LIST:
            return {
                ...state,
                allToDos: action.tasks,
                visibleToDos: action.tasks
            }
        case ADD_TODO_INPUT:
            return {
                ...state,
                textTask: action.text
            }
        case FILTER_INPUT:
            return {
                ...state,
                currentFilter: action.input,
                visibleToDos: state.allToDos
                    .filter(task =>
                        task.textTask
                            .toLowerCase()
                            .replace(/\s/g, '')
                            .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                            .includes(state.filter
                                .toLowerCase()
                                .replace(/\s/g, '')
                                .normalize('NFD').replace(/[\u0300-\u036f]/g, "")))
            }
        case DELETE_TASK:
            return {
                ...state,
                textTask: ''
            }
        case SHOW_TASKS:
            return {
                ...state,
                visibleToDos: state.allToDos
                    .map(task => task)
            }
        case SHOW_COMPLETE_TASK:
            return {
                ...state,
                visibleToDos: state.allToDos
                    .filter(task => task.isCompleted)
            }
        case SHOW_UNCOMPLETE_TASK:
            return {
                ...state,
                visibleToDos: state.allToDos
                    .filter(task => !task.isCompleted)
            }
        default:
            return state
    }
}