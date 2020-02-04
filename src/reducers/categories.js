const initialState = {
    categories: [],
    isFetching: false,
    isError: false,
    error: ''
};

const asyncCategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_CATEGORIES":
            return {
                ...state, 
                ...{
                    categories: [],
                    isFetching: true,
                    isError: false,
                    error: ''
                }
            };
        case "FETCHED_CATEGORIES":
            return {
                ...state,
                ...{
                    categories: action.data,
                    isFetching: false,
                    isError: false,
                    error: ''
                }
            };
            case "RECEIVE_ERROR":
                return {...state, ...{
                    isError: true,
                    isFetching: false,
                    error: action.error
                }};
        default:
            return state;
    };
};

export default asyncCategoriesReducer;