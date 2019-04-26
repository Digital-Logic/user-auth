import React from 'react';
import { Redirect } from 'react-router-dom';
import { ROUTES } from '../Routes';

function NotFound() {
    return (
        <Redirect to={ ROUTES.HOME } />
    );
}

export default NotFound;