import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormCard from '../form-card';
import Input from '../input';
import Textarea from '../textarea';
import SubmitBtn from '../submit-button';

const ReviewForm = (props) => {
    const [ review, setReview ] = useState('');
    const [ reviewErr, setReviewErr ] = useState('');

    const [ score, setScore ] = useState(0);
    const [ scoreErr, setScoreErr ] = useState('');

    const history = useHistory();

    const onChangeReview = (e) => {
        const val = e.target.value;

        setReview(val);

        if (val.length < 1) setReviewErr('The review should be at least 1 character long');
        else if (val.includes('"')) setReviewErr(`The review shouldn't have quotes("")`);
        else setReviewErr('');
    }

    const onChangeScore = (e) => {
        const val = e.target.value;

        setScore(val);

        if (val < 0 || val > 10) setScoreErr('The score must be between 0 and 10');
        else if (!Number(val)) setScoreErr('The score must be a number');
        else setScoreErr('');
    }

    const canSubmit = () => {
        if (reviewErr || scoreErr) return false;
        if (!review) { setReviewErr('The review should be at least 1 character long'); return false; }

        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!canSubmit()) return;

        const promise = await fetch('http://localhost:9999/addReview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                review,
                score,
                gameId: props.gameId,
                userId: props.userId
            })
        });

        const response = await promise.json();

        if (response.err) {
            console.log(response.err);
            history.push('/error');
        } else {
            history.push(`/r/${response.reviewId}`);
        }
    }

    return (
        <FormCard onSubmit={handleSubmit}>
            <h2>Write a review</h2>
            <Textarea label='Review' onChange={onChangeReview} error={reviewErr} />
            <Input label='Score' type='number' onChange={onChangeScore} error={scoreErr} placeholder='Score (0 by default)' min={0} max={10} />
            <SubmitBtn value='Submit' />
        </FormCard>
    );
}

export default ReviewForm;
