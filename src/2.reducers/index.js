import { combineReducers } from 'redux'
import User from  './userGlobal'

export default combineReducers({
    userstate : User
}) // it exports as an object inside a function