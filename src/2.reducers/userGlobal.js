import { BottomNavigationAction } from "@material-ui/core";

const INITIAL_STATE = {
    id: 0,
    username: "",
    error: "",
    loading: false,
    role: ""
} // object ^

export default (state = INITIAL_STATE, action) => {
//     if (action.type === 'LOGIN_SUCCESS') {
//         return {...INITIAL_STATE, username : action.payload.username, role: action.payload.role}
//     } else if (action.type === 'LOADING'){
//         return {...INITIAL_STATE, loading : true}
//     } else if (action.type === 'USER_NOT_FOUND') {
//         return {...INITIAL_STATE, error : 'Username or Password is incorrect!'}
//     } else if (action.type === 'SERVER_ERROR') {
//         return {...INITIAL_STATE, error : 'Server error. Please try again later.'}
//     } else if (action.type === 'RESET_USER') {
//         return INITIAL_STATE
//     } else if (action.type === 'USERNAME_NOT_AVAILABLE') {
//         return {...INITIAL_STATE, error : 'Username not available!', loading : false}
//     } else {
//         return state
//     }
     // state is an object
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return {...INITIAL_STATE, username : action.payload.username, role: action.payload.role}
        case 'LOADING':
            return {...INITIAL_STATE, loading : true}
        case 'USER_NOT_FOUND':
            return {...INITIAL_STATE, error : 'Username or Password is incorrect!'}
        case 'SYSTEM_ERROR':
            return {...INITIAL_STATE, error : 'Server error. Please try again later.'}
        case 'RESET_USER':
            return INITIAL_STATE
        case 'USERNAME_NOT_AVAILABLE':
            return {...INITIAL_STATE, error : 'Username not available!', loading : false}
        default:
            return state
    }
}