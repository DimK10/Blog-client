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

export const getAllCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log('err in fetch get all categories ', err);
        return err;
    });
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

export const createNewPost = (formData) => {
    //TODO - add token and user data alongside with formdata
    let {token, user} = JSON.parse(localStorage.getItem('jwt'));
    console.log('user in jwt ', user);
    console.log('token ', token);
    console.log('post in fetch ', formData);

    

    return fetch(`${API}/post/create/${user._id}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData
    })
    .then((response) => {
        return response.json();
    })
    .catch((err) => {
        console.log(err);
        return err;
    });
};

export const createNewCategory = (token, user, formData) => {
    console.log('post in fetch ', formData);
    return fetch(`${API}/category/create/${user._id}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
    })
    .then((response) => {
        return response.json();
    })
    .catch((err) => {
        console.log(err);
        return err;
    });
};