import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import toDo from './state/toDo'
import auth from './state/auth'

import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducer = combineReducers({
    auth,
    toDo
})


export const store = createStore(

    reducer,

    composeEnhancers(

        applyMiddleware(thunk)

    )

)