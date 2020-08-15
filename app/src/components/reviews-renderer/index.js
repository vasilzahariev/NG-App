import React, { useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import ReviewCard from '../review-card';

const ReviewsRenderer = (props) => {
    const renderer = useMemo(() => {
        return props.reviews.map((review, index) => {
            return (
                <ReviewCard key={review._id} index={index} review={review} height={props.height} />
            )
        })
    }, [props.reviews]);

    return (
        <Grid container direction="row" justify="space-around" alignItems="center" spacing={5}>
            {renderer}
        </Grid>
    )
}

export default ReviewsRenderer;
