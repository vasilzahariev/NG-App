import React from 'react';
import FormComponent from '../../components/form-component';
import styles from './index.module.css';

const Input = (props) => {
    return (
        <FormComponent>
            <span className={styles.labelText}>{props.label}</span>
            <input className={props.error ? styles.errorInputField : styles.inputField} type={props.type ? props.type : 'text'} onChange={props.onChange} name={props.name ? props.name : props.label.toLowerCase()} placeholder={props.label} />
            { props.error ? <p className={styles.error}>{props.error}</p> : <span></span> }
        </FormComponent>
    );
}

export default Input;