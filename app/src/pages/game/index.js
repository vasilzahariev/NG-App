import React, { useEffect, useState, useCallback } from 'react';
import {
    useParams,
    useHistory
} from 'react-router-dom';
import Layout from '../../components/layout';
import Page from '../../components/page-div';
import Title from '../../components/title';

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

            console.log(game);

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
                        <Title>{game.name}</Title>
                    ) : (
                        <Title>Reciving data for the mission...</Title>
                    )}
            </Page>
        </Layout>
    )
}

export default Game;
