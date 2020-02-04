import { FETCH_USERS, LOADING, ERROR } from '../types/usersTypes';

const INITIAL_STATE = {
    users: [],
    loading: false,
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return { ...state, users: action.payload, loading: false }
        case LOADING:
            return {...state, loading: true }
        case ERROR:
            return {...state, loading: false, error: action.payload }
        default:
            return state;
    }
}