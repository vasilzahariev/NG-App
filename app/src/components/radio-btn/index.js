import React from 'react';
import styles from './index.module.css'

const RadioBtn = (props) => {
    return (
        <div className={styles.radioDiv}>
            <label className={styles.label}>
                <input className={styles.radio} type="radio" name={props.name} value={props.value} onChange={props.onChange} /> {props.children}
            </label>
        </div>
    );
};

export default RadioBtn;
