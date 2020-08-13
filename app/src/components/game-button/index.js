import React from 'react';
import styles from './index.module.css';

const GameButton = (props) => {
    return (
        <div className={styles.btnDiv}>
            <button className={styles.btn} onClick={props.onClick}>
                {props.children}
            </button>
        </div>
    )
}

export default GameButton;
