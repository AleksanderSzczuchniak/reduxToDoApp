import { database } from '../firebaseConfig'
import { filterArray } from '../utils'


const Add_Task = 'toDo/Add_Task'
const Render_Tak_List = 'toDo/Render_Tak_List'
const Add_Task_Cleaner = 'toDo/Add_Task_Cleaner'
const Filter_Task = 'toDo/Filter_Task'
const Completed_Tasks = 'toDo/Completed_Tasks'
const Tasks_ToDo = 'toDo/Tasks_ToDo'
const All_Tasks = 'toDo/All_Tasks'

const dbRef = uuid => (`users/${uuid}/tasks/`)


const INITIAL_STATE = {
    allToDos: null,
    visibleToDos: null,
    filterToDo: '',
    newTaskText: ''
}

export const toggleToDoAsyncAction = (task) => (dispatch, getState) => {
    const uuid = getState().auth.user.uid

    database.ref(dbRef(uuid) + `${task.key}`).update({
        completed: !task.completed
    })
}

export const deleteTaskAsyncAction = (key) => (dispatch, getState) => {
    const uuid = getState().auth.user.uid

    database.ref(dbRef(uuid)).child(key).remove()
}

export const getTasksListFromDbAsyncAction = () => (dispatch, getState) => {
    const uuid = getState().auth.user.uid

    database.ref(dbRef(uuid)).on(
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

export const addNewTaskToDbAsyncAction = () => (dispatch, getState) => {
    const uuid = getState().auth.user.uid
    const newTask = getState().toDo.newTaskText

    database.ref(dbRef(uuid)).push({
        text: newTask,
        completed: false
    })

    dispatch(cleanAddTask())
}

const renderTaskList = tasks => ({
    type: Render_Tak_List,
    tasks
})

const cleanAddTask = () => ({
    type: Add_Task_Cleaner
})

export const showAllTasks = () => ({
    type: All_Tasks
})

export const showTasksToDo = () => ({
    type: Tasks_ToDo
})

export const showCompletedTasks = () => ({
    type: Completed_Tasks
})

export const filterInputChange = text => ({
    type: Filter_Task,
    text
})

export const addTaskInputChange = text => ({
    type: Add_Task,
    text
})

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Add_Task:
            return {
                ...state,
                newTaskText: action.text
            }
        case Render_Tak_List:
            return {
                ...state,
                allToDos: action.tasks,
                visibleToDos: filterArray(action.tasks, state.filterToDo)
            }
        case Add_Task_Cleaner:
            return {
                ...state,
                newTaskText: ''
            }
        case Filter_Task:
            return {
                ...state,
                filterToDo: action.text,
                visibleToDos: filterArray(state.allToDos, action.text)
            }
        case All_Tasks:
            return {
                ...state,
                visibleToDos: filterArray(state.allToDos, state.filterToDo)
            }
        case Completed_Tasks:
            return {
                ...state,
                visibleToDos: filterArray(state.allToDos
                    .filter(todo => todo.completed === true),
                    state.filterToDo)
            }
        case Tasks_ToDo:
            return {
                ...state,
                visibleToDos: filterArray(state.allToDos
                    .filter(todo => todo.completed === false),
                    state.filterToDo)
            }
        default:
            return state
    }
}