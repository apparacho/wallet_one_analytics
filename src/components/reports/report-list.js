import React, { Component } from 'react'
import ReportTable from './reports-table'
import { connect } from 'react-redux'
import { reportListSelector, fetchAllReports } from '../../ducks/reports'

class ReportList extends Component {
    static propTypes = {}

     componentDidMount() {
        this.props.fetchAllReports()
    }

    render() {
        return (
            <div>
                <br/>
                <div style={{ width: '100%', marginBottom: '10px'}}>
                    <span style={{ fontSize: '18px', lineHeight: '32px' }} > Список отчетов </span>
                </div>
                <ReportTable tableData={this.props.reportList} />
            </div>
          )
    }
}

export default connect(
    (state) => ({
        reportList: reportListSelector(state)
    }),
    { fetchAllReports }
)(ReportList)
