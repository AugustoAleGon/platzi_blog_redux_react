import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import { Redirect } from 'react-router-dom';

import * as tasksActions from '../../actions/tasksActions';

class Save extends React.Component {

    componentDidMount() {
        const {
            match: { params: { userId, taskId }},
            tasks: { tasks },
            changeUserId,
            changeTitle,
            cleanForm
        } = this.props; 

        if(userId && taskId) {
            try {
                const task = tasks[userId][taskId];
                changeUserId(task.userId)
                changeTitle(task.title)
            } catch (error) {
                console.log('Fail trying to change User Id');
            }
        } else {
            cleanForm();
        }
    }

    changeUserId = (event) => {
        this.props.changeUserId(event.target.value);
    }

    changeTitle = (event) => {
        this.props.changeTitle(event.target.value)
    }

    saveData = () => {
        const {
            add,
            match: { params: { userId, taskId }},
            tasks,
            editTask
        } = this.props;

        const newTask = {
            userId: tasks.userId,
            title: tasks.title,
            completed: false
        };

        if (userId && taskId) {
            const task = tasks[userId][taskId];
            const editedTask = {
                ...newTask,
                completed: task.completed,
                id: task.id
            };
            editTask(editedTask)
        } else {
            add(newTask)
        }

    }

    disable = () => {
        const { userId, title, loading } = this.props.tasks;

        if(loading) {
            return true
        }

        if (!userId || !title) {
            return true
        }

        return false
    }

    showActions = () => {
        const { loading, error } = this.props.tasks;

        if(loading) {
            return <Spinner />
        }

        if(error) {
            return <Fatal error={error} />
        }
    }

    render () {
        return (
            <div>
                {
                    this.props.tasks.turnBack ? <Redirect to='/tasks' /> : null
                }
                <h1>Save Task</h1>
                User Id:
                <input
                    type='number'
                    value={ this.props.tasks.userId }
                    onChange={this.changeUserId}
                />
                <br />
                <br />
                Title:
                <input
                    value={ this.props.tasks.title }
                    onChange={this.changeTitle} />
                <br />
                <br />
                <button
                    onClick={ this.saveData }
                    disabled={ this.disable() }
                >
                    Save
                </button>
                {
                    this.showActions()
                }
            </div>
        );
    }
}

const mapStateToProps = (reducer) => {
    return {
        tasks: reducer.tasksReducer
    }
}

export default connect(mapStateToProps, tasksActions)(Save);