import React from 'react';
import styles from './index.module.css';

const EpicGamer = (props) => {
    return (
        <span className={styles.epicGamer} >
            {props.children}
        </span>
    );
}

export default EpicGamer;
