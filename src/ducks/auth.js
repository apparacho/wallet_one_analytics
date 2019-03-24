import { appName } from '../config'

/**
 * Constants
 * */

export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`

/**
 * Reducer
 * */

const initialState = {
    user: {
        userName: null
    },
    isAuthorized: true,
    loggingIn: false,
    statusText: null
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case SIGN_IN_REQUEST:
            return {...state, loggingIn: true, statusText: null}
        case SIGN_IN_SUCCESS:
            return {...state, isAuthorized: true, loggingIn: false, statusText: "success"}
        default:
            return state
        }
}

/**
 * Selectors
 * */

export const authSelector = (state) => state[moduleName]
export const userSelector = (state) => state[moduleName]["user"]
export const isAuthorizedSelector = (state) => state[moduleName]["isAuthorized"]


/**
 * Action Creators
 * */



/**
 *   Side Effects
 * */
