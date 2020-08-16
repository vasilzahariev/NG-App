import React, { useEffect, useState, useContext } from 'react';
import {
    useParams,
    useHistory
} from 'react-router-dom';
import Layout from '../../components/layout';
import Page from '../../components/page-div';
import Title from '../../components/title';
import GamePageComp from '../../components/game-page-comp';
import UserContext from '../../UserContext';

const Game = () => {
    const [game, setGame] = useState(null);
    const [ status, setStatus ] = useState(0);

    const params = useParams();
    const history = useHistory();
    const context = useContext(UserContext);

    const getData = () => {
        const id = params.gameId;

        fetch(`http://localhost:9999/getGame`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                gameId: id,
                userId: (context.user && context.user.loggedIn ? context.user._id : '')
            })
        }).then(promise => {
            if (!promise.ok) {
                history.replace('/404');
            } else {
                promise.json().then(response => {
                    const game = response.game;
                    const status = response.status;
        
                    setGame(game);
                    setStatus(status);
                });
    
            }
        });

    }

    useEffect(() => {
        getData();
    }, []);

    const updateHandler = () => {
        getData();
    }

    return (
        <Layout>
            <Page>
                {game ?
                    (
                        <GamePageComp game={game} status={status} updateHandler={updateHandler} />
                    ) : (
                        <Title>Reciving data for the mission...</Title>
                    )}
            </Page>
        </Layout>
    )
}

export default Game;
