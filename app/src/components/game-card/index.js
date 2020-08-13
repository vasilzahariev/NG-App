import React from 'react';
import {
    Link
} from 'react-router-dom';
import styles from './index.module.css';
import Grid from '@material-ui/core/Grid';

const GameCard = (props) => {
    const getLink = () => {
        return `/g/${props.game_id}`;
    }

    return (
        <Grid item xs={2}>
            <div className={styles.card}>
                <Link className={styles.gameLink} to={getLink}>
                    <img className={`${styles.poster} ${(props.status === 0 ? styles.def : (props.status === 1 ? styles.wantTo : (props.status === 2 ? styles.playing : (props.status === 3 ? styles.finished : (props.status === 4 ? styles.abond : styles.def)))))}`} src={props.posterUrl} alt='GamePoster' />
                    <h4 className={styles.gameName}>{props.gameName}</h4>
                </Link>
            </div>
        </Grid>
    )
}

export default GameCard;
