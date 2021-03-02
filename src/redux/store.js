import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import gamesReducer from './games-reducer';
import detailsReducer from './details-reducer';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
	games: gamesReducer,
	details: detailsReducer
});

//Chrome-extension (REDUX)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
export default store;