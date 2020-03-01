import { API } from '../../config';


export const getPost = (postId) => {
    return fetch(`${API}/post/${postId}`, {
        method: "GET"
    })
    .then((data) => {
        if(data.err) {
            console.log('error in fetching post ', data.err);
            return {err: 'Post not found'}
        };

        return data.json();
    })
    .catch((err) => {
        console.log('Error in fetching post ', err);
        return err;
    });
};


export const  removePost = (post) => {
    // Check for token
    const { token, user} = JSON.parse(localStorage.getItem('jwt'));
    console.log('token ', token);
    console.log(' user ', user);
    if(!user) {
        return {err: 'No token'};
    };

    return fetch(`${API}/delete-post/${post._id}/${user._id}`, {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) => {
        return response.json();
    })
    .catch((err) => {
        console.log(err);
        return err;
    })
}