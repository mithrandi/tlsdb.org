import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import { FocusStyleManager } from '@blueprintjs/core'

import configureStore from 'root/store'
import 'style_root/index.scss'


const store = configureStore()

function render(Root) {
    FocusStyleManager.onlyShowFocusOnTabs()
    ReactDOM.render(
        <AppContainer>
            <Root store={store} />
        </AppContainer>,
        document.getElementById('app'))
}

if (module.hot) {
    module.hot.accept('./scenes/Root', () => {
        render(require('./scenes/Root').default)
    })
}

render(require('./scenes/Root').default)
