import React from 'react';
import Layout from '../../components/layout/'
import HomePageCard from '../../components/home-page-card/'
import {
    Link
} from 'react-router-dom';
import styles from './index.module.css';

const HomeGuest = () => {
    return (
        <Layout>
            <div className={styles.cards}>
                <HomePageCard>
                    <div className={styles.signUpText} >Join us, we've got <span className={styles.epicGamer}>games</span>!</div>
                    <Link className={styles.signUpLink} to='/register'>REGISTER</Link>
                </HomePageCard>

                <HomePageCard>
                    Write <span className={styles.epicGamer}>reviews</span> of your <span>favorite games</span> and add them to <span>custom lists</span>
                </HomePageCard>

                <HomePageCard>
                    Find other people <span className={styles.epicGamer}>(friends and etc)</span> and follow them to see their <span>activity</span>
                </HomePageCard>

                <HomePageCard>
                    Keep track of the games <span className={styles.epicGamer}>you've played</span> and <span>want to play</span>
                </HomePageCard>
            </div>
        </Layout>
    );
}

export default HomeGuest;
