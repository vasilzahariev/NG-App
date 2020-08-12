import React, { Component } from 'react';
import HeaderLinks from '../header-links/';
import Search from '../search/';
import HeaderAuth from '../header-auth/';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav>
                <HeaderLinks />
                <HeaderAuth />
                <Search />
            </nav>
        );
    }
}

export default Header
