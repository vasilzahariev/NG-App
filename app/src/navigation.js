import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
//import App from './App';
import HomeGuest from './pages/home-guest/';
import Register from './pages/register/';

const Navigation = () => {
    return (
        <Switch>
            <Route path='/' exact component={HomeGuest} />
            <Route path='/register' component={Register} />
        </Switch>
    )
}

export default Navigation;
