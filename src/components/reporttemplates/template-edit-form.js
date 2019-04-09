import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, FieldArray } from 'formik'
import ExclamationHelper from '../common/datadisplay/exclamationhelper/exclamation-helper'
import { Button, Select, Input } from 'antd'
import FormikAntdSelect from '../common/form/formik/antd/select/formik-antd-select'
import FormikAntdInput from '../common/form/formik/antd/input/formik-antd-input'
import * as Yup from 'yup'
import {
    fetchNewTemplateCreationData, addNewTemplate,
    reportingSystemsDataSelector,
    templateColumnsDataSelector, templateTypesDataSelector, dataTypeDescriptionsSelector
} from "../../ducks/templates";
import {connect} from "react-redux";

const Option = Select.Option

const fieldRequiredMessage = 'это поле обязательно для заполнения'

const addTemplateValidationSchema = Yup.object().shape({
    name: Yup.string().required(fieldRequiredMessage),
    templateType: Yup.string().required(fieldRequiredMessage),
    reportingSystemId: Yup.string().required(fieldRequiredMessage),
    templateColumns: Yup.array().required(fieldRequiredMessage),
    templateColumnFilters: Yup.array().of(Yup.object().shape({
        column: Yup.string().required(fieldRequiredMessage),
        operation: Yup.string().required(fieldRequiredMessage),
        boundValue: Yup.string().required(fieldRequiredMessage)
    }))
})

const FormFieldWithLabel = ({label, children}) => (
    <div style={{ margin: '15px 0' }}>
        <label style={{ width: 150 }}>{label}</label>
        {children}
    </div>
)

class TemplateEditForm extends PureComponent {

    static propTypes = {
        name: PropTypes.string,
        templateType: PropTypes.string,
        reportingSystemId: PropTypes.string,
        templateColumns: PropTypes.array,
        templateColumnFilters: PropTypes.array,
        templateColumnOperations: PropTypes.array,

        templateTypesSelectData: PropTypes.array,
        reportingSystemsSelectData: PropTypes.array,
        templateColumnsSelectData: PropTypes.array,
    }

    static defaultProps = {
        name: '',
        templateType: '',
        reportingSystemId: '',
        templateColumns: [],
        templateColumnFilters: [],
        templateColumnOperations: [],

        templateTypesSelectData: [],
        reportingSystemsSelectData: [],
        templateColumnsSelectData: []
    }

    componentDidMount() {
        this.props.fetchNewTemplateCreationData()
    }

    addColumnFilter = () => {

    }

    handleSubmit = (values) => {
        // console.log(Object.assign({}, values, {
        //     templateColumns: this.props.templateColumnsSelectData.filter(column => values.templateColumns.indexOf(column.name) !== -1),
        //     filters: values.templateColumnFilters.map(filter => ({...filter, column: this.props.templateColumnsSelectData.filter(column => column.name === filter.column)[0]}))
        // }))

        this.props.addNewTemplate(Object.assign({}, values, {
            templateColumns: this.props.templateColumnsSelectData.filter(column => values.templateColumns.indexOf(column.name) !== -1),
            filters: values.templateColumnFilters.map(filter => ({...filter, column: this.props.templateColumnsSelectData.filter(column => column.name === filter.column)[0]}))
        }))
    }

