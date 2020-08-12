import React from 'react';
import FormComponent from '../../components/form-component';
import styles from './index.module.css';

const ImageInput = (props) => {
    return (
        <div>
            <FormComponent>
                <span className={styles.labelText}>{props.label}</span>
                <input className={props.error ? styles.errorField : styles.field} type='file' onChange={props.onChange} name={props.name ? props.name : props.label.toLowerCase()} placeholder={props.label} />
                {props.error ? <p className={styles.error}>{props.error}</p> : <span></span>}
            </FormComponent>
            {props.preview && (
                <div className={styles.previewDiv}>
                    <img className={styles.preview} src={props.preview} alt='preview' />
                </div>
            )}
        </div>
    );
}

export default ImageInput;
