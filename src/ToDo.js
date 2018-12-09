import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const ToDo = props => (
    <Paper>
        <div>
                <TextField
                hintText={'Add Task'}
                value={}
                onChange={}
                />
                <RaisedButton
                label='Add task'
                primary={true}
                onClick={}
                />
                <TextField
                hintText='Task Filter'
                onChange={}
                />
                <RaisedButton
                label='All task'
                primary={true}
                onClick={}
                />
                <RaisedButton
                label='Completed task'
                primary={true}
                onClick={}
                />
                <RaisedButton
                label='Task to do'
                primary={true}
                onClick={}
                />
        </div>
    </Paper>
)

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})