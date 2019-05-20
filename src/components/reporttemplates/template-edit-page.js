import React, { Component } from 'react'
import TemplateEditForm from './template-edit-form'
import {
    successfulTemplateAddSelector,
    fetchTemplateById,
    currentTemplateFormDataSelector,
    dataTypeDescriptionsSelector,
    templateTypesDataSelector,
    templateColumnsDataSelector,
    reportingSystemsDataSelector,
    addNewTemplate, fetchNewTemplateCreationData, editExistTemplate
} from "../../ducks/templates"
import { Redirect } from 'react-router-dom'
import {connect} from "react-redux"

class TemplateEditPage extends Component {
    static propTypes = {}

    componentDidMount() {
        this.props.fetchNewTemplateCreationData()
        const templateId = this.props.match.params.templateId
        templateId && this.props.fetchTemplateById(templateId)
    }

    render() {

        const { currentTemplateFormData, successfulTemplateAdd, match, ...rest } = this.props,
            templateId = match.params.templateId;

        return successfulTemplateAdd ? <Redirect to="/templates" /> :
                <div style={{ marginTop: 20 }}>
                    <h4> {templateId ? `Редактирование шаблона "${currentTemplateFormData.name}"` : 'Создание нового шаблона'} </h4>

                    <div style={{ marginTop: 20 }}>
                        <TemplateEditForm
                            {...currentTemplateFormData}
                            {...rest}
                            action={templateId ? 'edit' : 'add'}
                            onSubmit={templateId ? this.props.editExistTemplate : this.props.addNewTemplate}
                            submitBtnText={templateId ? 'Сохранить изменения' : 'Сгенерировать шаблон'}
                            templateId={templateId}
                        />
                    </div>
                </div>
    }
}

export default connect(
    (state) => ({
        successfulTemplateAdd: successfulTemplateAddSelector(state),
        currentTemplateFormData: currentTemplateFormDataSelector(state),

        templateTypesSelectData: templateTypesDataSelector(state),
        reportingSystemsSelectData: reportingSystemsDataSelector(state),
        templateColumnsSelectData: templateColumnsDataSelector(state),
        dataTypeDescriptions: dataTypeDescriptionsSelector(state)
    }),
    { fetchTemplateById, fetchNewTemplateCreationData, addNewTemplate, editExistTemplate }
)(TemplateEditPage)
