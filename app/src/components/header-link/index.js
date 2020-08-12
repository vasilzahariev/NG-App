import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

const HeaderLink = (props) => {
    return (
        <div className={styles.linkBlock} >
            <Link className={props.epicGamer ? styles.epicGamer : styles.link} to={props.to ? props.to : ''} onClick={props.onClick}>{props.children}</Link>
        </div>
    );
}

export default HeaderLink;
