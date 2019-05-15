import React, { cloneElement, Component } from 'react'
import ExclamationHelper from '../../../common/datadisplay/exclamationhelper/exclamation-helper'

class FormArrayField extends Component {
    static propTypes = {}

    render() {
        const { dataSourceName, modelFieldName, index, formikProps, children } = this.props,
            errorMsg = (formikProps.errors[dataSourceName] && formikProps.errors[dataSourceName][index] && formikProps.errors[dataSourceName][index][modelFieldName]
                    && formikProps.touched[dataSourceName] && formikProps.touched[dataSourceName][index] && formikProps.touched[dataSourceName][index][modelFieldName])
                ? formikProps.errors[dataSourceName][index][modelFieldName] : null;

        return (
            <div style={{ display: 'inline-block', marginBottom: '10px' }}>
                <div style={{ display: 'inline-block' }}>
                    {React.Children.map(children, c => c && cloneElement(c, Object.assign({}, this.props, {
                        fieldName: `${dataSourceName}[${index}].${modelFieldName}`,
                        hasError: !!errorMsg
                    })))}
                </div>
                <div style={{ display: 'inline-block', width: 20 }} >
                    {errorMsg && <ExclamationHelper type='error' title={errorMsg} />}
                </div>
            </div>
        )
    }
}

export default FormArrayField