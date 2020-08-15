import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout';
import HeaderLink from '../../components/header-link';
import Title from '../../components/title';
import GamesRenderer from '../../components/games-renderer';
import styles from './index.module.css';
import UserContext from '../../UserContext';

const Games = () => {
    const context = useContext(UserContext);
    
    const [ games, setGames ] = useState([]);
    const [ statuses, setStatuses ] = useState([]);
    const [ ended, setEnded ] = useState(false);

    useEffect(() => {

        fetch('http://localhost:9999/getGames', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: (context.user && context.user.loggedIn ? context.user._id : '')
            })
        }).then(promise => {
            promise.json().then(response => {
                const gamesArr = response.games.reverse();
                const statusesArr = response.statuses;

                setStatuses(statusesArr);
                setGames(gamesArr);
                setEnded(true);
            });
        });
    }, []);

    return (
        <Layout>
            <div className={styles.page}>
                <Title>
                    Latest Games
                    <br />
                    {(context.user && context.user.loggedIn && context.user.isAdmin) ? <HeaderLink to='/admin/g/add'>Add a game</HeaderLink> : <span></span>}
                </Title>

                {!ended ? <p>Receiving missions...</p> : (ended && games.length === 0) ? <p>No games! :(</p> :  <GamesRenderer statuses={statuses} games={games} test={true} /> }
            </div>
        </Layout>
    );
}

export default Games;
