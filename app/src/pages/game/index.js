import React, { useEffect, useState, useCallback } from 'react';
import {
    useParams,
    useHistory
} from 'react-router-dom';
import Layout from '../../components/layout';
import Page from '../../components/page-div';
import Title from '../../components/title';
import GamePageComp from '../../components/game-page-comp';

const Game = () => {
    const [game, setGame] = useState(null);

    const params = useParams();
    const history = useHistory();

    const getData = async () => {
        const id = params.gameId;

        const promise = await fetch(`http://localhost:9999/g/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!promise.ok) {
            history.push('/404');
        } else {
            const response = await promise.json();

            const game = response.game;

            setGame(game);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Layout>
            <Page>
                {game ?
                    (
                        <GamePageComp game={game} />
                    ) : (
                        <Title>Reciving data for the mission...</Title>
                    )}
            </Page>
        </Layout>
    )
}

export default Game;
