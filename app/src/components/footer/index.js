import React from 'react';
import styles from './index.module.css';
import FooterLink from '../footer-link/';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.copyright}>
                &copy;2020 Vasil Zahariev
            </div>
            <div className={styles.footerMenu}>
                <FooterLink to='/games'>Games</FooterLink>
                <FooterLink to='/reviews'>Reviews</FooterLink>
                <FooterLink to='/lists'>Lists</FooterLink>
            </div>
        </footer>
    );
}

export default Footer;
