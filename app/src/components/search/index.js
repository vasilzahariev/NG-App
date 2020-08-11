import React, { Component } from 'react';
import styles from './index.module.css';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchVal: ''
        }
    }

    onSearchValueChange = (event) => {
        this.setState({
            searchVal: event.target.value
        });
    }

    submitHandler = (event) => {
        event.preventDefault();

        console.log(this.state.searchVal);
    }

    render() {
        return (
            <div className={styles.searchDiv} >
                <form onSubmit={this.submitHandler}>
                    <input className={styles.searchField} type='text' onChange={this.onSearchValueChange} placeholder='Search' />
                    <input className={styles.searchSubmit} type='submit' value='?' />
                </form>
            </div>
        );
    }
}

export default Search;
