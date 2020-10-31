import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import {counter} from "../reducers";
import {routerReducer,createRouterMiddleware,initialRouterState} from "connected-next-router";
import {format} from "url";
import Router from 'next/router'
import {initialState} from "../reducers/initialState";

const makeStore = context => {
    let composeEnhancers = compose;

// If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
    if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
        composeEnhancers = composeWithDevTools;
        // NOTE: Uncomment the code below to restore support for Redux Saga
        // Dev Tools once it supports redux-saga version 1.x.x
        // if (window.__SAGA_MONITOR_EXTENSION__)
        //   reduxSagaMonitorOptions = {
        //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
        //   };
    }
    const middlewares = [thunk,createRouterMiddleware()];
    const { asPath, pathname, query } = context.ctx || Router.router || {};
    const combinedReducer = combineReducers({
        counter: counter,
        router: routerReducer,
    })
    const reducer = (state, action) => {
        if (action.type === HYDRATE) {
            const nextState = {
                ...state, // use previous state
                ...action.payload, // apply delta from hydration
            }
            if (typeof window !== 'undefined' && state?.router) {
                // preserve router value on client side navigation
                nextState.router = state.router
            }
            return nextState
        } else {
            return combinedReducer(state, action)
        }
    }
    return createStore(
        reducer,
        {
            ...initialState,
            router: asPath?initialRouterState(format({ pathname, query }), asPath):null
        },
        composeEnhancers(applyMiddleware(...middlewares))
    )
}
// create a makeStore function
// const makeStore = context => createStore(counter);


// export an assembled wrapper
export default createWrapper(makeStore, {debug: true})
