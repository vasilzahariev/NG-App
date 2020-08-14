import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import Layout from '../../components/layout';
import Page from '../../components/page-div';
import Title from '../../components/title';
import ReviewsRenderer from '../../components/reviews-renderer';

const Reviews = (props) => {
    const [ reviews, setReviews ] = useState(null);
    const [ ended, setEnded ] = useState(false);    

    const getData = () => {
        fetch('http://localhost:9999/getReviews').then(promise => {
            promise.json().then(reponse => {
                setReviews(reponse.reviews.reverse());
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
                <Title>Latest Reviews</Title>
                { !ended ? <h2>Getting missions' feedback...</h2> : ( reviews.length === 0 ? <h2>No reviews!</h2> : (<ReviewsRenderer reviews={reviews} />) )}
            </Page>
        </Layout>
    );
}

export default Reviews;
