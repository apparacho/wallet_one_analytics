import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
import ExclamationHelper from '../../../../datadisplay/exclamationhelper/exclamation-helper'

import './formik-antd-input.css'

class FormikAntdInput extends Component {

    static propTypes = {
        formikProps: PropTypes.object,
        dataIndex: PropTypes.string,
    }

    render() {
        const {
            formikProps,
            dataIndex,
            style,
            ...antdComponentProps
        } = this.props

        return (
            <div style={{ display: 'inline-block' }}>
                <div style={{ display: 'inline-block' }}>
                    <Input
                        {...antdComponentProps}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        style={style}
                        value={formikProps.values[dataIndex]}
                        className={'wo-input' + (formikProps.errors[dataIndex] && formikProps.touched[dataIndex] ? ' error' : '')}
                    />
                </div>
                <div style={{ display: 'inline-block', width: 20 }} >
                    {formikProps.errors[dataIndex] && formikProps.touched[dataIndex] && (
                        <ExclamationHelper type='error' title={formikProps.errors[dataIndex]} />
                    )}
                </div>
            </div>
        )
    }
}

export default FormikAntdInput

