import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class PageHeader extends Component {
    static propTypes = {}

    toggleLeftNavMenuCollapse() {
        document.body.classList.toggle("sidebar-collapse");
    }

    render() {
        return (
            <header className="main-header">
                <NavLink to="/" className="logo">
                    <span className="logo-mini"><b>W1</b></span>
                    <span className="logo-lg"><b>W1</b> Analytics</span>
                </NavLink>
                <nav className="navbar navbar-static-top" role="navigation">
                    <span onClick={this.toggleLeftNavMenuCollapse} className="sidebar-toggle" data-toggle="push-menu" role="button"></span>
                    <div className="navbar-custom-menu">
                        <div className="nav navbar-nav">
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default PageHeader