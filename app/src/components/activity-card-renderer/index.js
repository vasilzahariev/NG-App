import React, { useEffect, useState } from 'react';
import ActivityCard from '../activity-card';

const ActivityCardRenderer = (props) => {
    const [game, setGame] = useState(null);
    const [username, setUsername] = useState(null);

    const getData = () => {
        const gameId = props.activity.gameId;
        const userId = props.activity.userId;

        fetch(`http://localhost:9999/g/${gameId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => {
            promise.json().then(response => {
                setGame(response);

                fetch(`http://localhost:9999/username/${userId}`).then(promise => {
                    promise.json().then(response => {
                        setUsername(response.username);
                    });
                });

            });
        });
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        (!game && !username ? <p>Loading...</p> : (<ActivityCard activity={props.activity} game={game} username={username} />))
    )
}

export default ActivityCardRenderer;
