import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import Grid from '@material-ui/core/Grid';
import styles from './index.module.css'
import { Link } from 'react-router-dom';
import StatusLinkBtn from '../status-link-btn';

const HomeUserComp = (props) => {
    const context = useContext(UserContext);

    return (
        <Grid container direction='column' justify='flex-start' alignItems='stretch'>
            <Grid item>
                <div className={styles.userCard}>
                    <h2>Hello there, <Link className={styles.userLink} to={`/u/${context.user._id}`}>{context.user.username}</Link></h2>
                    <hr className={styles.line} />
                    <StatusLinkBtn status={1} value='Want to play' to={`/u/${context.user._id}/collections/wantToPlay`} />
                    <StatusLinkBtn status={2} value='Playing' to={`/u/${context.user._id}/collections/playing`} />
                    <StatusLinkBtn status={3} value='Finished' to={`/u/${context.user._id}/collections/finished`} />
                    <StatusLinkBtn status={4} value='Abandoned' to={`/u/${context.user._id}/collections/abandoned`} />
                </div>
            </Grid>
        </Grid>
    );
}

export default HomeUserComp;
