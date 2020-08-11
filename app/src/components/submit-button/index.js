import React from 'react';
import styles from './index.module.css'

const SubmitButton = (props) => {
    return (
        <div className={styles.submitDiv}>
            <input className={styles.submitBtn} type='submit' value={props.value ? props.value : 'submit' } />
        </div>
    )
}

export default SubmitButton;
