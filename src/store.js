import {createStore, applyMiddleware} from 'redux'

import reducer from './reducer'


export default function configureStore(initialState) {
    const store = createStore(
        reducer,
        initialState,
        applyMiddleware())
    if (module.hot) {
        module.hot.accept('./reducer', () => {
            store.replaceReducer(require('./reducer').default)
        })
    }
    return store
}
