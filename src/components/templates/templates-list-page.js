import React, {PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { templatesSelector, fetchAllTemplates } from '../../ducks/templates'

class TemplateListPage extends PureComponent {
    static propTypes = {}

    componentDidMount() {
      this.props.fetchAllTemplates()
    }

    render() {
        return (
            <Fragment>
                <h1>Template List Page </h1>

                <p>List</p>

                <ul>
                    { this.props.templates.map((template) => <li> {template.name} | id: { template.id } </li> ) }
                </ul>

            </Fragment>
          )
    }
}

export default connect(
    (state) => ({
        templates: templatesSelector(state)
    }),
    { fetchAllTemplates }
)(TemplateListPage)
