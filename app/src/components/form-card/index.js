import React from 'react';
import styles from './index.module.css';

const FormCard = (props) => {
    return (
        <form className={styles.card} onSubmit={props.onSubmit}>
            {props.children}
        </form>
    );
}

export default FormCard;
