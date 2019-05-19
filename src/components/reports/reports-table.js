import React, { Component } from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const getColumns = (onDeleteRow) => [
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
    },
    {
        title: '',
        render: (row) => <i
                style={{ fontSize: 20, color: '#cd0505', cursor: 'pointer' }}
                className="fa fa-remove"
                onClick={() => onDeleteRow(row)}
                title="Удалить отчет"
            ></i>
    }
];

class ReportsTable extends Component {

    static propTypes = {
        tableData: PropTypes.array,
        onDeleteRow: PropTypes.func
    }

    render() {
        return (
            <Table style={{ backgroundColor: '#fff'}} pagination={false} columns={getColumns(this.props.onDeleteRow)} dataSource={this.props.tableData} />
          )
    }
}

export default ReportsTable