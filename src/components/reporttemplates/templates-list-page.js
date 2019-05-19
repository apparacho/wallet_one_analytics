import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { templateListSelector, fetchTemplatesList, deleteTemplate } from '../../ducks/templates'
import TemplatesTable from './templates-table'
import { NavLink } from 'react-router-dom'
import { Button, Modal } from 'antd'

const confirm = Modal.confirm;

class TemplateListPage extends Component {
    static propTypes = {}

    componentDidMount() {
        this.props.fetchTemplatesList()
    }

    onDeleteTemplate = (row) => {
        this.showDeleteTemplateConfirm(row.id)
    }

    showDeleteTemplateConfirm = (reportId) => {
        confirm({
            title: 'Удаление шаблона',
            content: 'Вы действительно ходите удалить шаблон?',
            okText: 'Ок',
            cancelText: 'Отмена',
            onOk: () => {
                this.props.deleteTemplate(reportId);
            },
            onCancel() {},
        });
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
                <TemplatesTable
                    tableData={this.props.templateList}
                    onDeleteRow={this.onDeleteTemplate}
                    style={{ marginTop: '20px' }}
                />

            </Fragment>
          )
    }
}

export default connect(
    (state) => ({
        templateList: templateListSelector(state)
    }),
    { fetchTemplatesList, deleteTemplate }
)(TemplateListPage)
