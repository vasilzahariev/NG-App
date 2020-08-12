import React, { useContext } from 'react';
import Layout from '../../components/layout';
import Title from '../../components/title';
import UserContext from '../../UserContext';
import styles from './index.module.css';

const HomeUser = () => {
    const context = useContext(UserContext);

    return (
        <Layout>
            <Title>Hello there, <span className={styles.epicGamer}>{context.user.username}</span>!</Title>
        </Layout>
    )
}

export default HomeUser;
