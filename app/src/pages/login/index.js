import React, { useState, useContext } from 'react';
import {
    Link,
    useHistory
} from 'react-router-dom';
import Layout from '../../components/layout';
import Title from '../../components/title';
import styles from './index.module.css';
import FormCard from '../../components/form-card';
import Input from '../../components/input';
import SubmitButton from '../../components/submit-button';
import UserContext from '../../UserContext';

const Login = () => {
    const history = useHistory();
    const context = useContext(UserContext);

    const [ username, setUsername ] = useState('');
    const [ usernameErr, setUsernameErr ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');

    const onChangeUsername = e => {
        const val = e.target.value;
        
        setUsername(val);

        if (val.length < 3) {
            setUsernameErr('Username should be at least 3 characters long');
        } else {
            setUsernameErr('');
        }
    }

    const onChangePassword = e => {
        const val = e.target.value;

        setPassword(val);

        if (val.length < 6) {
            setPasswordErr('Password should be at least 6 characters long');
        } else if (!val.match(/^[A-Za-z0-9]+$/)) {
            setPasswordErr('Password should consist only english letters and digits');
        } else {
            setPasswordErr('');
        }
    }

    const canSubmit = () => {
        if (usernameErr || passwordErr || !username || !password) return false;

        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!canSubmit()) return;

        const promise = await fetch('http://localhost:9999/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const response = await promise.json();

        if (response.error) {
            if (response.error.includes('username')) {
                setUsernameErr(response.error);
            } else if (response.error.includes('password')) {
                setPasswordErr(response.error);
            } else {
                console.log(response.error);
            }
        } else {
            const cookie = response.cookie;
            const user = response.user;

            
            console.log(context);
            
            context.login(user);
            document.cookie = `aid=${cookie}`;

            history.push('/');
        }
    }

    return (
        <Layout>
            <div className={styles.page}>
                <Title>Welcome back, <span className={styles.epicGamer}>epic gamer</span>!</Title>
                
                <FormCard onSubmit={handleSubmit}>
                    <Input label='Username' error={usernameErr} onChange={onChangeUsername} />
                    <Input label='Password' type='password' error={passwordErr} onChange={onChangePassword} />
                    <SubmitButton value='Login' />
                    <p>Don't have an account? <Link className={styles.link} to='/register'>Sign Up</Link></p>
                </FormCard>
            </div>
        </Layout>
    );
}

export default Login;
