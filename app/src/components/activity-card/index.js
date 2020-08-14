import React from 'react';
import Poster from '../poster';
import Grid from '@material-ui/core/Grid';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

const ActivityCard = (props) => {    
    return (
        <Grid item>
            <p className={styles.userInfo}><Link className={styles.userLink} to={`/u/${props.activity.userId}`}>{props.username}</Link> {props.activity.message}</p>
            <Link className={styles.gameLink} to={`/g/${props.game._id}`}>
                <div className={styles.card}>
                    <Grid container direction='row' justify='space-evenly' alignItems='flex-start' spacing={2}>
                        <Grid item xs={3}>
                            <Poster posterUrl={props.game.posterUrl} status={props.activity.status} height={275} />
                        </Grid>
                        <Grid item xs={8}>
                            <h1>{props.game.name}</h1>
                            <p className={styles.description}>{props.game.description.length <= 300 ? props.game.description : props.game.description.slice(0, 300).trim() + '...'}</p>
                        </Grid>
                    </Grid>
                </div>
            </Link>
        </Grid>
    );
}


// <div className={styles.posterDiv}>
//                     <Poster posterUrl={props.game.posterUrl} status={props.activity.status} height={275} />
//                 </div>
//                 <div className={styles.textDiv}>
//                 </div>

export default ActivityCard;
