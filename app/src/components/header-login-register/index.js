import React from 'react';
import HeaderLink from '../header-link/';
import styles from './index.module.css';

const HeaderLoginRegister = () => {
    return (
        <div className={styles.links}>
            <HeaderLink to='/login'>Login</HeaderLink>
            <HeaderLink to='/register'>Sign Up</HeaderLink>
        </div>
    );
}

export default HeaderLoginRegister;
