import React, { Component } from 'react'
import ReportTable from './reports-table'
import { connect } from 'react-redux'
import { reportListSelector, fetchAllReports, deleteReport } from '../../ducks/reports'
import { Modal, Button } from 'antd'
import AddReportModal from './add-report-modal'

const confirm = Modal.confirm;

class ReportList extends Component {
    static propTypes = {}

    state = {
        isVisibleModal: false
    }

    componentDidMount() {
        this.props.fetchAllReports()
    }

    showModal = () => {
        this.setState({ isVisibleModal: true })
    }

    hideModal = () => {
         this.setState({ isVisibleModal: false })
    }

    onDeleteReport = (row) => {
        this.showDeleteReportConfirm(row.id)
    }

    showDeleteReportConfirm = (reportId) => {
        confirm({
            title: 'Удаление отчета',
            content: 'Вы действительно ходите удалить отчет?',
            okText: 'Ок',
            cancelText: 'Отмена',
            onOk: () => {
                this.props.deleteReport(reportId);
            },
            onCancel() {},
        });
    }

    render() {
        return (
            <div>
                <br/>
                <div style={{ width: '100%', marginBottom: '10px'}}>
                    <span style={{ fontSize: '18px', lineHeight: '32px' }} > Список отчетов </span>
                    <Button style={{ float: 'right' }} onClick={this.showModal}> Сгенерировать отчет </Button>
                </div>
                <ReportTable tableData={this.props.reportList} onDeleteRow={this.onDeleteReport} />

                <AddReportModal
                    visible={this.state.isVisibleModal}
                    onCancel={this.hideModal}
                    onSuccess={this.hideModal}
                />
            </div>
          )
    }
}

export default connect(
    (state) => ({
        reportList: reportListSelector(state)
    }),
    { fetchAllReports, deleteReport }
)(ReportList)
