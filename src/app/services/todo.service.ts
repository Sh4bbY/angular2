import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { IRootState } from '../reducers/index';
import {
    ADD_TODO_ITEM, ADD_TODO_LIST, REMOVE_TODO_ITEM, REMOVE_TODO_LIST, TOGGLE_TODO_ITEM, UPDATE_TODO_ITEM,
    LOAD_TODO_LISTS, UPDATE_TODO_LIST,
} from '../reducers/todo.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class TodoService {
    
    constructor(private http: Http, private store: Store<IRootState>) {
    }
    
    addList(title: string) {
        return this.http.post('/api/todo/list', { title })
            .map(res => this.store.dispatch({ type: ADD_TODO_LIST, payload: res.json() }));
    }
    
    updateListTitle(id: string, title: string) {
        return this.http.put('/api/todo/' + id, { title })
            .map(res => this.store.dispatch({ type: UPDATE_TODO_LIST, payload: res.json() }));
    }
    
    removeList(id: string) {
        return this.http.delete('/api/todo/' + id)
            .map(res => this.store.dispatch({ type: REMOVE_TODO_LIST, payload: id }));
    }
    
    fetchLists() {
        return this.http.get('/api/todo/lists')
            .map(res => this.store.dispatch({ type: LOAD_TODO_LISTS, payload: res.json() }));
    }
    
    addItem(listId: string, text: string) {
        return this.http.post(`/api/todo/${listId}/item`, { text })
            .map(res => this.store.dispatch({ type: ADD_TODO_ITEM, payload: { listId: listId, item: res.json() } }));
    }
    
    removeItem(listId: string, itemId: string) {
        return this.http.delete(`/api/todo/${listId}/item/${itemId}`)
            .map(res => this.store.dispatch({ type: REMOVE_TODO_ITEM, payload: { listId, itemId } }));
    }
    
    updateItem(listId: string, itemId: string, text: string) {
        return this.http.put(`/api/todo/${listId}/item/${itemId}`, { text })
            .map(res => this.store.dispatch({ type: UPDATE_TODO_ITEM, payload: { listId, itemId, text } }));
    }
    
    toggleItem(listId: string, itemId: string) {
        return this.http.put(`/api/todo/${listId}/item/${itemId}/toggle`, {})
            .map(res => this.store.dispatch({
                type   : TOGGLE_TODO_ITEM,
                payload: { listId, itemId, complete: res.json().complete },
            }));
    }
}
