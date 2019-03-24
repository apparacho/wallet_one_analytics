import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import authReducer, { moduleName as authModule } from '../ducks/auth'
import templatesReducer, { moduleName as templatesModule } from '../ducks/templates'

export default (history) => combineReducers({
    router: connectRouter(history),
    [authModule]: authReducer,
    [templatesModule]: templatesReducer
})
