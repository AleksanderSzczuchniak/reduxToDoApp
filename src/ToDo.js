import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import IconButton from 'material-ui/IconButton'
import { List, ListItem } from 'material-ui/List'
import { Checkbox } from 'material-ui'


import {
    toogleTasksAsyncAction,
    filterInputChange,
    deleteTaskAsyncAction,
    addTaskAsyncAction,
    addTaskInputChange,
    showCompleteTaskAction,
    showUncompleteTaskAction,
    showTasks
} from './state/toDo'

const ToDo = props => (
    <Paper>
        <TextField
            hintText='Zapisz nowe zadanie'
            value={props._textTask}
            onChange={props._addTaskInputChange}
        />
        <div>

            <RaisedButton
                label='Dodaj zadanie'
                primary={true}
                onClick={props._addTaskAsyncAction}
            />
        </div>
        <br />
        <TextField
            hintText='Szukaj zadania'
            onChange={props._filterInputChange}
        />
        <div>

            <RaisedButton
                label='Wszystkie zadaania'
                primary={true}
                onClick={props._showTasks}
            />
        </div>
        <div>

            <RaisedButton
                label='Zadania wykonane'
                primary={true}
                onClick={props._showCompleteTaskAction}
            />
        </div>
        <div>

            <RaisedButton
                label='Zadania niewykonane'
                primary={true}
                onClick={props._showUncompleteTaskAction}
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
                                    defaultChecked={todo.completed}
                                    onCheck={() => props._toggleTasksAsyncAction(todo)}
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
    _allToDos: state.toDo.allToDos,
    _visibleToDos: state.toDo.visibleToDos,
    _textTask: state.toDo.textTask,
    _currentfilter: state.toDo.currentfilter

})

const mapDispatchToProps = dispatch => ({
    _addTaskAsyncAction: () => dispatch(addTaskAsyncAction()),
    _filterInputChange: event => dispatch(filterInputChange(event.target.value)),
    _showTasks: () => dispatch(showTasks()),
    _showCompleteTaskAction: () => dispatch(showCompleteTaskAction()),
    _addTaskInputChange: (event) => dispatch(addTaskInputChange(event.target.value)),
    _toggleTasksAsyncAction: (task) => dispatch(toogleTasksAsyncAction(task)),
    _showUncompleteTaskAction: () => dispatch(showUncompleteTaskAction()),
    _deleteTaskAsyncAction: (key) => dispatch(deleteTaskAsyncAction(key))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToDo)