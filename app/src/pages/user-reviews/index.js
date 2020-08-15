import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import Layout from '../../components/layout';
import Page from '../../components/page-div';
import Title from '../../components/title';
import ReviewsRenderer from '../../components/reviews-renderer';
import { useParams, useHistory, Link } from 'react-router-dom';

const UserReviews = () => {
    const [ reviews, setReviews ] = useState(null);
    const [ username, setUsername ] = useState(null);
    const [ ended, setEnded ] = useState(false);
    
    const params = useParams();
    const history = useHistory();

    const getData = () => {
        const userId = params.userId;

        fetch(`http://localhost:9999/u/${userId}/reviews`).then(promise => {
            promise.json().then(response => {
                if (response.err) { history.push('/404'); return; }

                setUsername(response.username);
                setReviews(response.reviews.reverse());
                setEnded(true);
            })
        })
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Layout>
            <Page>
                <Title><Link to={`/u/${params.userId}`}>{username}</Link>'s Reviews</Title>
                { !ended ? <h2>Getting missions' feedback...</h2> : ( reviews.length === 0 ? <h2>No reviews!</h2> : (<ReviewsRenderer reviews={reviews} />) )}
            </Page>
        </Layout>
    );
}

export default UserReviews;
