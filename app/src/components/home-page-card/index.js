import React from 'react';
import styles from './index.module.css';

const HomePageCard = (props) => {
    return (
        <div className={styles.card}>
            {props.children}
        </div>
    );
}

export default HomePageCard;
