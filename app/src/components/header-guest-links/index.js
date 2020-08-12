import React from 'react';
import HeaderLink from '../header-link';
import styles from './index.module.css'

const HeaderGuestLinks = () => {
    return (
        <div className={styles.links}>
            <HeaderLink to='/login'>Login</HeaderLink>
            <HeaderLink to='/register'>Register</HeaderLink>
        </div>
    );
}

export default HeaderGuestLinks;
