import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../Reducers'

export let store = createStore(rootReducer, applyMiddleware(thunk));