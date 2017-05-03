import { Action } from '@ngrx/store';
import { IBlogPost } from '../interfaces/blog-post';

export const LOAD_BLOG_POSTS  = 'LOAD_BLOG_POSTS';
export const CREATE_BLOG_POST = 'CREATE_BLOG_POST';
export const UPDATE_BLOG_POST = 'UPDATE_BLOG_POST';
export const DELETE_BLOG_POST = 'DELETE_BLOG_POST';

const initialState: IBlogPost[] = [];

export const blogReducer = (state: IBlogPost[] = initialState, { type, payload }: Action): IBlogPost[] => {
    switch (type) {
        case LOAD_BLOG_POSTS:
            return payload;
        
        case CREATE_BLOG_POST:
            return [ ...state, payload ];
        
        case UPDATE_BLOG_POST:
            return state.map(post => (post._id === payload._id) ? payload : post);
        
        case DELETE_BLOG_POST:
            return state.filter(post => post._id !== payload._id);
        
        default:
            return state;
    }
};
