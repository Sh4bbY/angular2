/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';
/**
 * storeLogger is a powerful metareducer that logs out each time we dispatch
 * an action.
 *
 * A metareducer wraps a reducer function and returns a new reducer function
 * with superpowers. They are handy for all sorts of tasks, including
 * logging, undo/redo, and more.
 */
import { storeLogger } from 'ngrx-store-logger';
/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';
/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

import { ITodoItem } from '../interfaces/todo-item';
import { IUser } from '../interfaces/user';
import { appReducer, IAppState } from './app.reducer';
import { userReducer } from './user.reducer';
import { todoReducer } from './todo.reducer';
import { blogReducer } from './blog.reducer';
import { IBlogPost } from '../interfaces/blog-post';
import { IChatMessage } from '../interfaces/chat-message';
import { chatReducer } from './chat.reducer';

export interface IRootState {
    app: IAppState;
    todo: ITodoItem[];
    user: IUser;
    blog: IBlogPost[];
    chat: IChatMessage[];
}

const reducers = {
    app : appReducer,
    todo: todoReducer,
    user: userReducer,
    blog: blogReducer,
    chat: chatReducer,
};

let actionReducer;

if (process.env.NODE_ENV === 'development') {
    actionReducer = compose(storeFreeze, storeLogger({collapsed: true}), combineReducers)(reducers);
} else {
    actionReducer = combineReducers(reducers);
}
export const rootReducer = actionReducer;
