import React, { Component, Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ReportList from "../components/reports/report-list"
import ReportView from "../components/reports/report-view"

class ReportsPage extends Component {
    static propTypes = {}

    render() {
        return (
            <Fragment>
                <section className="content-header">
                    <h1>Отчеты</h1>
                </section>
                <section className="content">
                    <Switch>
                        <Route path={`${this.props.match.path}/:id([0-9]+)`} component={ReportView} />
                        <Route path={this.props.match.path} component={ReportList} />
                        <Redirect to={this.props.match.path} />
                    </Switch>
                </section>
            </Fragment>
        )
    }
}

export default ReportsPage