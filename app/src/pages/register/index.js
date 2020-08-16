import React, { useState, useContext } from 'react';
import {
    Link,
    useHistory
} from 'react-router-dom';
import Layout from '../../components/layout/';
import styles from './index.module.css';
import Input from '../../components/input/';
import Title from '../../components/title/';
import FormCard from '../../components/form-card/';
import SubmitButton from '../../components/submit-button';
import UserContext from '../../UserContext';

const Register = () => {
    const history = useHistory();
    const context = useContext(UserContext);

    const [ username, setUsername ] = useState('');
    const [ usernameErr, setUsernameErr ] = useState('');

    const [ email, setEmail ] = useState('');
    const [ emailErr, setEmailErr ] = useState('');

    const [ password, setPassword ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');
    
    const [ rePassword, setRePassword ] = useState('');
    const [ rePasswordErr, setRePasswordErr ] = useState('');

    const checkIfCanSubmit = () => {
        if (usernameErr || emailErr || passwordErr || rePasswordErr ||
            !username || !email || !password || !rePassword) {
            return false;
        } else {
            return true;
        }
    }

    const onUsernameChange = (e) => {
        const val = e.target.value;

        setUsername(val);

        if (val.length < 3) {
            setUsernameErr('The username must be at least 3 characters long');
        } else {
            setUsernameErr('');
        }

        checkIfCanSubmit();
    }

    const onEmailChange = (e) => {
        const val = e.target.value;
        setEmail(val);

        if (!val.match(/^(([^<>()\[\]\\\\.,;:\s@"]+(\.[^<>()\[\]\\\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setEmailErr('Email should have this structure: name@domain.extention');
        } else {
            setEmailErr('');
        }

        checkIfCanSubmit();
    }

    const onPasswordChange = (e) => {
        const val = e.target.value;
        setPassword(val);

        if (val.length < 6) {
            setPasswordErr('Password should be at least 6 characters long');
        } else if (!val.match(/^[A-Za-z0-9]+$/)) {
            setPasswordErr('Password should consist only english letters and digits');
        } else {
            setPasswordErr('');
        }

        checkIfCanSubmit();
    }

    const onRePasswordChange = (e) => {
        const val = e.target.value;
        setRePassword(val);

        if (val.length < 6) {
            setRePasswordErr('Repeat password should be at least 6 characters long');
        } else if (password !== val) {
            setRePasswordErr('Password and repeat password should match');
        } else {
            setRePasswordErr('');
        }

        checkIfCanSubmit();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!checkIfCanSubmit()) return;

        const promise = await fetch('http://localhost:9999/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });

        const response = await promise.json();

        if (response.error) {
            if (response.error.includes('Username')) {
                setUsernameErr(response.error);
            } else if (response.error.includes('Email')) {
                setEmailErr(response.error);
            } else {
                console.log(response.error);
            }
        } else {
            const cookie = response.cookie;

            context.login(response.user);

            document.cookie = `aid=${cookie}`;

            history.push('/');
        }
    }

    return (
        <Layout>
            <div className={styles.page}>
                <Title>
                    Join the fun and become an <span className={styles.epicGamer}>epic gamer</span>!
                </Title>

                <FormCard onSubmit={handleSubmit}>
                    <Input label='Username' error={usernameErr} onChange={onUsernameChange} />
                    <Input label='Email' type='email' error={emailErr} onChange={onEmailChange} />
                    <Input label='Password' type='password' error={passwordErr} onChange={onPasswordChange} />
                    <Input label='Repeat Password' type='password' name='rePassword' error={rePasswordErr} onChange={onRePasswordChange} />
                    <SubmitButton value='Register' />
                    <p>Already have an account? <Link className={styles.link} to='/login'>Login</Link></p>
                </FormCard>
            </div>
        </Layout>
    );
}

export default Register;
