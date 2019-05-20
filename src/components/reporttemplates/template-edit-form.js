import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, FieldArray } from 'formik'
import ExclamationHelper from '../common/datadisplay/exclamationhelper/exclamation-helper'
import { Button, Select, Input } from 'antd'
import moment from 'moment'
import FormikAntdSelect from '../common/form/formik/antd/select/formik-antd-select'
import FormikAntdInput from '../common/form/formik/antd/input/formik-antd-input'
import * as Yup from 'yup'

import FormArrayField from '../common/form/formik/form-array-field'
import FormikAntdDatepicker from '../common/form/formik/antd/datepicker/formik-antd-datepicker'
import { momentDateTimeFormat, momentDateFormat } from '../common/form/formik/antd/datepicker/date-tiem-formats'
import FormikAntdTextInput from '../common/form/formik/antd/input/formik-antd-text-input'
import FormikAntdNumberInput from '../common/form/formik/antd/input/formik-antd-number-input'

const Option = Select.Option

const fieldRequiredMessage = 'это поле обязательно для заполнения'

const addTemplateValidationSchema = Yup.object().shape({
    name: Yup.string().required(fieldRequiredMessage),
    templateType: Yup.number().required(fieldRequiredMessage),
    reportingSystemId: Yup.string().required(fieldRequiredMessage),
    templateColumns: Yup.array().required(fieldRequiredMessage),
    templateColumnFilters: Yup.array().of(Yup.object().shape({
        column: Yup.string().required(fieldRequiredMessage),
        operation: Yup.string().required(fieldRequiredMessage),
        boundValue: Yup.string().required(fieldRequiredMessage)
    })),
    templateColumnAggregationFunctions: Yup.array().of(Yup.object().shape({
        column: Yup.string().required(fieldRequiredMessage),
        type: Yup.string().required(fieldRequiredMessage),
        name: Yup.string().required(fieldRequiredMessage)
    }))
})

const FormFieldWithLabel = ({label, children}) => (
    <div style={{ margin: '15px 0' }}>
        <label style={{ width: 150 }}>{label}</label>
        {children}
    </div>
)

const MultiTypeValueInput = (props) => {
    // 0 - String
    // 1 - Number
    // 2 - Date
    // 3 - DateTime
    const { dataType } = props
    let component = <FormikAntdTextInput />

    if (dataType === '1') {
        component = <FormikAntdNumberInput allowClear={false} />
    }
    else if (dataType === '2' || dataType === '3' ) {
        component = <FormikAntdDatepicker allowClear={false} showTime={dataType === '3'} />
    }

    return <FormArrayField {...props}>{component}</FormArrayField>
}


class TemplateEditForm extends PureComponent {

    static propTypes = {
        name: PropTypes.string,
        templateType: PropTypes.number,
        reportingSystemId: PropTypes.string,
        templateColumns: PropTypes.array,
        templateColumnFilters: PropTypes.array,
        templateColumnAggregationFunctions: PropTypes.array,

        templateTypesSelectData: PropTypes.array,
        reportingSystemsSelectData: PropTypes.array,
        templateColumnsSelectData: PropTypes.array,

        onSubmit: PropTypes.func,
        submitBtnText: PropTypes.string,

        templateId: PropTypes.string
    }

    static defaultProps = {
        name: '',
        templateType: null,
        reportingSystemId: '',
        templateColumns: [],
        templateColumnFilters: [],
        templateColumnAggregationFunctions: [],

        templateTypesSelectData: [],
        reportingSystemsSelectData: [],
        templateColumnsSelectData: [],
        submitBtnText: 'Сохранить',

        templateId: ''
    }

    componentDidMount() {
        this.props.fetchNewTemplateCreationData()
    }

    addColumnFilter = () => {

    }

    handleSubmit = (values) => {
        // console.log(values);
        // console.log(Object.assign({}, values, {
        //     templateColumns: this.props.templateColumnsSelectData.filter(column => values.templateColumns.indexOf(column.name) !== -1),
        //     filters: values.templateColumnFilters.map(filter => ({...filter, column: this.props.templateColumnsSelectData.filter(column => column.name === filter.column)[0]})),
        //     aggregationFunctions: values.templateColumnAggregationFunctions.map(aggfunc => ({...aggfunc, column: this.props.templateColumnsSelectData.filter(column => column.name === aggfunc.column)[0]})),
        // }))

        this.props.onSubmit && this.props.onSubmit(Object.assign({}, values, {
            templateColumns: this.props.templateColumnsSelectData.filter(column => values.templateColumns.indexOf(column.name) !== -1),
            filters: values.templateColumnFilters.map(filter => ({...filter, column: this.props.templateColumnsSelectData.filter(column => column.name === filter.column)[0]})),
            aggregationFunctions: values.templateColumnAggregationFunctions.map(aggfunc => ({...aggfunc, column: this.props.templateColumnsSelectData.filter(column => column.name === aggfunc.column)[0]}))
        }))
    }

