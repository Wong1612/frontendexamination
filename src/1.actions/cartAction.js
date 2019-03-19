import Axios from 'axios'
import { urlApi } from '../support/urlApi';

export const addToCart = () => {
    return (dispatch) => {
        Axios.get(urlApi + '/cart/')
        .then((res) => {
            if (res.data.length > 0) {
                dispatch({
                    type: 'ADD_CART',
                    payload: res.data[0] + 1
                })
            }
    })
    }
    
}