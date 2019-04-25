import React, { Component } from 'react'
import { Input } from 'antd'

class NumericInput extends Component {
    onChange = (e) => {
        const { value } = e.target;
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            this.props.onChange && this.props.onChange(e);
        }
    }

    onBlur = (e) => {
        const { value, onBlur, onChange } = this.props;
        if (value && (value.charAt(value.length - 1) === '.' || value === '-')) {
            onChange(value.slice(0, -1));
        }
        onBlur && onBlur(e);
    }

    render() {
        return (
            <Input
                {...this.props}
                onChange={this.onChange}
                onBlur={this.onBlur}
                placeholder="Введите число"
                maxLength={25}
            />
        );
    }
}

export default NumericInput