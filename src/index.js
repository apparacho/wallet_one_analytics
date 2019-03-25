import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import App from './App'
import store from './redux'
import history from './history'
import { setHttpRequestsDefault } from './ducks/http'

import 'bootstrap/dist/css/bootstrap.css'
import 'admin-lte/bower_components/font-awesome/css/font-awesome.css'
import 'admin-lte/bower_components/Ionicons/css/ionicons.css'
import 'admin-lte/dist/css/AdminLTE.css'
import 'admin-lte/dist/css/skins/_all-skins.css'

import 'antd/dist/antd.css'

setHttpRequestsDefault()

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)
