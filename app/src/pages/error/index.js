import React from 'react';
import Layout from '../../components/layout';
import Page from '../../components/page-div';
import Title from '../../components/title';
import styles from './index.module.css';

const Error = (props) => {
    return (
        <Layout>
            <Page>
                <Title><span className={props.type === 'warning' ? styles.warning : styles.err}>{props.children}</span></Title>
            </Page>
        </Layout>
    )
}

export default Error;
