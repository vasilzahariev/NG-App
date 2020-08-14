import React from 'react';
import ActivityRenderer from '../activity-renderer';
import Grid from '@material-ui/core/Grid';
import styles from './index.module.css';
import HomeUserComp from '../../components/home-user-comp';

const HomeUserRenderer = (props) => {
    return (
        <div className={styles.page}>
            <Grid container direction='row' justify='space-evenly' alignItems='flex-start' >
                <Grid item xs={2}>
                <HomeUserComp />
                </Grid>
                <Grid item xs={6}>
                    {props.activities.length === 0 ? <p>No activity! :(</p> : <ActivityRenderer activities={props.activities} />}
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </div>
    )
}

export default HomeUserRenderer
