import { appName } from '../config'
import axios from 'axios'

/**
 * Constants
 * */

export const moduleName = 'templates'
const prefix = `${appName}/${moduleName}`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

/**
 * Reducer
 * */

const initState = {
    templates: [],
    loading: false
}

export default function reducer(state = initState, action) {
  const { type, payload } = action

  switch (type) {
      case FETCH_ALL_START:
          return {...state, loading: true}
      case FETCH_ALL_SUCCESS:
          return {...state, templates: payload, loading: false}
      default:
          return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const templatesSelector = (state) => stateSelector(state)['templates']


/**
 * Action Creators
 * */


export const fetchAllTemplates = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_ALL_START })
        loadAllTemplatesService()
            .then(all => dispatch({
                type: FETCH_ALL_SUCCESS,
                payload: all
            }))
    }
}


/**
 *   Side Effects
 * */

export function loadAllTemplatesService () {
    return axios.get('/templates')
        .then(function (response) {
            return response.data;
        })
}