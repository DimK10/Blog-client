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

export const signout = (next) => {
    // Remove token from localStorage
    if(typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/signout`,{
            method: "GET"
        })
        .then(response => {
            console.log('signout ', response);
        })
        .catch(err => console.log(err));
    };
};

export const authenticateForAction = (data, next) => {
    if(data.err) {
        // user not found
        return false;
    };
    const { token, user } = data;
    return fetch(`${API}/user/${user._id}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        if(response.error) {
            // console.log('response.error in authForAction: ', response.error);
            return false;
        };

        return true;
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
        // Additional check for user
        if(authenticateForAction(JSON.parse(localStorage.getItem('jwt')))) {
            return JSON.parse(localStorage.getItem('jwt'));
        };
        
    };
    
    return false;
    
};