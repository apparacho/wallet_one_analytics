import React, { Component } from 'react'
import { Table, Tag } from 'antd';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const getColumns = (onDeleteRow) => [
    {
        title: 'Название шаблона',
        dataIndex: 'name'
    },
    {
        title: 'Столбцы',
        dataIndex: 'templateColumns',
        render: columns => columns.map(column => <Tag color='geekblue' key={column.name}> {column.humanReadableName} </Tag>)
    },
    {
        title: '',
        dataIndex: 'id',
        render: templateId => <NavLink to={'/templates/edit/' + templateId}> <i style={{ fontSize: 20 }} className="fa fa-eye"></i></NavLink>
    },
    {
        title: '',
        render: (row) => <i
                style={{ fontSize: 20, color: '#cd0505', cursor: 'pointer' }}
                className="fa fa-remove"
                onClick={() => onDeleteRow(row)}
                title="Удалить шаблон"
            ></i>
    }
];

class TemplatesTable extends Component {

    static propTypes = {
        tableData: PropTypes.array
    }

    render() {
        return (
            <Table style={{ backgroundColor: '#fff'}} pagination={false} columns={getColumns(this.props.onDeleteRow)} dataSource={this.props.tableData} />
          )
    }
}

export default TemplatesTable
