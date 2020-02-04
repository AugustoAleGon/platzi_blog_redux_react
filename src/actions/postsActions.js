import axios from 'axios';
import { LOADING, ERROR, UPDATE_POSTS, COMMENT_LOADING, COMMENT_ERROR, UPDATE_COMMENTS } from '../types/postsTypes';
import { FETCH_USERS } from '../types/usersTypes';

export const fetchPostsByUserId = (key) => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    });
    const { users } = getState().usersReducer;
    const { posts } = getState().postsReducer;
    const userId = users[key].id;
    try {
    
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

        const newPosts = response.data.map((post) => {
            return {
                ...post,
                comments: [],
                isOpen: false
            }
        });
        const updatedPosts = [...posts, newPosts];
        const postsKey = updatedPosts.length - 1;
    
        let updatedUsers = [...users];
        updatedUsers[key] = {
            ...users[key],
            postsKey
        }
        dispatch({
            type: UPDATE_POSTS,
            payload: updatedPosts
        });
        dispatch({
            type: FETCH_USERS,
            payload: updatedUsers
        });   
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.message
        })
    }
}

export const openClose = (postsKey, commentKey) => (dispatch, getState) => {
    const { posts } = getState().postsReducer;
    const postSelected = posts[postsKey][commentKey];
    const updated = {
        ...postSelected,
        isOpen: !postSelected.isOpen
    };

    const postsUpdated = [...posts];
    postsUpdated[postsKey] = [
        ...posts[postsKey]
    ];
    postsUpdated[postsKey][commentKey] = updated;

    dispatch({
        type: UPDATE_POSTS,
        payload: postsUpdated
    })
}

export const fetchCommentsByPostId = (postsKey, commentKey) => async(dispatch, getState) => {
    const { posts } = getState().postsReducer;
    const postSelected = posts[postsKey][commentKey];
    dispatch({
        type: COMMENT_LOADING
    })
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${ postSelected.id }`);
        const updated = {
            ...postSelected,
            comments: response.data
        };
    
        const postsUpdated = [...posts];
        postsUpdated[postsKey] = [
            ...posts[postsKey]
        ];
        postsUpdated[postsKey][commentKey] = updated;
    
        dispatch({
            type: UPDATE_COMMENTS,
            payload: postsUpdated
        })   
    } catch (error) {
        dispatch({
            type: COMMENT_ERROR,
            payload: error.message
        })
    }
}