import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

const StatusLinkBtn = (props) => {
    return (
        <div>
            <Link to={props.to}><input className={`${styles.btn} ${props.status === 0 ? styles.def : (props.status === 1 ? styles.wantTo : (props.status === 2 ? styles.playing : (props.status === 3 ? styles.finished : (props.status === 4 ? styles.abond : styles.def))))}`} type='button' value={props.value} /></Link>
        </div>
    )
}

export default StatusLinkBtn;
