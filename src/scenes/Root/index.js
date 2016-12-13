import React, {PropTypes} from 'react'
import {Provider} from 'react-redux'
import Ciphers from 'root/scenes/Ciphers'

function Root({store}) {
    return (
        <Provider store={store}>
            <Ciphers />
        </Provider>)
}
Root.propTypes = {
    store: PropTypes.object.isRequired,
}
export default Root
