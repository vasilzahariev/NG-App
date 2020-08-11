import React from 'react';
import {
    Link
} from 'react-router-dom';
import styles from './index.module.css';

const FooterLink = (props) => {
    return (
        <div>
            <Link className={styles.link} to={props.to}>{props.children}</Link>
        </div>
    );
}

export default FooterLink;
