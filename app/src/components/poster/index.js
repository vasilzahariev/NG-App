import React from 'react';
import styles from './index.module.css';

const Poster = (props) => {
    return (
        <img height={props.height} className={`${styles.poster} ${(props.status === 0 ? styles.def : (props.status === 1 ? styles.wantTo : (props.status === 2 ? styles.playing : (props.status === 3 ? styles.finished : (props.status === 4 ? styles.abond : (props.status === -1 ? '' : styles.def))))))}`} src={props.posterUrl} alt='Poster' />
    )
}

export default Poster;
