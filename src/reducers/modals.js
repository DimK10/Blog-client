const initialState = {
    toggleSignInModal: false
};



const modalsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_SIGNIN":
            return {...state, toggleSignInModal: !state.toggleSignInModal}
            
            
    
        default:
            return state;
    };
};

export default modalsReducer;