import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Title from '../title';
import Grid from '@material-ui/core/Grid';
import HeaderLink from '../header-link';
import styles from './index.module.css';
import UserContext from '../../UserContext';
import GameButton from '../game-button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import StatusSelector from '../status-selector';
import Poster from '../poster';
import ReviewForm from '../review-form';

const GamePageComp = (props) => {
    const context = useContext(UserContext);
    const [showStatusSelector, setStatusSelector] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);

    const game = props.game;
    const reviewsLink = `/g/${game._id}/reviews`;
    const listsLink = `/g/${game._id}/lists`;

    const onClickStatus = async () => {
        setStatusSelector(!showStatusSelector);
        setShowReviewForm(false);
    }

    const onClickReview = async () => {
        setShowReviewForm(!showReviewForm);
        setStatusSelector(false);
    }

    const updateHandler = () => {
        setShowReviewForm(false);
        setStatusSelector(false);
        props.updateHandler();
    }

    return (
        <div className={styles.comp}>
            <Grid container justify="space-evenly" alignItems="center" spacing={5}>
                <Grid item xs={6}>
                    <Title><span className={styles.epicGamer}>{game.name}</span></Title>
                    { context.user && context.user.loggedIn && context.user.isAdmin && <Link to={`/admin/g/edit/${game._id}`}><h2>Edit</h2></Link>}
                    <p className={styles.description}>
                        {game.description}
                    </p>
                    <div className={styles.links}>
                        <HeaderLink to={reviewsLink}>Reviews</HeaderLink>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className={styles.cardDiv}>
                        <div className={styles.card}>
                            <Poster posterUrl={game.posterUrl} status={props.status} height={525} />
                            {context.user && context.user.loggedIn && (
                                <div className={styles.cardBottom}>
                                    <Grid container direction="row"
                                        justify="space-evenly"
                                        alignItems="center">
                                        <Grid item xs={2}>
                                            <GameButton onClick={onClickStatus}>
                                                <FontAwesomeIcon icon={faGamepad} />
                                            </GameButton>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <GameButton onClick={onClickReview}>
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

            {showStatusSelector && (<StatusSelector gameId={game._id} userId={context.user._id} status={props.status} updateHandler={updateHandler} />)}

            {showReviewForm && (<ReviewForm gameId={game._id} userId={context.user._id} />)}

            <div>
                <Title>Trailer:</Title>
                <iframe className={styles.trailer} src={game.trailerUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        </div>
    );
}

export default GamePageComp;
