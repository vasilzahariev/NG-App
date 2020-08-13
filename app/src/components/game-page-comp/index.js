import React, { useContext, useState } from 'react';
import Title from '../title';
import Grid from '@material-ui/core/Grid';
import HeaderLink from '../header-link';
import styles from './index.module.css';
import UserContext from '../../UserContext';
import GameButton from '../game-button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import StatusSelector from '../status-selector';

const GamePageComp = (props) => {
    const context = useContext(UserContext);
    const [showStatusSelector, setStatusSelector] = useState(false);

    const game = props.game;
    const reviewsLink = `/g/${game._id}/reviews`;
    const listsLink = `/g/${game._id}/lists`;

    const onClickStatus = async () => {
        setStatusSelector(!showStatusSelector);
    }

    return (

        <div className={styles.comp}>
            <Grid container justify="space-evenly" alignItems="center" spacing={5}>
                <Grid item xs={6}>
                    <Title><span className={styles.epicGamer}>{game.name}</span></Title>
                    <p className={styles.description}>
                        {game.description}
                    </p>
                    <div className={styles.links}>
                        <HeaderLink to={reviewsLink}>Reviews</HeaderLink>
                        <HeaderLink to={listsLink}>Lists</HeaderLink>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className={styles.cardDiv}>
                        <div className={styles.card}>
                            <img className={styles.poster} src={game.posterUrl} alt='Poster' />
                            {context.user && context.user.loggedIn && (
                                <div className={styles.cardBottom}>
                                    <Grid container direction="row"
                                        justify="space-evenly"
                                        alignItems="center" spacing={2}>
                                        <Grid item xs={4}>
                                            <GameButton onClick={onClickStatus}>
                                                <FontAwesomeIcon icon={faGamepad} />
                                            </GameButton>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <GameButton>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </GameButton>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <GameButton>
                                                <FontAwesomeIcon icon={faPen} />
                                            </GameButton>
                                        </Grid>
                                    </Grid>
                                </div>
                            )}
                        </div>
                    </div>
                </Grid>
            </Grid>

            { showStatusSelector && (<StatusSelector gameId={game._id} userId={context.user._id} />) }

            <div>
                <Title>Trailer:</Title>
                <iframe className={styles.trailer} src={game.trailerUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        </div>
    );
}

export default GamePageComp;
