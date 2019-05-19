import { appName } from '../config'
import axios from 'axios'
import { addIdByIndex } from './utils'

/**
 * Constants
 * */

export const moduleName = 'templates'
const prefix = `${appName}/${moduleName}`
export const FETCH_TEMPLATES_LIST_START = `${prefix}/FETCH_TEMPLATES_LIST_START`
export const FETCH_TEMPLATES_LIST_SUCCESS = `${prefix}/FETCH_TEMPLATES_LIST_SUCCESS`
export const FETCH_NEW_TEMPLATE_CREATION_DATA_START = `${prefix}/FETCH_NEW_TEMPLATE_CREATION_DATA_START`
export const FETCH_NEW_TEMPLATE_CREATION_DATA_SUCCESS = `${prefix}/FETCH_NEW_TEMPLATE_CREATION_DATA_SUCCESS`
export const ADD_NEW_TEMPLATE_START = `${prefix}/ADD_NEW_TEMPLATE_START`
export const ADD_NEW_TEMPLATE_SUCCESS = `${prefix}/ADD_NEW_TEMPLATE_SUCCESS`
export const DELETE_TEMPLATE_START = `${prefix}/DELETE_TEMPLATE_START`
export const DELETE_TEMPLATE_SUCCESS = `${prefix}/DELETE_TEMPLATE_SUCCESS`
export const DELETE_TEMPLATE_FAILURE = `${prefix}/DELETE_TEMPLATE_FAILURE`

/**
 * Reducer
 * */

const initState = {
    templateList: [],
    newTemplateCreationData: {
        templateTypes: [],
        reportingSystems: [
            {
                id: '',
                name: '',
                tableColumns: []
            }
        ],
        dataTypeDescriptions: [
            {
              name: "Строка",
              value: "0",
              operations: [],
              aggregationFunctions: []
            }
        ]
    },
    loading: false,
    successfulTemplateAdd: false,
    currentOperation: {
        type: '',   // deletingTemplate
        status: '', // start / success / error,
        error: null
    }
}

const defaultTemplateStructure = {
  "name": "test template",
  "templateType": 0,
  "templateColumns": [
    {
      "name": "DealSum",
      "humanReadableName": "Сумма сделки",
      "dataType": 1
    }
  ],
  "filters": [],
  "aggregationFunctions": [],
  "reportingSystem": null,
  "user": null,
  "reportingSystemId": "8a96857-0c53-431e-886a-886b65b81e98",
  "userId": "bd504b3f-81fe-42ca-b966-675515b07af9"
}

export default function reducer(state = initState, action) {
  const { type, payload } = action

  switch (type) {
      case FETCH_TEMPLATES_LIST_START:
      case FETCH_NEW_TEMPLATE_CREATION_DATA_START:
      case ADD_NEW_TEMPLATE_START:
          return {...state, loading: true, successfulTemplateAdd: false }
      case FETCH_TEMPLATES_LIST_SUCCESS:
          return {...state, templateList: addIdByIndex(payload), loading: false}
      case FETCH_NEW_TEMPLATE_CREATION_DATA_SUCCESS:
          return {...state, newTemplateCreationData: payload, loading: false}
      case ADD_NEW_TEMPLATE_SUCCESS:
          return {...state, loading: false, successfulTemplateAdd: true }
      case DELETE_TEMPLATE_START:
          return {...state, currentOperation: {
              type: 'deletingTemplate',
              status: 'start'
          }}
      case DELETE_TEMPLATE_SUCCESS:
          return {...state, currentOperation: {
              type: 'deletingTemplate',
              status: 'success'
          }}
      case DELETE_TEMPLATE_FAILURE:
          return {...state, currentOperation: {
              type: 'deletingTemplate',
              status: 'error',
              error: payload
          }}
      default:
          return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const templateListSelector = (state) => stateSelector(state)['templateList']
export const successfulTemplateAddSelector = (state) => stateSelector(state)['successfulTemplateAdd']
export const newTemplateCreationDataSelector = (state) => stateSelector(state)['newTemplateCreationData']

export const templateTypesDataSelector = (state) => newTemplateCreationDataSelector(state)['templateTypes']
export const reportingSystemsDataSelector = (state) => ([{
        value: newTemplateCreationDataSelector(state)['reportingSystems'][0].id,
        name:  newTemplateCreationDataSelector(state)['reportingSystems'][0].name,
}])
export const templateColumnsDataSelector = (state) => newTemplateCreationDataSelector(state)['reportingSystems'][0].tableColumns

export const dataTypeDescriptionsSelector = (state) => newTemplateCreationDataSelector(state)['dataTypeDescriptions']
                                             // newTemplateCreationDataSelector(state)['dataTypeDescriptions'][0].operations
                                             // newTemplateCreationDataSelector(state)['dataTypeDescriptions'][0].aggregationFunctions


/**
 * Action Creators
 * */


export const fetchTemplatesList = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_TEMPLATES_LIST_START })
        loadTemplatesListService()
            .then(all => dispatch({
                type: FETCH_TEMPLATES_LIST_SUCCESS,
                payload: all
            }))
    }
}

export const fetchNewTemplateCreationData = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_NEW_TEMPLATE_CREATION_DATA_START })
        loadNewTemplateCreationDataService()
            .then(all => dispatch({
                type: FETCH_NEW_TEMPLATE_CREATION_DATA_SUCCESS,
                payload: all
            }))
    }
}

export const addNewTemplate = (data) => {
    return (dispatch) => {
        dispatch({ type: ADD_NEW_TEMPLATE_START })
        addNewTemplateService(data)
            .then(all => dispatch({
                type: ADD_NEW_TEMPLATE_SUCCESS,
                payload: all
            }))
    }
}

export const deleteTemplate = (templateId) => {
    return (dispatch) => {
        dispatch({ type: DELETE_TEMPLATE_START })
        deleteTemplateService(templateId)
            .then(all => {
                dispatch({
                    type: DELETE_TEMPLATE_SUCCESS,
                    payload: all
                })
                fetchTemplatesList()(dispatch)
            })
            .catch(error => {
                dispatch({
                    type: DELETE_TEMPLATE_FAILURE,
                    payload: error
                })
            });
    }
}

/**
 *   Side Effects
 * */

export function loadTemplatesListService () {
    return axios.get('/Templates')
        .then(function (response) {
            return response.data;
        })
}

export function loadNewTemplateCreationDataService () {
    return axios.get('/Templates/new_template_data')
        .then(function (response) {
            return response.data;
        })
}

export function addNewTemplateService (params) {
    return axios.post('/Templates/', Object.assign({}, defaultTemplateStructure, params))
        .then(function (response) {
            return response.data;
        })
}

export function deleteTemplateService (templateId) {
    return axios.delete(`/Templates/${templateId}`)
}