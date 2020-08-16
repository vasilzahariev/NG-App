import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import Layout from '../../components/layout';
import styles from './index.module.css';
import Grid from '@material-ui/core/Grid';
import ActivityRenderer from '../../components/activity-renderer';
import Title from '../../components/title';
import Page from '../../components/page-div';

const UserActivity = () => {
    const [activities, setActivities] = useState([]);
    const [username, setUsername] = useState('');
    const [ended, setEnded] = useState(false);

    const params = useParams();
    const history = useHistory();

    const getData = async () => {
        const userId = params.userId;

        const promise = await fetch(`http://localhost:9999/getUserActivity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId
            })
        });

        const response = await promise.json();

        if (response.err) { history.replace('/404'); return; }

        setActivities(response.reverse());

        const usernamePromise = await fetch(`http://localhost:9999/username/${userId}`);
        const username = await usernamePromise.json();

        setUsername(username.username);

        setEnded(true);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <Layout>
            <Page>
                <div>
                    {ended && <Title><Link to={`/u/${params.userId}`}>{username}</Link>'s Activity</Title>}
                    <Grid container direction='row' justify='space-evenly' alignItems='flex-start' >
                        <Grid item xs={2}></Grid>
                        <Grid item xs={6}>
                            {ended && activities.length === 0 ? <p>No activity! :(</p> : <ActivityRenderer activities={activities} />}
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                </div>
            </Page>
        </Layout>
    )
}

export default UserActivity;
