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
                    <div className={styles.signUpText} ><i>Join us, we've got <b>games</b>!</i></div>
                    <Link className={styles.signUpLink} to='/register'>SIGN UP</Link>
                </HomePageCard>

                <HomePageCard>
                    <i>Write <b>reviews</b> of your <b>favorite games</b> and add them to <b>custom lists</b></i>
                </HomePageCard>

                <HomePageCard>
                    <i>Find other people <b>(friends and etc)</b> and follow them to see their <b>activity</b></i>
                </HomePageCard>

                <HomePageCard>
                    <i>Keep track of the games <b>you've played</b> and <b>want to play</b></i>
                </HomePageCard>
            </div>
        </Layout>
    );
}

export default HomeGuest;
