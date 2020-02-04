const initialState = {
    posts: [],
    categories: [],
    img: [],
    isFetching: false,
    isError: false,
    error: '',
    isImgFetching: false,
    images: [],
};

const asyncReducer =  (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_POSTS":
            return {...state, ...{
                    posts: [],
                    isFetching: true,
                    isError: false,
                    error: ''
                }};
        case "FETCHED_POSTS":
            return {...state, ...{
                posts: action.data,
                isFetching: false,
                isError: false,
                error: ''
            }};
        case "RECEIVE_ERROR":
            return {...state, ...{
                isError: true,
                isFetching: false,
                error: action.error
            }};
        case "FETCH_IMAGE":
            return {...state, ...{ isImgFetching: true }}
        case "FETCHED_IMAGE":
            return { ...state, ...{
                img: [...action.data],
                isImgFetching: false,
                isFetching: false,
                isError: false,
                error: '',
            }}
        case "ADD_IMAGE":
            return {...state, ...{ images: [...state.images, ...action.image] }}
    
        default:
            return state;
    };
};

export default asyncReducer;