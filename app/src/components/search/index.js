import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
    const [searchVal, setSearchVal] = useState('');
    const history = useHistory();

    const onSearchValueChange = (event) => {
        setSearchVal(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (!searchVal) return;

        history.push(`/search/${searchVal}`);
    }


    return (
        <div className={styles.searchDiv} >
            <form onSubmit={submitHandler}>
                <input className={styles.searchField} type='text' onChange={onSearchValueChange} placeholder='Search' />
                <button className={styles.searchSubmit} type='submit'>{<FontAwesomeIcon icon={faSearch} />}</button>
            </form>
        </div>
    );
}

export default Search;
