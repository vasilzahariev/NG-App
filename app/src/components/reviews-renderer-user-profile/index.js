import React, { useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import ReviewCardUserProfile from '../review-card-user-profile';

const ReviewsRendererUserProfile = (props) => {
    const renderer = useMemo(() => {
        return props.reviews.map((review, index) => {
            return (
                <ReviewCardUserProfile key={review._id} index={index} review={review} />
            )
        })
    }, [props.reviews]);

    return (
        <Grid container direction="row" justify="space-around" alignItems="center" spacing={5}>
            {renderer}
        </Grid>
    )
}

export default ReviewsRendererUserProfile;
