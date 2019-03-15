import Axios from 'axios' // importing database
import {urlApi} from './../support/urlApi'
import cookie from 'universal-cookie'

const objCookie = new cookie()

export const onLogin = (paramsUsername, paramsPassword) => {
    return (dispatch) => {
        // CHANGE LOADING TO TRUE
        dispatch({
            type: 'LOADING'
        })
        
        // GET DATA FROM FAKE API JSON SERVER
        Axios.get (urlApi + '/users',{params:{username : paramsUsername, 
                                                        password: paramsPassword}})
        .then((res) => {
            console.log(res)
            if (res.data.length > 0) {
                dispatch(
                    {
                    type : 'LOGIN_SUCCESS',
                    payload: 
                    {   
                        username: res.data[0].username,
                        role: res.data[0].role
                    }
                    
                    })
            } else {
                dispatch({
                    type : 'USER_NOT_FOUND'
                })
            }
        })   
        .catch((err) => { // FOR WHEN SERVER IS DOWN / JS SERVER NOT RUNNING
            dispatch({
                type : 'SERVER_ERROR'
            })
        })
    }
}

export const keepLogin = (cookie) => {
    return (dispatch) => {
    Axios.get('http://localhost:2000/users', {params: {username : cookie}})
        .then((res) => {
            if(res.data.length > 0) {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: 
                    {   
                        username: res.data[0].username,
                        role: res.data[0].role
                    }
                })
            }
        })
        .catch((err) => console.log(err))
    }
}

    export const resetUser = () => {
        return {
        type: 'RESET_USER',
    }
}

    export const userRegister = (username, password, email, phone) => {
        return (dispatch) => {
            dispatch({
                type : 'LOADING'
            })
            var newData = {username : username, password : password, email : email, phone : phone }
            Axios.get(urlApi + '/users?username=' + newData.username) // Takes from var newData
            .then((res) => {
                if (res.data.length > 0) {
                    dispatch({
                        type: 'USERNAME_NOT_AVAILABLE'
                    })
                } else {
                    Axios.post('http://localhost:2000/users', newData)
                    .then((res) => dispatch({
                        type : 'LOGIN_SUCCESS',
                        payload: username
                    },
                        objCookie.set('userData', username, {path: '/'}) //Set cookies for login
                    ))
                    .catch((err) => console.log(err))
                }
            })
            .catch((err) => { // FOR WHEN SERVER IS DOWN / JS SERVER NOT RUNNING
                dispatch({
                    type : 'SERVER_ERROR'
                })
            })
        }
    }

export const loginWithGoogle = (email) => {
    return(dispatch) => {
        Axios.get(urlApi + '/users?username=' + email)
        .then((res) => {
            if (res.data.length > 0) {
                dispatch({
                    type : 'LOGIN_SUCCESS',
                    payload : res.data[0] // takes object with 4 properties
                },
                    objCookie.set('userData', email, {path: '/'}) 
                )
            } else {
                Axios.post(urlApi + '/users', {username : email, role : 'user'})
                .then((res) => {
                    dispatch({
                        type : 'LOGIN_SUCCESS',
                        payload : res.data
                    })
                },
                    objCookie.set('userData', email, {path: '/'}) 
                )
                .catach((err) => {
                    console.log(err)
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}
