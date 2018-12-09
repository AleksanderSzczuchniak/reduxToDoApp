import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { List, ListItem } from 'material-ui/List'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import IconButton from 'material-ui/IconButton'
import { Checkbox } from 'material-ui'

import {
    addTaskInputChange,
    filterInputChange,
    showCompletedTasks,
    showTasksToDo,
    showAllTasks,
    addNewTaskToDbAsyncAction,
    toggleToDoAsyncAction,
    deleteTaskAsyncAction,
} from './state/todo'

const ToDo = props => (
    <Paper>
        <div>
            <TextField
                hintText='Add task'
                value={props._newTaskText}
                onChange={props._addTaskInputChangeAction}
                fullWidth={true}
            />
            <RaisedButton
                label='Add task'
                primary={true}
                onClick={props._addNewTaskToDbAsyncAction}
                fullWidth={true}
            />
            <TextField
                hintText='Find task'
                onChange={props._filterInputChangeAction}
                fullWidth={true}
            />
        </div>
        <div>
            <RaisedButton
                label='All tasks'
                secondary={true}
                onClick={props._showAllTasks}
            />
            <RaisedButton
                label='Completed tasks'
                secondary={true}
                onClick={props._showCompletedTasks}
            />
            <RaisedButton
                label='Uncompleted tasks'
                secondary={true}
                onClick={props._showTasksToDo}
            />
        </div>
        <List>
            {
                props._visibleToDos &&
                    props._visibleToDos.map ?
                    props._visibleToDos.map(todo =>
                        <ListItem
                            primaryText={todo.text}
                            key={todo.key}
                            style={todo.completed ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}
                            leftCheckbox={
                                <Checkbox
                                    checked={todo.completed}
                                    onCheck={() => props._toggleToDoAsyncAction(todo)}
                                />
                            }
                            rightIconButton={
                                <IconButton
                                    onClick={() => props._deleteTaskAsyncAction(todo.key)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                        />
                    )
                    : null
            }
        </List>
    </Paper>
)

const mapStateToProps = state => ({
    _newTaskText: state.todo.newTaskText,
    _allToDos: state.todo.allToDos,
    _filter: state.todo.filter,
    _visibleToDos: state.todo.visibleToDos
})

const mapDispatchToProps = dispatch => ({
    _showCompletedTasks: () => dispatch(showCompletedTasks()),
    _showTasksToDo: () => dispatch(showTasksToDo()),
    _showAllTasks: () => dispatch(showAllTasks()),
    _filterInputChange: event => dispatch(filterInputChange(event.target.value)),
    _addTaskInputChange: (event) => dispatch(addTaskInputChange(event.target.value)),
    _addNewTaskToDbAsyncAction: () => dispatch(addNewTaskToDbAsyncAction()),
    _toggleToDoAsyncAction: (task) => dispatch(toggleToDoAsyncAction(task)),
    _deleteTaskAsyncAction: (key) => dispatch(deleteTaskAsyncAction(key)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToDo)