import React from 'react';
import {
    Link
} from 'react-router-dom';
import styles from './index.module.css'

const GameCard = (props) => {
    const getLink = () => {
        return `/g/${props.game_id}`;
    }

    return (
        <div className={styles.card}>
            <Link className={styles.gameLink} to={getLink}>
                <img className={styles.poster} src={props.posterUrl} alt='GamePoster' />
                <h4 className={styles.gameName}>{props.gameName}</h4>
            </Link>
        </div>
    )
}

export default GameCard;
