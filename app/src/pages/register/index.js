import React, { useState } from 'react';
import Layout from '../../components/layout/';
import styles from './index.module.css';
import Input from '../../components/input/';
import Title from '../../components/title/';
import FormCard from '../../components/form-card/';

const Register = () => {
    const [ username, setUsername ] = useState('');
    const [ usernameErr, setUsernameErr ] = useState('');

    const [ email, setEmail ] = useState('');
    const [ emailErr, setEmailErr ] = useState('');

    const [ password, setPassword ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');
    
    const [ rePassword, setRePassword ] = useState('');
    const [ rePasswordErr, setRePasswordErr ] = useState('');

    // Make validations

    const onUsernameChange = (e) => {
        setUsername(e.target.value);

        if (username.length < 3 || username.length > 25) {
            setUsernameErr('The usename must be between 3 and 25 characters');
        } else {
            setUsernameErr('');
        }
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);

        if ()
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onRePasswordChange = (e) => {
        setRePassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const promise = await fetch('http://localhost:9999/test', {
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

        console.log(response);
    }

    return (
        <Layout>
            <div className={styles.page}>
                <Title>
                    Join the fun and become an <span className={styles.epicGamer}>epic gamer</span>!
                </Title>

                <FormCard onSubmit={handleSubmit}>
                    <Input label='Username' onChange={onUsernameChange} />
                    <Input label='Email' type='email' onChange={onEmailChange} />
                    <Input label='Password' type='password' onChange={onPasswordChange} />
                    <Input label='Repeat Password' type='password' name='rePassword' onChange={onRePasswordChange} />
                    <div className={styles.submitDiv}>
                        <input className={styles.submitBtn} type='submit' />
                    </div>
                </FormCard>
            </div>
        </Layout>
    );
}

export default Register;
