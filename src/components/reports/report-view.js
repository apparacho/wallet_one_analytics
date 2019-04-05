import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reportSelector, fetchReport } from '../../ducks/reports'
import { Table } from 'antd'
import { addIdByIndex } from '../../ducks/utils'


class ReportView extends Component {
    static propTypes = {
        report: PropTypes.object
    }

    componentDidMount() {
        this.props.fetchReport(this.props.match.params.id)
    }


    render() {
        const columns = this.props.report.reportData.tableColumns.map(col => ({ dataIndex: col.name, title: col.humanReadableName }))
        return (
            <div>
                <h4>{this.props.report.name}</h4>
                <Table style={{ backgroundColor: '#fff'}}  columns={columns} dataSource={addIdByIndex(this.props.report.reportData.table)} />
            </div>
          )
    }
}

export default connect(
    (state) => ({
        report: reportSelector(state)
    }),
    { fetchReport }
)(ReportView)
