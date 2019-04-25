import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
import { Field } from 'formik'

class FormikAntdTextInput extends Component {

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

        return (
            <Field
                name={fieldName}
                render={({field, form}) => (
                    <Input
                        {...field}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        style={{ width: 200 }}
                        className={'wo-input' + (hasError ? ' error' : '')}
                    />
                )}
            />
        )
    }
}

export default FormikAntdTextInput

