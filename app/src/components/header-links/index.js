import React from 'react';
import HeaderLink from '../header-link/';
import styles from './index.module.css';

const HeaderLinks = () => {
    return (
        <div className={styles.links}>
            <HeaderLink to='/'>Home</HeaderLink>
            <HeaderLink to='/games'>Games</HeaderLink>
            <HeaderLink to='/reviews'>Reviews</HeaderLink>
        </div>
    );
}

export default HeaderLinks;
