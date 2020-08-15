import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout';
import Title from '../../components/title';
import UserContext from '../../UserContext';
import styles from './index.module.css';
import HomeUserRenderer from '../../components/home-user-renderer';

const HomeUser = () => {
    const context = useContext(UserContext);

    const [activities, setActivities] = useState([]);
    const [ended, setEnded] = useState(false);

    const getData = () => {
        const userId = context.user._id;

        fetch(`http://localhost:9999/getUserActivity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId
            })
        }).then(promise => {
            promise.json().then(response => {
                setActivities(response.reverse());
                setEnded(true);
            });
        });

    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <Layout>
            {!ended ? <p>Reciving mission summary</p> : <HomeUserRenderer activities={activities} />}
        </Layout>
    )
}

export default HomeUser;
