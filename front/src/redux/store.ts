import { createStore, combineReducers, applyMiddleware } from 'redux';
import { launchesReducer } from './launches/reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  launches: launchesReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));