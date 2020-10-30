import {createStore, applyMiddleware, compose} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {createWrapper} from "next-redux-wrapper";
import {counter, initialState} from "../reducers";

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
    return createStore(
        counter,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
    )
}
// create a makeStore function
// const makeStore = context => createStore(counter);


// export an assembled wrapper
export default createWrapper(makeStore, {debug: true})
