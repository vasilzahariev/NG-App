import React from 'react';
import Layout from '../../components/layout/'
import HomePageCard from '../../components/home-page-card/'
import {
    Link
} from 'react-router-dom';
import styles from './index.module.css';
import Grid from '@material-ui/core/Grid';

const HomeGuest = () => {
    return (
        <Layout>
            <div className={styles.cards}>
                <Grid container direction='row' justify='center' alignItems='flex-start' spacing={10} >
                    <Grid item xs={5}>
                        <HomePageCard>
                            <div className={styles.signUpText} >Join us, we've got <span className={styles.epicGamer}>games</span>!</div>
                            <Link className={styles.signUpLink} to='/register'>REGISTER</Link>
                        </HomePageCard>
                    </Grid>
                    <Grid item xs={5}>
                        <HomePageCard>
                            Write <span className={styles.epicGamer}>reviews</span> of your <span>favorite games</span> and add them to <span>custom lists</span>
                        </HomePageCard>
                    </Grid>
                    <Grid item xs={5}>
                        <HomePageCard>
                            Find other people <span className={styles.epicGamer}>(friends and etc)</span> and follow them to see their <span className={styles.epicGamer}>activity</span>
                        </HomePageCard>
                    </Grid>
                    <Grid item xs={5}>
                        <HomePageCard>
                            Keep track of the games <span className={styles.epicGamer}>you've played</span> and <span className={styles.epicGamer}>want to play</span>
                        </HomePageCard>
                    </Grid>
                </Grid>
            </div>
        </Layout>
    );
}

export default HomeGuest;
