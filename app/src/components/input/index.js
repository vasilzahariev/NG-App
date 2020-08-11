import React from 'react';
import styles from './index.module.css'

const Input = (props) => {
    return (
        <div className={styles.inputBlock}>
            <label>
                <span className={styles.labelText}>{props.label}</span>
                <input className={styles.inputField} type={props.type ? props.type : 'text'} onChange={props.onChange} name={props.name ? props.name : props.label.toLowerCase()} placeholder={props.label} />
            </label>
        </div>
    );
}

export default Input;
