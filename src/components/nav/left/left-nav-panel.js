import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class LeftNavPanel extends Component {
    static propTypes = {}

    getLiClassName = (mnemonic) => {
        return this.props.location.pathname.indexOf(mnemonic) !== -1 ? 'active' : ''
    }

    render() {
        console.log(this.props.location.pathname)
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className={this.getLiClassName('/reports')}>
                            <NavLink to="/reports" >
                                <i className="fa fa-file-o"></i>
                                <span>Отчеты</span>
                            </NavLink>
                        </li>
                        <li className={this.getLiClassName('/templates')}>
                            <NavLink to="/templates" >
                                <i className="fa fa-th"></i>
                                <span>Шаблоны</span>
                            </NavLink>
                        </li>
                        <li className={this.getLiClassName('/clients')}>
                            <NavLink to="/clients" >
                                <i className="fa fa-user"></i>
                                <span>Клиенты</span>
                            </NavLink>
                        </li>
                    </ul>
                </section>
            </aside>
        )
    }
}

export default LeftNavPanel