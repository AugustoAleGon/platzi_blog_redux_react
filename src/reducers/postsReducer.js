import {
    LOADING,
    ERROR,
    UPDATE_POSTS,
    COMMENT_LOADING,
    COMMENT_ERROR,
    UPDATE_COMMENTS
} from '../types/postsTypes';

const INITIAL_STATE = {
    posts: [],
    loading: false,
    error: null,
    commentLoading: false,
    commentError: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
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
        case UPDATE_COMMENTS:
            return {
                ...state,
                posts: action.payload,
                commentLoading: false
            }
        case COMMENT_LOADING:
            return {
                ...state,
                commentLoading: true
            }
        case COMMENT_ERROR:
            return {
                ...state,
                commentLoading: false,
                commentError: action.payload
            }
        default:
            return state;
    }
}