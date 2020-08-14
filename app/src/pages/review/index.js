import React, { useEffect, useState } from 'react';
import {
    useParams,
    useHistory,
    Link
} from 'react-router-dom';
import Layout from '../../components/layout';
import Page from '../../components/page-div';
import Grid from '@material-ui/core/Grid';
import Poster from '../../components/poster';
import styles from './index.module.css';

const Review = () => {
    const [review, setReview] = useState({});
    const [game, setGame] = useState({});
    const [username, setUsername] = useState('');

    const params = useParams();
    const history = useHistory();

    const getData = () => {
        const reviewId = params.reviewId;

        fetch(`http://localhost:9999/r/${reviewId}`).then(promise => {
            promise.json().then(response => {
                if (response.err) {
                    history.push('/error');

                    return;
                }

                setReview(response.review);
                setGame(response.game);
                setUsername(response.username);
            })
        });
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <Layout>
            <Page>
                <Grid container justify="space-evenly" alignItems="center" spacing={6}>
                    <Grid item xs={6}>
                        <h1><Link className={styles.gameLink} to={`/g/${game._id}`}>{game.name}</Link></h1>
                        <p className={styles.review}>
                            {review.review}
                        </p>
                        <h2 className={styles.score}>{review.score} / 10 from <Link className={styles.userLink} to={`/u/${review.userId}`}>{username}</Link></h2>
                    </Grid>
                    <Grid item xs={3}>
                        <Link to={`/g/${game._id}`}>
                            <Poster posterUrl={game.posterUrl} status={-1} height={500} />
                        </Link>
                    </Grid>
                </Grid>
            </Page>
        </Layout>
    )
}

export default Review;
