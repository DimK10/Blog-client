import { API } from '../config';

export const getAllPosts = () => {

    console.log('API: ', API);
    return fetch(`${API}/posts/all`,{
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => { return err });
};

export const getImage = (postId) => {
    return fetch(`${API}/post/image/${postId}`, {
        method: "GET"
    })
    .then(image => {
        // console.log('image in getImage: ', image.json());
        return image.json();
    })
    .catch(err => { return err });
};