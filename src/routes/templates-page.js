import React, { Component, Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import TemplateEditPage from '../components/reporttemplates/template-edit-page'
import TemplateListPage from '../components/reporttemplates/templates-list-page'

class TemplatesPage extends Component {
    static propTypes = {}

    render() {
        return (
            <Fragment>
                <section className="content-header">
                    <h1>Шаблоны</h1>
                </section>
                <section className="content">
                    <Switch>
                        <Route path="/templates/edit" component={TemplateEditPage} />
                        <Route path="/templates" component={TemplateListPage} />
                        <Redirect to="/templates" />
                    </Switch>
                </section>
            </Fragment>
        )
    }
}

export default TemplatesPage