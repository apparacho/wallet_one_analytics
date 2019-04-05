import React, { Component } from 'react'
import { Table, Tag } from 'antd';
import PropTypes from 'prop-types'

const columns = [
    {
        title: 'Название шаблона',
        dataIndex: 'name'
    },
    {
        title: 'Столбцы',
        dataIndex: 'templateColumns',
        render: columns => columns.map(column => <Tag color='geekblue' key={column.name}> {column.humanReadableName} </Tag>)
    }
];

class TemplatesTable extends Component {

    static propTypes = {
        tableData: PropTypes.array
    }

    render() {
        return (
            <Table style={{ backgroundColor: '#fff'}} pagination={false} columns={columns} dataSource={this.props.tableData} />
          )
    }
}

export default TemplatesTable
