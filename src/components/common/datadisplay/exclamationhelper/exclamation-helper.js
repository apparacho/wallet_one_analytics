import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'antd'

import './exclamation-helper.css'

const helperTypes = ['error', 'info', 'warning', 'success']

class ExclamationHelper extends Component {

    static propTypes = {
        className: PropTypes.string,
        type: PropTypes.string,
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.instanceOf(Component)
          ])
    }

    static defaultProps = {
        className: '',
        type: ''
    }

    render() {
        const iClassName = helperTypes.indexOf(this.props.type) !== -1 ? this.props.type : ''
        return (
            <Tooltip placement="right" title={this.props.title} className={'wo-exclamation-helper-tooltip ' + this.props.className}>
                <i className={`fa fa-exclamation-circle wo-exclamation-helper-icon ${iClassName} ${this.props.className}`}></i>
            </Tooltip>
        )
    }
}

export default ExclamationHelper