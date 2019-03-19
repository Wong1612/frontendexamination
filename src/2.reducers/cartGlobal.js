const INITIAL_STATE = {
    cart: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'ADD_CART': 
            return {...INITIAL_STATE, cart: action.payload}
        default: 
            return state
    }
}
    