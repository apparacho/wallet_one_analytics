import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DatePicker } from 'antd'
import { Field } from 'formik'
import moment from 'moment'
import { momentDateTimeFormat, antdDateTimeFormat, momentDateFormat, antdDateFormat } from './date-tiem-formats'

class FormikAntdDatepicker extends Component {

    static propTypes = {
        fieldName: PropTypes.string,
        hasError: PropTypes.bool
    }

    render() {
        const {
            fieldName,
            hasError,
            style,
            ...antdComponentProps
        } = this.props

        const showTime = antdComponentProps.showTime,
            momentDF = showTime ? momentDateTimeFormat : momentDateFormat,
            antdDF = showTime ? antdDateTimeFormat : antdDateFormat

        return (
            <Field
                name={fieldName}
                render={({field, form}) => (
                    console.log(field.value) ||
                    <DatePicker
                        defaultValue={moment(new Date(), momentDF)}
                        format={antdDF}
                        onChange={(dateVal, dateString) => console.log(dateVal, dateString) || form.setFieldValue(fieldName, dateString)}
                        onBlur={() => form.setFieldTouched(fieldName, true)}
                        style={{width: 200}}
                        value={field.value ? moment(field.value, momentDF) : field.value}
                        name={field.name}
                        className={'wo-input' + (hasError ? ' error' : '')}
                        {...antdComponentProps}
                    />
                )}
            />
        )
    }
}

export default FormikAntdDatepicker

