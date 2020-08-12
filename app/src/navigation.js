import React, { useContext } from 'react';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import HomeGuest from './pages/home-guest/';
import HomeUser from './pages/home-user';
import Register from './pages/register/';
import Login from './pages/login';
import UserContext from './UserContext';

const Navigation = () => {
    const context = useContext(UserContext);
    const loggedIn = context.user && context.user.loggedIn;

    return (
        <Switch>
            <Route path='/' exact >
                {loggedIn ? (<HomeUser />) : (<HomeGuest />)}
            </Route>
            <Route path='/register'>
                {loggedIn ? (<Redirect to='/' />) : (<Register />)}
            </Route>
            <Route path='/login'>
                {loggedIn ? (<Redirect to='/' />) : (<Login />)}
            </Route>
        </Switch>
    )
}

export default Navigation;
