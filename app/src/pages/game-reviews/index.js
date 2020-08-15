import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import styles from './index.module.css';
import Layout from '../../components/layout';
import Page from '../../components/page-div';
import Title from '../../components/title';
import ReviewsRenderer from '../../components/reviews-renderer';

const GameReview = () => {
    const [reviews, setReviews] = useState([]);
    const [ gameName, setGameName ] = useState('');
    const [ended, setEnded] = useState(false);

    const params = useParams();
    const history = useHistory();

    const getData = () => {
        const gameId = params.gameId;

        fetch(`http://localhost:9999/g/${gameId}/reviews`).then(promise => {
            if (!promise.ok) { history.push('/404'); return; }

            promise.json().then(response => {
                fetch(`http://localhost:9999/g/${gameId}`).then(promise => {
                    promise.json().then(response => {
                        setGameName(response.name);
                    })
                })

                setReviews(response.reviews.reverse());
                setEnded(true);
            });
        });
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <Layout>
            <Page>
                { ended && <Title>Latest Reviews for <Link to={`/g/${params.gameId}`}>{gameName}</Link></Title> }
                {!ended ? <h2>Getting mission's feedback...</h2> : (reviews.length === 0 ? <h2>No reviews!</h2> : (<ReviewsRenderer reviews={reviews} />))}
            </Page>
        </Layout>
    )
}

export default GameReview;
