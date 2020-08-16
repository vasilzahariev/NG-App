import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import styles from './index.module.css';
import Layout from '../../components/layout';
import Page from '../../components/page-div';
import Grid from '@material-ui/core/Grid';
import UserProfileCard from '../../components/user-profile-card';
import ActivityProfileCard from '../../components/activity-profile-card';
import UserCollectionBtns from '../../components/user-collection-btns';
import ReviewsRendererUserProfile from '../../components/reviews-renderer-user-profile';

const User = () => {
    const [user, setUser] = useState(null);
    const [activity, setActivity] = useState(null);
    const [games, setGames] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [following, setFollowing] = useState(0);
    const [followers, setFollowers] = useState(0);

    const [ended, setEnded] = useState(false);

    const params = useParams();
    const history = useHistory();

    const getData = () => {
        const userId = params.userId;

        fetch(`http://localhost:9999/u/${userId}`).then(promise => {
            promise.json().then(response => {
                if (response.err) { history.replace('/404'); return; }

                setUser(response.user);
                setActivity(response.activity);
                setGames(response.games);
                setReviews(response.reviews);
                setFollowing(response.following);
                setFollowers(response.followers);
                setEnded(true);
            })
        })
    }

    useEffect(() => {
        getData();
    }, [user])

    return (
        <Layout>
            <Page>
                <Grid container direction='column' justify='space-evenly' alignItems='stretch' spacing={3}>
                    <Grid item>
                        {ended && (<UserProfileCard user={user} following={following} followers={followers} />)}
                    </Grid>
                    <Grid item>
                        {ended && (<Link className={styles.link} to={`/u/${user._id}/activity`}><h1 className={styles.title}>Activity</h1></Link>)}
                        {ended && (activity.length !== 0 && games.length !== 0) && (<ActivityProfileCard activity={activity} games={games} />)}
                        {ended && (activity.length === 0) && (<p>No Activity!</p>)}
                    </Grid>
                    <Grid item>
                        <Grid className={styles.collections} container direction='row' justify='space-between' alignItems="flex-start">
                            <Grid item xs={9}>
                                {ended && (<Link className={styles.link} to={`/u/${user._id}/reviews`}><h1 className={styles.title}>Reviews</h1></Link>)}
                                {ended && (<ReviewsRendererUserProfile reviews={reviews} />)}
                                {ended && (reviews.length === 0) && (<p>No Reviews!</p>)}
                            </Grid>
                            <Grid item xs={2}>
                                {ended && <h1 className={styles.title}>Collections</h1>}
                                {ended && (<UserCollectionBtns user={user} />)}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Page>
        </Layout>
    )
}

export default User;
