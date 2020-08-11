import React, { useState } from 'react';
import Layout from '../../components/layout/';
import styles from './index.module.css';

const Register = () => {
    const [ username, setUsername ] = useState('');

    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    return (
        <Layout>
            <div className={styles.page}>
                <h1>Create an account</h1>
                
                <form>
                    <div>
                        <label>
                            Username
                            <input type='text' onChange={onUsernameChange} />
                        </label>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default Register;
