import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isAuthenticated} from '../API/auth/index';
import NotFound from '../components/NotFound';

const UserRoute = ({path, exact, component}) => {
    const checkIfUser = () => {
        if(isAuthenticated()) {
            return <Route path={path} exact component={component} />
        } else {
            return <Redirect to="/404-not-found" />
        };
    };

    return (
        (checkIfUser())
    );
};

export default UserRoute;