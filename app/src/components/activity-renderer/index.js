import React, { useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import ActivityCardRenderer from '../activity-card-renderer';

const ActivityRenderer = (props) => {
    const renderer = useMemo(() => {
        return props.activities.map((activity, index) => {
            return (
                <ActivityCardRenderer key={activity._id} index={index} activity={activity} />
            );
        })
    }, [props.activities]);

    return (
        <Grid container direction='column' justify="space-around" alignItems="stretch" spacing={5}>
            {renderer}
        </Grid>
    )
}

export default ActivityRenderer;
