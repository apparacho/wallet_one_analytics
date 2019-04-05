import { appName } from '../config'
import axios from 'axios'
import { addIdByIndex } from './utils'

/**
 * Constants
 * */

export const moduleName = 'reports'
const prefix = `${appName}/${moduleName}`
export const FETCH_REPORT_LIST_START = `${prefix}/FETCH_REPORT_LIST_START`
export const FETCH_REPORT_LIST_SUCCESS = `${prefix}/FETCH_REPORT_LIST_SUCCESS`

export const FETCH_REPORT_START = `${prefix}/FETCH_REPORT_START`
export const FETCH_REPORT_SUCCESS = `${prefix}/FETCH_REPORT_SUCCESS`

/**
 * Reducer
 * */

const initState = {
    reportList: [],
    report: {
        id: '',
        templateId: '',
        templateName: '',
        content: '',
        name: '',
        reportData: {
            tableColumns: [],
            table: [],
            indicators: []
        }
    },
    loading: false
}

export default function reducer(state = initState, action) {
  const { type, payload } = action

  switch (type) {
      case FETCH_REPORT_LIST_START:
          return {...state, loading: true}
      case FETCH_REPORT_LIST_SUCCESS:
          return {...state, reportList: addIdByIndex(payload), loading: false}
      case FETCH_REPORT_START:
          return {...state, loading: true}
      case FETCH_REPORT_SUCCESS:
          return {...state, report: payload, loading: false}
      default:
          return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const reportListSelector = (state) => stateSelector(state)['reportList']
export const reportSelector = (state) => stateSelector(state)['report']


/**
 * Action Creators
 * */


export const fetchAllReports = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_REPORT_LIST_START })
        loadAllReportsService()
            .then(all => dispatch({
                type: FETCH_REPORT_LIST_SUCCESS,
                payload: all
             }))
    }
}

export const fetchReport = (reportId) => {
    return (dispatch) => {
        dispatch({ type: FETCH_REPORT_START })
        loadReportService(reportId)
            .then(all => dispatch({
                type: FETCH_REPORT_SUCCESS,
                payload: all
             }))
    }
}


/**
 *   Side Effects
 * */

export function loadAllReportsService () {
   return axios.get('/Reports')
      .then(function (response) {
        return response.data;
      })
}

export function loadReportService (reportId) {
   return axios.get('/Reports/' + reportId)
      .then(function (response) {
        return response.data;
      })
}