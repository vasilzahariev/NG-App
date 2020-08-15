import React, { useMemo } from 'react';
import {
    Link
} from 'react-router-dom';
import styles from './index.module.css';
import Grid from '@material-ui/core/Grid';
import Poster from '../poster';

const ActivityProfileCard = (props) => {
    const renderer = useMemo(() => {
        return props.activity.map((activity, index) => {
            for (const game of props.games) {
                if (activity.gameId === game._id) {
                    return (
                        <Grid key={activity._id} index={index} item xs={2}>
                            <Link to={`/g/${game._id}`}><Poster posterUrl={game.posterUrl} status={activity.status} height={340} /></Link>
                        </Grid>
                    )
                }
            }
        })
    }, [props.activity]);

    return (
        <Grid container direction='row' justify='flex-start' alignItems='center' spacing={5}>
            {renderer}
        </Grid>
    )
}

export default ActivityProfileCard;
