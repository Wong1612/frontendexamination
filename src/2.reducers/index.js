import { combineReducers } from 'redux'
import User from  './userGlobal'
import Cart from './cartGlobal'

export default combineReducers({
    userstate : User,
    cartstate: Cart
}) // it exports as an object inside a function