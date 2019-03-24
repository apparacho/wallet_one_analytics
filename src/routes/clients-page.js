import React, { Component, Fragment } from 'react'

class ClientsPage extends Component {
    static propTypes = {}

    render() {
        return (
            <Fragment>
                <section className="content-header">
                    <h1>Клиенты</h1>
                </section>
                <section className="content">
                    Список клиентов
                </section>
            </Fragment>
        )
    }
}

export default ClientsPage