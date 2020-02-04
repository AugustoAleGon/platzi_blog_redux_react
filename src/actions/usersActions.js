import axios from 'axios';
import { FETCH_USERS, LOADING, ERROR } from '../types/usersTypes';

export const fetchUsers = () => async(dispatch) => {
    dispatch({
        type: LOADING
    });
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        dispatch({
            type: FETCH_USERS,
            payload: response.data
        })   
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.message
        })
    }
}