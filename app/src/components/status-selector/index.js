import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormCard from '../form-card';
import RadioBtn from '../radio-btn';
import styles from './index.module.css';
import SubmitButton from '../submit-button';
import Grid from '@material-ui/core/Grid';

const StatusSelector = (props) => {
    const history = useHistory();

    const [ status, setStatus ] = useState(0);

    const onChange = (e) => {
        const val = e.target.value;

        setStatus(val);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const promise = await fetch('http://localhost:9999/addActivity/:gameId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status,
                gameId: props.gameId,
                userId: props.userId
            })
        });

        const response = await promise.json();

        if (response.success) {
            history.push('/');
        } else {
            console.log(response.error);
            history.push('/error');
        }
    }

    return (
        <FormCard onSubmit={handleSubmit}>
            <h2>Play status:</h2>
            <div className={styles.grid}>
                <Grid container direction='column' justify="space-evenly" alignItems="center">
                    <Grid item xs={12}>
                        <RadioBtn name='status' value={1} onChange={onChange}>Want to play</RadioBtn>
                    </Grid>
                    <Grid item xs={12}>
                        <RadioBtn name='status' value={2} onChange={onChange}>Playing</RadioBtn>
                    </Grid>
                    <Grid item xs={12}>
                        <RadioBtn name='status' value={3} onChange={onChange}>Finished</RadioBtn>
                    </Grid>
                    <Grid item xs={12}>
                        <RadioBtn name='status' value={4} onChange={onChange}>Abondanded</RadioBtn>
                    </Grid>
                </Grid>
            </div>
            <SubmitButton value='Save' />
        </FormCard>
    );
}

export default StatusSelector;

        // <div className={styles.form}>
        //     <RadioBtn name='status' value={1}>Want to play</RadioBtn>
        //     <RadioBtn name='status' value={2}>Playing</RadioBtn>
        //     <RadioBtn name='status' value={3}>Abondanded</RadioBtn>
        // </div>