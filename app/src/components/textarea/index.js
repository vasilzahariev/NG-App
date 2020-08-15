import React from 'react';
import FormComponent from '../../components/form-component';
import styles from './index.module.css'

const Textarea = (props) => {
    return (
        <FormComponent>
            <span className={styles.labelText}>{props.label}</span>
            <textarea className={props.error ? styles.errorTextarea : styles.textarea} onChange={props.onChange} name={props.name ? props.name : props.label.toLowerCase()} placeholder={props.label} value={props.value} />
            { props.error ? <p className={styles.error}>{props.error}</p> : <span></span> }
        </FormComponent>
    )
}

export default Textarea;
