import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import styles from './index.module.css';
import Layout from '../../components/layout';
import Page from '../../components/page-div';
import Title from '../../components/title';
import { getStatus, getStatusName } from '../../utils/status';
import GstatusGamesRenderer from '../../components/gstatus-games-renderer';

const UserGstatusGames = () => {
    const [statusName, setStatusName] = useState('');
    const [username, setUsername] = useState('');
    const [games, setGames] = useState([]);
    const [ended, setEnded] = useState(false);

    const params = useParams();
    const history = useHistory();

    const getData = (status) => {
        const userId = params.userId;

        fetch(`http://localhost:9999/username/${userId}`).then(promise => {
            promise.json().then(response => {
                if (!response.username) { history.push('/404'); return; }

                setUsername(response.username);

                fetch('http://localhost:9999/userGamesWithStatus', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId,
                        status
                    })
                }).then(promise => {
                    promise.json().then(response => {
                        setGames(response.games.reverse());
                        setEnded(true);
                    });
                });
            });
        });
    }

    useEffect(() => {
        const status = getStatus(params.gStatus);

        if (status === -1) { history.push('/404'); return; }

        setStatusName(getStatusName(status));

        getData(status);

    }, [])

    return (
        <Layout>
            <Page>
                {username ? <Title><Link to={`/u/${params.userId}`}>{username}</Link>'s {statusName}</Title> : <Title>Receving commander's name...</Title>}
                {!ended ? <Title>Receiving coordinates for the mission...</Title> : (ended && games.length === 0 ? <p>No games! :{'('} </p> : <GstatusGamesRenderer games={games} />)}
            </Page>
        </Layout>
    )
}

export default UserGstatusGames;
