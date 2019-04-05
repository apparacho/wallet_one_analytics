import React, { Component } from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const columns = [
    {
        title: 'Название отчета',
        dataIndex: 'name'
    },
    {
        title: 'Название шаблона',
        dataIndex: 'templateName'
    },
    {
        title: '',
        dataIndex: 'id',
        render: reportId => <NavLink to={'/reports/' + reportId}> <i style={{ fontSize: 20 }} className="fa fa-eye"></i></NavLink>
    }
];

class ReportsTable extends Component {

    static propTypes = {
        tableData: PropTypes.array
    }

    render() {
        return (
            <Table style={{ backgroundColor: '#fff'}} pagination={false} columns={columns} dataSource={this.props.tableData} />
          )
    }
}

export default ReportsTable