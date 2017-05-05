import { Action } from '@ngrx/store';
import { ITodoList } from '../interfaces/todo-list';
import { ITodoItem } from '../interfaces/todo-item';

export const LOAD_TODO_LISTS  = 'LOAD_TODO_LISTS';
export const ADD_TODO_LIST    = 'ADD_TODO_LIST';
export const REMOVE_TODO_LIST = 'REMOVE_TODO_LIST';
export const ADD_TODO_ITEM    = 'ADD_TODO_ITEM';
export const REMOVE_TODO_ITEM = 'REMOVE_TODO_ITEM';
export const UPDATE_TODO_ITEM = 'UPDATE_TODO_ITEM';
export const TOGGLE_TODO_ITEM = 'TOGGLE_TODO_ITEM';


const initialState: ITodoList[] = [];

export const todoReducer = (state: ITodoList[] = initialState, { type, payload }: Action): ITodoList[] => {
    let targetList: ITodoList;
    let clonedList: ITodoList;
    let targetItem: ITodoItem;
    let clonedItem: ITodoItem;
    
    switch (type) {
        case LOAD_TODO_LISTS:
            return payload;
        
        case REMOVE_TODO_LIST:
            return state.filter(list => list._id !== payload);
        
        case ADD_TODO_LIST:
            return [ payload, ...state ];
        
        case ADD_TODO_ITEM:
            targetList       = Object.assign({}, state.find(list => list._id === payload.listId));
            targetList.items = [ ...targetList.items, payload.item ];
            return [ ...state.map(list => (list._id === payload.listId) ? targetList : list) ];
        
        case REMOVE_TODO_ITEM:
            targetList       = Object.assign({}, state.find(list => list._id === payload.listId));
            targetList.items = targetList.items.filter(item => item._id !== payload.itemId);
            return [ ...state.map(list => (list._id === payload.listId) ? targetList : list) ];
        
        case UPDATE_TODO_ITEM:
            targetList       = state.find(list => list._id === payload.listId);
            targetItem       = targetList.items.find(item => item._id === payload.itemId);
            clonedItem       = Object.assign({}, targetItem);
            clonedItem.text  = payload.text;
            clonedList       = Object.assign({}, targetList);
            clonedList.items = targetList.items.map(item => (item._id === payload.itemId) ? clonedItem : item);
            
            return state.map(list => (list._id === payload.listId) ? clonedList : list);
        
        case TOGGLE_TODO_ITEM:
            targetList          = state.find(list => list._id === payload.listId);
            targetItem          = targetList.items.find(item => item._id === payload.itemId);
            clonedItem          = Object.assign({}, targetItem);
            clonedItem.complete = payload.complete;
            clonedList          = Object.assign({}, targetList);
            clonedList.items    = targetList.items.map(item => (item._id === payload.itemId) ? clonedItem : item);
            
            return state.map(list => (list._id === payload.listId) ? clonedList : list);
        
        default:
            return state;
    }
};
