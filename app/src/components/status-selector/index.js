import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormCard from '../form-card';
import RadioBtn from '../radio-btn';
import styles from './index.module.css';
import SubmitButton from '../submit-button';
import Grid from '@material-ui/core/Grid';

const StatusSelector = (props) => {
    const history = useHistory();

    const [status, setStatus] = useState(0);

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
            props.updateHandler();
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
                        <RadioBtn name='status' value={1} onChange={onChange}><span className={styles.wantTo}>Want to play</span></RadioBtn>
                    </Grid>
                    <Grid item xs={12}>
                        <RadioBtn name='status' value={2} onChange={onChange}><span className={styles.playing}>Playing</span></RadioBtn>
                    </Grid>
                    <Grid item xs={12}>
                        <RadioBtn name='status' value={3} onChange={onChange}><span className={styles.finished}>Finished</span></RadioBtn>
                    </Grid>
                    <Grid item xs={12}>
                        <RadioBtn name='status' value={4} onChange={onChange}><span className={styles.abond}>Abandoned</span></RadioBtn>
                    </Grid>
                </Grid>
            </div>
            <SubmitButton value='Save' />
            <p className={styles.disclaimer}>Disclaimer: If you don't select any of the options and hit save, you'll remove the game from you collections (not lists)</p>
        </FormCard>
    );
}

export default StatusSelector;

        // <div className={styles.form}>
        //     <RadioBtn name='status' value={1}>Want to play</RadioBtn>
        //     <RadioBtn name='status' value={2}>Playing</RadioBtn>
        //     <RadioBtn name='status' value={3}>Abondanded</RadioBtn>
        // </div>