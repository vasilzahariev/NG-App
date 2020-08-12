import React from 'react';
import {
    Link
} from 'react-router-dom';
import styles from './index.module.css'

const GameCard = (props) => {
    const getLink = () => {
        const val = props.gameName.replace(' ', '%20');

        return `/g/${val}`;
    }

    return (
        <div className={styles.card}>
            <Link className={styles.gameLink} to={getLink}>
                <img className={styles.poster} src={props.posterUrl} alt='GamePoster' />
                <h3 className={styles.gameName}>{props.gameName}</h3>
            </Link>
        </div>
    )
}

export default GameCard;
