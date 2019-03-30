import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import { Button } from 'antd'
import FormikAntdSelect from '../common/form/formik/antd/select/formik-antd-select'
import FormikAntdInput from '../common/form/formik/antd/input/formik-antd-input'
import * as Yup from 'yup'
import {
    fetchNewTemplateCreationData, addNewTemplate,
    reportingSystemsDataSelector,
    templateColumnsDataSelector, templateTypesDataSelector
} from "../../ducks/templates";
import {connect} from "react-redux";

const fieldRequiredMessage = 'это поле обязательно для заполнения'

const addTemplateValidationSchema = Yup.object().shape({
    templateName: Yup.string().required(fieldRequiredMessage),
    templateType: Yup.string().required(fieldRequiredMessage),
    reportingSystemId: Yup.string().required(fieldRequiredMessage),
    templateColumns: Yup.array().required(fieldRequiredMessage)
})

const FormFieldWithLabel = ({label, children}) => (
    <div style={{ margin: '15px 0' }}>
        <label style={{ width: 150 }}>{label}</label>
        {children}
    </div>
)

class TemplateEditForm extends PureComponent {

    static propTypes = {
        templateName: PropTypes.string,
        templateType: PropTypes.string,
        reportingSystemId: PropTypes.string,
        templateColumns: PropTypes.array,

        templateTypesSelectData: PropTypes.array,
        reportingSystemsSelectData: PropTypes.array,
        templateColumnsSelectData: PropTypes.array
    }

    static defaultProps = {
        templateName: '',
        templateType: '',
        reportingSystemId: '',
        templateColumns: [],

        templateTypesSelectData: [],
        reportingSystemsSelectData: [],
        templateColumnsSelectData: []
    }

    componentDidMount() {
        this.props.fetchNewTemplateCreationData()
    }

    handleSubmit = (values) => {
        this.props.addNewTemplate(Object.assign({}, values, { filters: [], aggregationFunctions: [] }))
    }

    render() {

        return (
            <Formik key={Date.now()}
                initialValues={{
                    templateName: this.props.templateName,
                    templateType: this.props.templateType,
                    reportingSystemId: this.props.reportingSystemId,
                    templateColumns: this.props.templateColumns
                }}

                validationSchema={addTemplateValidationSchema}

                onSubmit={this.handleSubmit}
            >
                {props => (
                    <Form>
                        <FormFieldWithLabel label='Название шаблона' >
                            <FormikAntdInput
                                formikProps={props}
                                name="templateName"
                                dataIndex="templateName"
                                type="text"
                                placeholder="Укажите название шаблона"
                                style={{ width: 300 }}
                            />
                        </FormFieldWithLabel>

                        <FormFieldWithLabel label='Тип шаблона' >
                            <FormikAntdSelect
                                formikProps={props}
                                selectData={this.props.templateTypesSelectData}
                                dataIndex="templateType"
                                nameField="name"
                                valueField="value"
                                itemKey="name"
                                style={{ width: 200 }}
                            />
                        </FormFieldWithLabel>

                        <FormFieldWithLabel label='Системы' >
                            <FormikAntdSelect
                                formikProps={props}
                                selectData={this.props.reportingSystemsSelectData}
                                dataIndex="reportingSystemId"
                                nameField="name"
                                valueField="value"
                                itemKey="name"
                                style={{ width: 200 }}
                            />
                        </FormFieldWithLabel>


                        <FormFieldWithLabel label='Столбцы' >
                            <FormikAntdSelect
                                formikProps={props}
                                selectData={this.props.templateColumnsSelectData}
                                dataIndex="templateColumns"
                                nameField="humanReadableName"
                                valueField="name"
                                itemKey="name"
                                mode="multiple"
                                style={{ width: 400 }}
                            />
                        </FormFieldWithLabel>

                        <Button
                            style={{ marginTop: 20 }}
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            disabled={props.isSubmitting || !props.isValid || !props.dirty}
                        >
                            Сгенерировать шаблон
                        </Button>
                    </Form>
                )}
            </Formik>
          )
    }
}

export default connect(
    (state) => ({
        templateTypesSelectData: templateTypesDataSelector(state),
        reportingSystemsSelectData: reportingSystemsDataSelector(state),
        templateColumnsSelectData: templateColumnsDataSelector(state),
    }),
    { fetchNewTemplateCreationData, addNewTemplate }
)(TemplateEditForm)
