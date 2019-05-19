import React, { Component } from 'react'
import { Table, Tag } from 'antd';
import PropTypes from 'prop-types'

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
