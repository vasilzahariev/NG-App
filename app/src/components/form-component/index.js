import React from 'react';
import styles from './index.module.css'

const FormComponent = (props) => {
    return (
        <div className={styles.block}>
            <label>
                {props.children}
            </label>
        </div>
    )
}

export default FormComponent;
