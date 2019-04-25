import React, { Component } from 'react'
import ExclamationHelper from '../../../common/datadisplay/exclamationhelper/exclamation-helper'

class FormField extends Component {
    static propTypes = {}

    render() {
        // const { dataSourceName, modelFieldName, index, formikProps, children } = this.props;
        const { errorMsg, children } = this.props;
        return (
            <div style={{ display: 'inline-block', marginBottom: '10px' }}>
                <div style={{ display: 'inline-block' }}>
                    {children}
                </div>
                <div style={{ display: 'inline-block', width: 20 }} >
                    {errorMsg && <ExclamationHelper type='error' title={errorMsg} />}
                </div>
            </div>
        )
    }
}

export default FormField