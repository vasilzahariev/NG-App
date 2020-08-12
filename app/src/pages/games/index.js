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
    const [ ended, setEnded ] = useState(false);

    useEffect(() => {

        fetch('http://localhost:9999/getGames', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => {
            promise.json().then(response => {
                setGames(response);
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
                    {(context.user && context.user.loggedIn) ? <HeaderLink to='/admin/g/add'>Add a game</HeaderLink> : <span></span>}
                </Title>

                { (ended && games.length === 0) ? <p>No games! :(</p> :  <GamesRenderer games={games} /> }
            </div>
        </Layout>
    );
}

export default Games;
