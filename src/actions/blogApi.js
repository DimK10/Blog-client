import store from '../store/configureStore';
import { getAllPosts, getImage, getAllCategories } from '../API/apiService';


export const fetch_posts = () => {
    return {
        type: "FETCH_POSTS"
    };
};

export const fetch_categories = () => {
    return {
        type: "FETCH_CATEGORIES"
    };
};

export const receive_categories = (categories) => {
    return {
        type: "FETCHED_CATEGORIES",
        data: categories
    };
};

export const receive_posts = (posts) => {
    return {
        type: "FETCHED_POSTS",
        data: posts
    };
};

export const fetch_image = () => {
    return {
        type: "FETCH_IMAGE"
    };
};

export const receive_image = (image) => {
    return {
        type: "FETCHED_IMAGE",
        data: image
    };
};

export const receive_error = (error) => {
    return {
      type: "RECEIVE_ERROR",
      error
    };
};

export const sign_in = (formData) => {
    return {
        type: "SIGN_IN",
        formData
    };
};



export const fetchPosts =() => {
    store.dispatch(fetch_posts());
    return function(dispatch, getState) {
        getAllPosts()
        .then(data => {
            console.log('data in getAllPosts ', data);
            // Check if any post has an image to show
            
            // data.map((post) => {
            //     if(post.photoId) {
            //         getImage(post._id)
            //         .then(data => { 
            //             console.log('data in getImage: ', data);
            //             dispatch(addImage(data));

            //         })
            //         .catch(err => dispatch(receive_error(err)));
            //     };
            // });
            // console.log('newData: ', newData);
            dispatch(receive_posts(data));
            
        })
        .catch(err => dispatch(receive_error(err)));
    };
};

export const fetchCategories = () => {
    store.dispatch(fetch_categories());
    return function(dispatch) {
        getAllCategories()
        .then(data => {
            dispatch(receive_categories(data));
        })
    };
};

