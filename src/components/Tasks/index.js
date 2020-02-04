import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as tasksAction from '../../actions/tasksActions';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

import '../styles/Tasks.css'
import equal from 'deep-equal';

class Task extends Component {

    componentDidMount () {
        if (!Object.keys(this.props.tasks.tasks).length) {
            this.props.fetchTasks();
        }
    }

    componentDidUpdate (prevProps) {
        const { loading } = this.props;
        if (!(Object.keys(this.props.tasks.tasks).length) && !loading && !equal(prevProps.tasks.tasks, this.props.tasks.tasks)) {
            this.props.fetchTasks();
            console.log('Props: ', this.props)
        }
    }

    displayTask = () => {
        const { tasks, loading, error } = this.props.tasks

        if (loading) {
            return <Spinner />
        }
        if (error) {
            return <Fatal error={error} />
        }

        return Object.keys(tasks).map((userId) => (
            <div key={userId}>
                <h2>Usuario {userId}</h2>
                <div className='task-container'>
                    {this.getTasksByUserId(userId)}
                </div>
            </div>
        ))
    }

    getTasksByUserId = (userId) => {
        const { tasks } = this.props.tasks;
        const { changeCheckbox, deleteTask } = this.props;
        const taskByUserId = {
            ...tasks[userId]
        };

        return Object.keys(taskByUserId).map(taskId => (
            <div key={taskId}>
                <input
                    type="checkbox"
                    defaultChecked={taskByUserId[taskId].completed}
                    onChange={ () => changeCheckbox(userId, taskId)} />
                {taskByUserId[taskId].title}
                <button className="m-left">
                    <Link to={`/tasks/save/${userId}/${taskId}`}>
                        Edit
                    </Link>
                </button>
                <button className="m-left" onClick={() => deleteTask(taskId)}>
                        Delete
                </button>
            </div>
        ))
    }

    render () {
        return (
            <div>
                <button>
                    <Link to="/tasks/save">
                        Add Tasks
                    </Link>
                </button>
                { this.displayTask() }
            </div>
        )
    }
}

const mapStateToProps = (reducer) => {
    return {
        tasks: reducer.tasksReducer
    }
}

const mapDispatchToProps = {
    ...tasksAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);