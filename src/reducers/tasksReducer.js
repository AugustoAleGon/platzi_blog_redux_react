import {
    FETCH_TASKS,
    LOADING,
    ERROR,
    CHANGE_USER_ID,
    CHANGE_TITLE,
    TASK_SAVE,
    TASK_UPDATE,
    CLEAN
} from "../types/tasksTypes";

const INITIAL_STATE = {
    tasks: {},
    loading: false,
    error: null,
    userId: '',
    title: '',
    turnBack: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_TASKS:
            return {
                ...state,
                tasks: action.payload,
                loading: false,
                turnBack: false
            }
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CHANGE_USER_ID:
            return {
                ...state,
                userId: action.payload
            }
        case CHANGE_TITLE:
            return {
                ...state,
                title: action.payload
            }
        case TASK_SAVE:
            return {
                ...state,
                tasks: {},
                loading: false,
                error: null,
                turnBack: true,
                userId: '',
                title: ''
            }
        case TASK_UPDATE:
            return {
                ...state,
                tasks: action.payload
            }
        case CLEAN:
            return {
                ...state,
                title: '',
                userId: ''
            }
        default:
            return state
    }
}