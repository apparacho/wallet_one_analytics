import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { templatesSelector, fetchAllTemplates } from '../../ducks/templates'
import TemplatesTable from './templates-table'
import { NavLink } from 'react-router-dom'
import { Button } from 'antd'

class TemplateListPage extends Component {
    static propTypes = {}

    componentDidMount() {
      this.props.fetchAllTemplates()
    }

    render() {
        return (
            <Fragment>
                <br/>
                <div style={{ width: '100%', marginBottom: '10px'}}>
                    <span style={{ fontSize: '18px', lineHeight: '32px' }} > Мои шаблоны </span>
                    <NavLink to="/templates/edit" >
                        <Button style={{ float: 'right' }} > Новый шаблон </Button>
                    </NavLink>
                </div>
                <TemplatesTable tableData={this.props.templates} style={{ marginTop: '20px' }} />

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
