import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import Grid from '@material-ui/core/Grid';
import Poster from '../poster';

// TODO: Add ... for the tile like for the description

const ReviewCardUserProfile = (props) => {
    const [username, setUsername] = useState('');
    const [game, setGame] = useState({});
    const [ended, setEnded] = useState(false);

    const getData = () => {
        getUsername();
    }

    const getUsername = () => {
        fetch(`http://localhost:9999/username/${props.review.userId}`).then(promise => {
            promise.json().then(response => {
                setUsername(response.username);

                getGame();
            })
        });
    }

    const getGame = () => {
        fetch(`http://localhost:9999/g/${props.review.gameId}`).then(promise => {
            promise.json().then(response => {
                setGame(response);

                setEnded(true);
            })
        })
    }


    useEffect(() => {
        getData();
    }, []);

    return (
        <Grid item xs={6}>
            <Link className={styles.reviewLink} to={`/r/${props.review._id}`}>
                <div className={styles.card}>
                    <Grid container direction='row' justify='space-evenly' alignItems='flex-start' spacing={2}>
                        <Grid item xs={4}>
                            <Poster posterUrl={game.posterUrl} status={-1} height={250} />
                        </Grid>
                        <Grid item xs={7}>
                            <h2>{game.name}</h2>
                            <h3 className={styles.score}>{props.review.score} / 10</h3>
                            <p className={styles.review}>{props.review.review.length <= 100 ? props.review.review : props.review.review.slice(0, 100).trim() + '...'}</p>
                        </Grid>
                    </Grid>
                </div>
            </Link>
        </Grid>
    )
}

export default ReviewCardUserProfile;
