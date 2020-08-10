import React from 'react';
import App from './App';
import {
    Switch,
    Route
} from 'react-router-dom';

const Navigation = () => {
    return (
        <Switch>
            <Route path='/' exact component={App} />
        </Switch>
    )
}

export default Navigation;
