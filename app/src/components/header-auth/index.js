import React, { useContext } from 'react';
import HeaderGuestLinks from '../header-guest-links'
import HeaderUserLinks from '../header-user-links'
import UserContext from '../../UserContext';

const HeaderAuth = () => {
    const context = useContext(UserContext);

    return (
        <div>
            {context.user.loggedIn ? (<HeaderUserLinks />) : (<HeaderGuestLinks />)}
        </div>
    );
}

export default HeaderAuth;
