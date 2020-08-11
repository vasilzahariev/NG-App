import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
//import App from './App';
import HomeGuest from './pages/home-guest/';
import Register from './pages/register/';
import Login from './pages/login';

const Navigation = () => {
    return (
        <Switch>
            <Route path='/' exact component={HomeGuest} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
        </Switch>
    )
}

export default Navigation;
