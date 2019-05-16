import React, { Component } from 'react'
import { Modal, Radio, Button } from 'antd'
import {connect} from "react-redux"
import { fetchTemplatesList, templateListSelector } from "../../ducks/templates"
import { addNewReport, isGeneratingNewReportSelector } from "../../ducks/reports"
import { Formik, Form } from 'formik'
import FormikAntdInput from '../common/form/formik/antd/input/formik-antd-input'
import * as Yup from 'yup'

const RadioGroup = Radio.Group;

const fieldRequiredMessage = 'это поле обязательно для заполнения'

const addReportValidationSchema = Yup.object().shape({
    name: Yup.string().required(fieldRequiredMessage),
    templateId: Yup.string().required(fieldRequiredMessage)
})

const FormFieldWithLabel = ({label, children}) => (
    <div style={{ margin: '15px 0' }}>
        <label style={{ width: 150 }}>{label}</label>
        {children}
    </div>
)

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

class AddReportModal extends Component {
    static propTypes = {}

    componentDidMount() {
        this.props.fetchTemplatesList()
    }

    handleSubmit = (values) => {
        this.props.addNewReport(values, this.props.onSuccess);
        this.props.onOk && this.props.onOk()
    }

    handleCancel = () => {
        this.props.onCancel && this.props.onCancel()
    }

    render() {
        return (
            <Formik key={this.props.visible}
                initialValues={{
                    name: '',
                    templateId: ''
                }}

                validationSchema={addReportValidationSchema}

                onSubmit={this.handleSubmit}
            >
                {props => (
                    <Modal
                        title="Генерация отчета по шаблону"
                        visible={this.props.visible}
                        confirmLoading={this.props.isGeneratingNewReport}
                        onCancel={this.handleCancel}
                        footer={[]}
                    >
                        <Form>
                            <div style={{ maxHeight: '200px', overflow: 'auto' }}>
                                <RadioGroup
                                    name="templateId"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                >
                                    {
                                        this.props.templateList.map(template =>
                                            <Radio key={template.id} style={radioStyle} value={template.id}>
                                                {template.name}
                                            </Radio>
                                        )
                                    }
                                </RadioGroup>
                            </div>

                            <FormFieldWithLabel label='Название отчета' >
                                <FormikAntdInput
                                    formikProps={props}
                                    name="name"
                                    dataIndex="name"
                                    type="text"
                                    placeholder="Укажите название отчета"
                                    style={{ width: 300 }}
                                />
                            </FormFieldWithLabel>

                            <div style={{ margin: '40px 0 0 0', textAlign: 'right' }}>
                                <Button
                                    key="cancel"
                                    onClick={this.handleCancel}
                                    disabled={this.props.isGeneratingNewReport}
                                    style={{ margin: '0 20px 0 0' }}
                                >
                                    Отмена
                                </Button>
                                <Button
                                    key="submit"
                                    htmlType="submit"
                                    type="primary"
                                    loading={this.props.isGeneratingNewReport}
                                    disabled={props.isSubmitting || !props.isValid || !props.dirty}
                                >
                                    Сгенерировать
                                </Button>
                            </div>
                        </Form>
                    </Modal>
                )}
            </Formik>
        )
    }
}

export default connect(
    (state) => ({
        templateList: templateListSelector(state),
        isGeneratingNewReport: isGeneratingNewReportSelector(state)
    }),
    { fetchTemplatesList, addNewReport }
)(AddReportModal)

