import React from 'react';
import Header from '../header/';
import Footer from '../footer/';
import styles from './index.module.css';

const Layout = (props) => {
    return (
        <div>
            <div className={styles.container}>
                <Header />
                <div>
                    {props.children}
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default Layout;
