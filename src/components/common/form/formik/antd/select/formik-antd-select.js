import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import ExclamationHelper from '../../../../datadisplay/exclamationhelper/exclamation-helper'

import './formik-antd-select.css'

const Option = Select.Option

class FormikAntdSelect extends Component {

    static propTypes = {
        formikProps: PropTypes.object,
        selectData: PropTypes.array,
        dataIndex: PropTypes.string,
        nameField: PropTypes.string,
        valueField: PropTypes.string,
        itemKey: PropTypes.string
    }

    render() {
        const {
            formikProps,
            selectData,
            dataIndex,
            nameField,
            valueField,
            itemKey,
            style,
            ...antdComponentProps
        } = this.props

        return (
            <div style={{ display: 'inline-block' }}>
                <div style={{ display: 'inline-block' }}>
                    <Select
                        {...antdComponentProps}
                        name={dataIndex}
                        value={formikProps.values[dataIndex]}
                        onChange={(val) => formikProps.setFieldValue(dataIndex, val)}
                        onBlur={() => formikProps.setFieldTouched(dataIndex, true)}
                        style={style}
                        className={'wo-select' + (formikProps.errors[dataIndex] && formikProps.touched[dataIndex] ? ' error' : '')}
                    >
                        {selectData.map((item) =>
                            <Option key={item[itemKey]} value={item[valueField]}>{item[nameField]}</Option>
                        )}
                    </Select>
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

export default FormikAntdSelect

