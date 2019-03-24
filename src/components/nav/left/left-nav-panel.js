import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class LeftNavPanel extends Component {
    static propTypes = {}

    render() {
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <ul className="sidebar-menu" data-widget="tree">
                        <li>
                            <NavLink to="/reports" >
                                <i className="fa fa-file-o"></i>
                                <span>Отчеты</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/templates" >
                                <i className="fa fa-th"></i>
                                <span>Шаблоны</span>
                            </NavLink>
                        </li>
                        <li>
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