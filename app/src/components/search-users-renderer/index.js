import React, { useMemo } from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

const SearchUsersRenderer = (props) => {
    const renderer = useMemo(() => {
        return props.users.map((user, index) => {
            return (
                <li className={styles.item} key={user._id} index={index}><Link className={styles.link} to={`/u/${user._id}`}>{user.username}</Link></li>
            );
        })
    }, [props.users])

    return (
        <ul className={styles.list}>
            {renderer}
        </ul>
    )
}

export default SearchUsersRenderer;
