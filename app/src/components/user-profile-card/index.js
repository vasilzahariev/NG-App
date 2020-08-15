import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import Grid from '@material-ui/core/Grid';

const UserProfileCard = (props) => {
    return (
        <div className={styles.card}>
            <Grid container direction='row' justify='space-between' alignItems='center'>
                <Grid item xs={1}>
                </Grid>
                <Grid className={styles.userInfo} item xs={5}>
                    <p><Link className={styles.username} to={`/u/${props.user._id}`}>{props.user.username}</Link></p>
                    {props.user.fullName && (<p>Name: {props.user.fullName}</p>)}
                </Grid>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
        </div>
    )
}

export default UserProfileCard;
