import React, { Component } from 'react';
import HeaderLinks from '../header-links/';
import Search from '../search/';
import HeaderLoginRegister from '../header-login-register/';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav>
                <HeaderLinks />
                <HeaderLoginRegister />
                <Search />
            </nav>
        );
    }
}

export default Header
