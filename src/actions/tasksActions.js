import axios from 'axios';
import {
    LOADING,
    FETCH_TASKS,
    ERROR,
    CHANGE_USER_ID,
    CHANGE_TITLE,
    TASK_SAVE,
    TASK_UPDATE,
    CLEAN
} from '../types/tasksTypes';

export const fetchTasks = () => async(dispatch) => {
    dispatch({
        type: LOADING
    });
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

        const tasks = {};
        response.data.map((task) => (
            tasks[task.userId] = {
                ...tasks[task.userId],
                [task.id]: {
                    ...task
                }
            }
        ))
        dispatch({
            type: FETCH_TASKS,
            payload: tasks
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.message
        })
    }
}

export const changeUserId = (userId) => (dispatch) => {
    dispatch({
        type: CHANGE_USER_ID,
        payload: userId
    })
}

export const changeTitle = (title) => (dispatch) => {
    dispatch({
        type: CHANGE_TITLE,
        payload: title
    })
}

export const add = (task) => async(dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', task);
        dispatch({
            type: TASK_SAVE,
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.message
        })
    }
}

export const editTask = (newTask) => async(dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${newTask.id}`, newTask);
        dispatch({
            type: TASK_SAVE,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.message
        })
    }
}

export const changeCheckbox = (userId, taskId) => (dispatch, getState) => {
    const { tasks } = getState().tasksReducer;
    const selected = tasks[userId][taskId];

    const updated = {
        ...tasks
    };

    updated[userId] = {
        ...tasks[userId]
    }

    updated[userId][taskId] = {
        ...tasks[userId][taskId],
        completed: !selected.completed
    }

    dispatch({
        type: TASK_UPDATE,
        payload: updated
    })
}

export const deleteTask = (taskId) => async(dispatch) => {
    dispatch({
        type: LOADING
    })
    try {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${taskId}`);
        dispatch({
            type: FETCH_TASKS,
            payload: {}
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.message
        })
    }
}

export const cleanForm = () => (dispatch) => {
    dispatch({
        type: CLEAN
    })
}