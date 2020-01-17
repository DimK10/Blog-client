import { API } from '../../config';

export const signIn = (formData) => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then((response) => {
        return response.json();
    })
    .catch((err) => {
        console.log(err);
    });
};

export const authenticate = (data, next) => {
    //save token to localStorage
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    };
};

export const isAuthenticated = () => {
    if( typeof window == 'undefined') {
        return false;
    };

    if(localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    };
};