    onTemplateColumnsDeselect = formikProps => val => {
        formikProps.setFieldValue('templateColumnAggregationFunctions', formikProps.values.templateColumnAggregationFunctions.filter(item => item.column !== val));
        formikProps.setFieldValue('templateColumnFilters', formikProps.values.templateColumnFilters.filter(item => item.column !== val));
    }

    render() {

        const getDataType = (formikProps, index) => {
            const col = formikProps.values['templateColumnFilters'][index]['column'] &&
                this.props.templateColumnsSelectData.filter(col => col.name === formikProps.values['templateColumnFilters'][index]['column'])[0];
            return col ? col.dataType : '';
        }


        const onFilterColumnChange = (formikProps, index, dataSourceName, modelFieldName) => val => {
            const columnsData = this.props.templateColumnsSelectData,
                oldVal = formikProps.values[dataSourceName][index][modelFieldName],
                getColumnDateTypeByValue = (val) => columnsData.filter(col => col.name === val)[0].dataType,
                newValDataType = getColumnDateTypeByValue(val)
            // if (val && oldVal && oldVal !== val && getColumnDateTypeByValue(oldVal) !== newValDataType) {
            if (val && oldVal !== val) {
                formikProps.setFieldValue(`${dataSourceName}[${index}].boundValue`,
                    newValDataType >= 2 ? moment(new Date(), (newValDataType === 3 ? momentDateTimeFormat : momentDateFormat)) : '' )
            }
            formikProps.setFieldValue(`${dataSourceName}[${index}].${modelFieldName}`, val)
        }

        // onChange={(val) => props.setFieldValue(`templateColumnFilters[${index}].column`, val)}

        return (
            <Formik key={Date.now()}
                initialValues={{
                    id: this.props.templateId,
                    name: this.props.name,
                    templateType: this.props.templateType,
                    reportingSystemId: this.props.reportingSystemId,
                    templateColumns: this.props.templateColumns,
                    templateColumnFilters: this.props.templateColumnFilters,
                    templateColumnAggregationFunctions: this.props.templateColumnAggregationFunctions
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
                                onDeselect={this.onTemplateColumnsDeselect(props)}
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
                                                                         onChange={onFilterColumnChange(props, index, 'templateColumnFilters', 'column')}
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
                                                                    && this.props.templateColumnsSelectData.filter(col => col.name === props.values['templateColumnFilters'][index]['column'])[0].dataType &&
                                                                             this.props.dataTypeDescriptions.filter(dataType => dataType.value === this.props.templateColumnsSelectData.filter(col => col.name === props.values['templateColumnFilters'][index]['column'])[0].dataType)[0].operations.map(op =>
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
                                                    <MultiTypeValueInput
                                                        dataType={getDataType(props, index)}
                                                        dataSourceName="templateColumnFilters"
                                                        modelFieldName="boundValue"
                                                        index={index}
                                                        formikProps={props}
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

                        <FieldArray
                            name="templateColumnAggregationFunctions"
                            render={arrayHelpers => (
                                <div style={{ border: '1px dashed #dcdcdc', padding: '10px', marginTop: '20px' }}>
                                    <label> Показатели </label>
                                    <table border="0" style={{ visibility: props.values.templateColumnAggregationFunctions.length ? 'visible' : 'hidden' }}>
                                        <tbody>
                                           <tr>
                                                <th>Поле</th>
                                                <th>Показатель</th>
                                                <th>Название показателя</th>
                                           </tr>

                                        {props.values.templateColumnAggregationFunctions.map((filter, index) => (
                                            <tr key={index}>

                                                <td>
                                                    <Field
                                                        name={`templateColumnAggregationFunctions[${index}].column`}
                                                        render={({ field }) => (
                                                            <div style={{ display: 'inline-block', marginBottom: '10px' }}>
                                                                 <div style={{ display: 'inline-block' }}>
                                                                     <Select
                                                                         {...field}
                                                                         name={`templateColumnAggregationFunctions[${index}].column`}
                                                                         value={props.values['templateColumnAggregationFunctions'][index]['column']}
                                                                         onChange={(val) => props.setFieldValue(`templateColumnAggregationFunctions[${index}].column`, val)}
                                                                         onBlur={() => props.setFieldTouched(`templateColumnAggregationFunctions[${index}].column`, true)}
                                                                         style={{ width: 200 }}
                                                                         className={
                                                                             'wo-select' +
                                                                             (props.errors['templateColumnAggregationFunctions'] && props.errors['templateColumnAggregationFunctions'][index] && props.errors['templateColumnAggregationFunctions'][index]['column']
                                                                                && props.touched['templateColumnAggregationFunctions'] && props.touched['templateColumnAggregationFunctions'][index] && props.touched['templateColumnAggregationFunctions'][index]['column'] ? ' error' : '')
                                                                         }
                                                                     >
                                                                         {this.props.templateColumnsSelectData.filter(col => props.values.templateColumns.indexOf(col.name) !== -1).map(col =>
                                                                             <Option key={col['name']} value={col['name']}>{col['humanReadableName']}</Option>
                                                                         )}
                                                                     </Select>
                                                                 </div>
                                                                 <div style={{ display: 'inline-block', width: 20 }} >
                                                                     {props.errors['templateColumnAggregationFunctions'] && props.errors['templateColumnAggregationFunctions'][index] && props.errors['templateColumnAggregationFunctions'][index]['column']
                                                                        && props.touched['templateColumnAggregationFunctions'] && props.touched['templateColumnAggregationFunctions'][index] && props.touched['templateColumnAggregationFunctions'][index]['column'] && (
                                                                         <ExclamationHelper type='error' title={props.errors['templateColumnAggregationFunctions'] && props.errors['templateColumnAggregationFunctions'][index]['column']} />
                                                                     )}
                                                                 </div>
                                                            </div>
                                                        )}
                                                    />
                                                </td>

                                                <td>
                                                    <Field
                                                        name={`templateColumnAggregationFunctions[${index}].type`}
                                                        render={({ field }) => (
                                                            <div style={{ display: 'inline-block', marginBottom: '10px' }}>
                                                                 <div style={{ display: 'inline-block' }}>
                                                                     <Select
                                                                         {...field}
                                                                         name={`templateColumnAggregationFunctions[${index}].type`}
                                                                         value={props.values['templateColumnAggregationFunctions'][index]['type']}
                                                                         onChange={(val) => props.setFieldValue(`templateColumnAggregationFunctions[${index}].type`, val)}
                                                                         onBlur={() => props.setFieldTouched(`templateColumnAggregationFunctions[${index}].type`, true)}
                                                                         style={{ width: 200 }}
                                                                         className={
                                                                             'wo-select' +
                                                                             (props.errors['templateColumnAggregationFunctions'] && props.errors['templateColumnAggregationFunctions'][index] && props.errors['templateColumnAggregationFunctions'][index]['type']
                                                                                && props.touched['templateColumnAggregationFunctions'] && props.touched['templateColumnAggregationFunctions'][index] && props.touched['templateColumnAggregationFunctions'][index]['type'] ? ' error' : '')
                                                                         }
                                                                     >
                                                                         {
                                                                              this.props.templateColumnsSelectData.filter(col => col.name === props.values['templateColumnAggregationFunctions'][index]['column'])[0]
                                                                    && this.props.templateColumnsSelectData.filter(col => col.name === props.values['templateColumnAggregationFunctions'][index]['column'])[0].dataType &&
                                                                             this.props.dataTypeDescriptions.filter(dataType => dataType.value === this.props.templateColumnsSelectData.filter(col => col.name === props.values['templateColumnAggregationFunctions'][index]['column'])[0].dataType)[0].aggregationFunctions.map(op =>
                                                                             <Option key={op['value']} value={op['value']}>{op['name']}</Option>
                                                                         )}
                                                                     </Select>
                                                                 </div>
                                                                 <div style={{ display: 'inline-block', width: 20 }} >
                                                                     {props.errors['templateColumnAggregationFunctions'] && props.errors['templateColumnAggregationFunctions'][index] && props.errors['templateColumnAggregationFunctions'][index]['type']
                                                                        && props.touched['templateColumnAggregationFunctions'] && props.touched['templateColumnAggregationFunctions'][index] && props.touched['templateColumnAggregationFunctions'][index]['type'] && (
                                                                         <ExclamationHelper type='error' title={props.errors['templateColumnAggregationFunctions'] && props.errors['templateColumnAggregationFunctions'][index]['type']} />
                                                                     )}
                                                                 </div>
                                                            </div>
                                                        )}
                                                    />
                                                </td>

                                                <td>
                                                    <Field
                                                        name={`templateColumnAggregationFunctions[${index}].name`}
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
                                                                            (props.errors['templateColumnAggregationFunctions'] && props.errors['templateColumnAggregationFunctions'][index] && props.errors['templateColumnAggregationFunctions'][index]['name']
                                                                            && props.touched['templateColumnAggregationFunctions'] && props.touched['templateColumnAggregationFunctions'][index] && props.touched['templateColumnAggregationFunctions'][index]['name']? ' error' : '')}
                                                                    />
                                                                </div>
                                                                <div style={{ display: 'inline-block', width: 20 }} >
                                                                    {props.errors['templateColumnAggregationFunctions'] && props.errors['templateColumnAggregationFunctions'][index] && props.errors['templateColumnAggregationFunctions'][index]['name']
                                                                        && props.touched['templateColumnAggregationFunctions'] && props.touched['templateColumnAggregationFunctions'][index] && props.touched['templateColumnAggregationFunctions'][index]['name'] && (
                                                                        <ExclamationHelper type='error' title={props.errors['templateColumnAggregationFunctions'][index]['name']} />
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
                                        onClick={() => arrayHelpers.push({ column: '', type: '', name: '' })}
                                    >
                                        Добавить показатель
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
                            {this.props.submitBtnText}
                        </Button>
                    </Form>
                )}
            </Formik>
          )
    }
}

export default  TemplateEditForm
