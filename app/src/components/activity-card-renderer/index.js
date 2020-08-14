import React, { useEffect, useState } from 'react';
import ActivityCard from '../activity-card';

const ActivityCardRenderer = (props) => {
    const [ game, setGame ] = useState(null);
    const [ username, setUsername ] = useState(null);

    const getData = async () => {
        await getGame();
        await getUsername();
    }

    const getGame = async () => {
        const gameId = props.activity.gameId;

        const promise = await fetch(`http://localhost:9999/g/${gameId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const response = await promise.json();

        setGame(response);
    }

    const getUsername = async () => {
        const userId = props.activity.userId;

        const promise = await fetch(`http://localhost:9999/username/${userId}`);

        const response = await promise.json();

        setUsername(response.username);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        (!game && !username ? <p>Loading...</p> : (<ActivityCard activity={props.activity} game={game} username={username} />))
    )
}

export default ActivityCardRenderer;
