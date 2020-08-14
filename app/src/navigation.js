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
import Games from './pages/games';
import AddGame from './pages/add-game'
import Game from './pages/game';
import UserContext from './UserContext';
import UserGstatusGames from './pages/user-gstatus-games';
import Reviews from './pages/reviews';
import Review from './pages/review';

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
            <Route path='/games' component={Games} />
            <Route path='/admin/g/add'>
                {loggedIn ? (<AddGame />) : (<Redirect to='/' />)}
            </Route>
            <Route path='/g/:gameId' exact component={Game} />
            <Route path='/u/:userId/collections/:gStatus' exact component={UserGstatusGames} />
            <Route path='/reviews' component={Reviews} />
            <Route path='/r/:reviewId' exact component={Review} />
        </Switch>
    )
}

export default Navigation;
