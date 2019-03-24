import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import AppRoute from './routes/app'

class App extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" component={AppRoute} />
            </Switch>
        )
    }
}

export default App;
