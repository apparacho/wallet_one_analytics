import React, { Component, Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PageHeader from '../components/nav/top/page-header'
import LeftNavPanel from '../components/nav/left/left-nav-panel'
import TemplatesPage from './templates-page'
import ReportsPage from './reports-page'
import ClientsPage from './clients-page'

class AppRoute extends Component {
    static propTypes = {}

    componentDidMount() {
        this.setBodyStyles()
    }

    setBodyStyles() {
        document.body.classList.add( "skin-blue", "sidebar-mini");
        document.getElementById('root').classList.add("wrapper");
    }

    render() {
        return (
            <Fragment>
                <PageHeader />
                <LeftNavPanel {...this.props} />
                <div className="content-wrapper">
                    <section className="content container-fluid">
                        <Switch>
                            <Route path="/reports" component={ReportsPage} />
                            <Route path="/templates" component={TemplatesPage} />
                            <Route path="/clients" component={ClientsPage} />
                            <Redirect to="/templates" />
                        </Switch>
                    </section>
                </div>
            </Fragment>
        )
    }
}

export default AppRoute
