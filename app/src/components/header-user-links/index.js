import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderLink from '../header-link';
import styles from './index.module.css'
import UserContext from '../../UserContext';

const HeaderUserLinks = () => {
    const context = useContext(UserContext);
    const history = useHistory();

    const link = '/u/' + context.user.username;

    const onClickLogout = () => {
        context.logout();

        history.push('/');
    }

    return (
        <div className={styles.links}>
            <HeaderLink to={link} epicGamer>{context.user.username}</HeaderLink>
            <HeaderLink onClick={onClickLogout}>Logout</HeaderLink>
        </div>
    );
}

export default HeaderUserLinks;
