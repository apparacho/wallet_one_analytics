import React, { Component } from 'react'
import TemplateEditForm from './template-edit-form'
import { successfulTemplateAddSelector } from "../../ducks/templates"
import { Redirect } from 'react-router-dom'
import {connect} from "react-redux"

class TemplateEditPage extends Component {
    static propTypes = {}

    render() {

        return this.props.successfulTemplateAdd ? <Redirect to="/templates" /> :
                <div style={{ marginTop: 20 }}>
                    <h4> Создание нового шаблона </h4>

                    <div style={{ marginTop: 20 }}>
                        <TemplateEditForm />
                    </div>
                </div>
    }
}

export default connect(
    (state) => ({
        successfulTemplateAdd: successfulTemplateAddSelector(state)
    }),
    null
)(TemplateEditPage)
