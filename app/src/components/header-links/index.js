import React from 'react';
import HeaderLink from '../header-link/';
import styles from './index.module.css';

const HeaderLinks = () => {
    return (
        <div className={styles.links}>
            <HeaderLink to='/'>NG</HeaderLink>
            <HeaderLink to='/games'>Games</HeaderLink>
            <HeaderLink to='/reviews'>Reviews</HeaderLink>
            <HeaderLink to='/lists'>Lists</HeaderLink>
        </div>
    );
}

export default HeaderLinks;
