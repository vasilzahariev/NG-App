import React, { useContext, onEffect, useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import styles from './index.module.css';
import Grid from '@material-ui/core/Grid';
import UserContex from '../../UserContext';

const UserProfileCard = (props) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [ended, setEnded] = useState(false);

    const context = useContext(UserContex);
    const params = useParams();
    const history = useHistory();

    const onClickFollow = async () => {
        const userId = context.user._id;
        const followsId = params.userId;

        const promise = await fetch('http://localhost:9999/follow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                followsId
            })
        });

        const response = await promise.json();

        if (response.error) {
            history.push('/error');

            return;
        }

        setEnded(false);
        await getData();
    }

    const onClickUnfollow = async () => {
        const userId = context.user._id;
        const followsId = params.userId;

        const promise = await fetch('http://localhost:9999/unfollow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                followsId
            })
        });

        const response = await promise.json();

        if (response.error) {
            history.push('/error');

            return;
        }

        setEnded(false);
        await getData();
    }

    const getData = async () => {
        const userId = context.user._id;
        const followsId = params.userId;

        const promise = await fetch('http://localhost:9999/isFollowing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                followsId
            })
        });

        const response = await promise.json();

        setIsFollowing(response.isFollowing);
        setEnded(true);
    }

    useEffect(() => {
        if (context.user && context.user.loggedIn) {
            getData();
        }
    }, []);

    return (
        <div className={styles.card}>
            <Grid container direction='row' justify='space-between' alignItems='center'>
                <Grid item xs={1}>
                </Grid>
                <Grid className={styles.userInfo} item xs={2}>
                    <p><Link className={styles.username} to={`/u/${props.user._id}`}>{props.user.username}</Link></p>
                    {props.user.fullName && (<p>Name: {props.user.fullName}</p>)}
                </Grid>
                <Grid item xs={1}>
                    {context.user && context.user.loggedIn && context.user._id !== props.user._id && ended && !isFollowing && <button className={styles.btn} onClick={onClickFollow}>Follow</button>}
                    {context.user && context.user.loggedIn && context.user._id !== props.user._id && ended && isFollowing && <button className={styles.btn} onClick={onClickUnfollow}>Unfollow</button>}
                </Grid>
                <Grid item xs={5}>
                </Grid>
                <Grid item xs={1}>
                    <p className={styles.followInfo}><b>{props.following}</b> Following</p>
                    <p className={styles.followInfo}><b>{props.followers}</b> Followers</p>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </div>
    )
}

export default UserProfileCard;
