import React, { useContext } from 'react';
import Title from '../title';
import Grid from '@material-ui/core/Grid';
import HeaderLink from '../header-link';
import styles from './index.module.css';
import UserContext from '../../UserContext';
import GameButton from '../game-button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faPlus, faPen } from '@fortawesome/free-solid-svg-icons';

const GamePageComp = (props) => {
    const context = useContext(UserContext);

    const game = props.game;
    const reviewsLink = `/g/${game._id}/reviews`;
    const listsLink = `/g/${game._id}/lists`;

    return (
        <div className={styles.comp}>
            <Grid container justify="space-evenly" alignItems="center" spacing={5}>
                <Grid item xs={6}>
                    <Title><span className={styles.epicGamer}>{game.name}</span></Title>
                    <p class={styles.description}>
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
                                            <GameButton>
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

            <div>
                <Title>Trailer:</Title>
                <iframe className={styles.trailer} src={game.trailerUrl} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    );
}

export default GamePageComp;