    render() {

        return (
            <Formik key={Date.now()}
                initialValues={{
                    name: this.props.name,
                    templateType: this.props.templateType,
                    reportingSystemId: this.props.reportingSystemId,
                    templateColumns: this.props.templateColumns,
                    templateColumnFilters: this.props.templateColumnFilters,
                    templateColumnOperations: this.props.templateColumnOperations
                }}

                validationSchema={addTemplateValidationSchema}

                onSubmit={this.handleSubmit}
            >
                {props => (
                    <Form>
                        <FormFieldWithLabel label='Название шаблона' >
                            <FormikAntdInput
                                formikProps={props}
                                name="name"
                                dataIndex="name"
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

                        <FieldArray
                            name="templateColumnFilters"
                            render={arrayHelpers => (
                                <div style={{ border: '1px dashed #dcdcdc', padding: '10px' }}>
                                    <label> Фильтры </label>
                                    <table border="0" style={{ visibility: props.values.templateColumnFilters.length ? 'visible' : 'hidden' }}>
                                        <tbody>
                                           <tr>
                                                <th>Поле</th>
                                                <th>Оператор</th>
                                                <th>Значение</th>
                                           </tr>

                                        {props.values.templateColumnFilters.map((filter, index) => (
                                            <tr key={index}>

                                                <td>
                                                    <Field
                                                        name={`templateColumnFilters[${index}].column`}
                                                        render={({ field }) => (
                                                            <div style={{ display: 'inline-block', marginBottom: '10px' }}>
                                                                 <div style={{ display: 'inline-block' }}>
                                                                     <Select
                                                                         {...field}
                                                                         name={`templateColumnFilters[${index}].column`}
                                                                         value={props.values['templateColumnFilters'][index]['column']}
                                                                         onChange={(val) => props.setFieldValue(`templateColumnFilters[${index}].column`, val)}
                                                                         onBlur={() => props.setFieldTouched(`templateColumnFilters[${index}].column`, true)}
                                                                         style={{ width: 200 }}
                                                                         className={
                                                                             'wo-select' +
                                                                             (props.errors['templateColumnFilters'] && props.errors['templateColumnFilters'][index] && props.errors['templateColumnFilters'][index]['column']
                                                                                && props.touched['templateColumnFilters'] && props.touched['templateColumnFilters'][index] && props.touched['templateColumnFilters'][index]['column'] ? ' error' : '')
                                                                         }
                                                                     >
                                                                         {this.props.templateColumnsSelectData.filter(col => props.values.templateColumns.indexOf(col.name) !== -1).map(col =>
                                                                             <Option key={col['name']} value={col['name']}>{col['humanReadableName']}</Option>
                                                                         )}
                                                                     </Select>
                                                                 </div>
                                                                 <div style={{ display: 'inline-block', width: 20 }} >
                                                                     {props.errors['templateColumnFilters'] && props.errors['templateColumnFilters'][index] && props.errors['templateColumnFilters'][index]['column']
                                                                        && props.touched['templateColumnFilters'] && props.touched['templateColumnFilters'][index] && props.touched['templateColumnFilters'][index]['column'] && (
                                                                         <ExclamationHelper type='error' title={props.errors['templateColumnFilters'] && props.errors['templateColumnFilters'][index]['column']} />
                                                                     )}
                                                                 </div>
                                                            </div>
                                                        )}
                                                    />
                                                </td>

                                                <td>
                                                    <Field
                                                        name={`templateColumnFilters[${index}].operation`}
                                                        render={({ field }) => (
                                                            <div style={{ display: 'inline-block', marginBottom: '10px' }}>
                                                                 <div style={{ display: 'inline-block' }}>
                                                                     <Select
                                                                         {...field}
                                                                         name={`templateColumnFilters[${index}].operation`}
                                                                         value={props.values['templateColumnFilters'][index]['operation']}
                                                                         onChange={(val) => props.setFieldValue(`templateColumnFilters[${index}].operation`, val)}
                                                                         onBlur={() => props.setFieldTouched(`templateColumnFilters[${index}].operation`, true)}
                                                                         style={{ width: 200 }}
                                                                         className={
                                                                             'wo-select' +
                                                                             (props.errors['templateColumnFilters'] && props.errors['templateColumnFilters'][index] && props.errors['templateColumnFilters'][index]['operation']
                                                                                && props.touched['templateColumnFilters'] && props.touched['templateColumnFilters'][index] && props.touched['templateColumnFilters'][index]['operation'] ? ' error' : '')
                                                                         }
                                                                     >
                                                                         {
                                                                              this.props.templateColumnsSelectData.filter(col => col.name === props.values['templateColumnFilters'][index]['column'])[0]
                                                                    && this.props.templateColumnsSelectData.filter(col => col.name === props.values['templateColumnFilters'][index]['column'])[0].dataType.value &&
                                                                             this.props.dataTypeDescriptions.filter(dataType => dataType.value === this.props.templateColumnsSelectData.filter(col => col.name === props.values['templateColumnFilters'][index]['column'])[0].dataType.value)[0].operations.map(op =>
                                                                             <Option key={op['value']} value={op['value']}>{op['name']}</Option>
                                                                         )}
                                                                     </Select>
                                                                 </div>
                                                                 <div style={{ display: 'inline-block', width: 20 }} >
                                                                     {props.errors['templateColumnFilters'] && props.errors['templateColumnFilters'][index] && props.errors['templateColumnFilters'][index]['operation']
                                                                        && props.touched['templateColumnFilters'] && props.touched['templateColumnFilters'][index] && props.touched['templateColumnFilters'][index]['operation'] && (
                                                                         <ExclamationHelper type='error' title={props.errors['templateColumnFilters'] && props.errors['templateColumnFilters'][index]['operation']} />
                                                                     )}
                                                                 </div>
                                                            </div>
                                                        )}
                                                    />
                                                </td>

                                                <td>
                                                    <Field
                                                        name={`templateColumnFilters[${index}].boundValue`}
                                                        render={({ field }) => (
                                                            <div style={{ display: 'inline-block', marginBottom: '10px' }}>
                                                                <div style={{ display: 'inline-block' }}>
                                                                    <Input
                                                                        {...field}
                                                                        onChange={props.handleChange}
                                                                        onBlur={props.handleBlur}
                                                                        style={{ width: 200 }}
                                                                        className={
                                                                            'wo-input' +
                                                                            (props.errors['templateColumnFilters'] && props.errors['templateColumnFilters'][index] && props.errors['templateColumnFilters'][index]['boundValue']
                                                                            && props.touched['templateColumnFilters'] && props.touched['templateColumnFilters'][index] && props.touched['templateColumnFilters'][index]['boundValue']? ' error' : '')}
                                                                    />
                                                                </div>
                                                                <div style={{ display: 'inline-block', width: 20 }} >
                                                                    {props.errors['templateColumnFilters'] && props.errors['templateColumnFilters'][index] && props.errors['templateColumnFilters'][index]['boundValue']
                                                                        && props.touched['templateColumnFilters'] && props.touched['templateColumnFilters'][index] && props.touched['templateColumnFilters'][index]['boundValue'] && (
                                                                        <ExclamationHelper type='error' title={props.errors['templateColumnFilters'][index]['boundValue']} />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    />
                                                </td>

                                                <td>
                                                    <i
                                                        style={{ cursor: 'pointer', fontSize: '20px', border: '1px solid #ccc', padding: '3px', borderRadius: '3px', marginBottom: '10px' }}
                                                        className="fa fa-trash" onClick={() => arrayHelpers.remove(index)}>
                                                    </i>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>

                                    <Button
                                        type="button"
                                        onClick={() => arrayHelpers.push({ column: '', operation: '', boundValue: '' })}
                                    >
                                        Добавить фильтр
                                    </Button>
                                </div>
                            )}
                          />

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
        dataTypeDescriptions: dataTypeDescriptionsSelector(state)
    }),
    { fetchNewTemplateCreationData, addNewTemplate }
)(TemplateEditForm)
