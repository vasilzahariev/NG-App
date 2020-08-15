import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.css';
import Layout from '../../components/layout';
import Page from '../../components/page-div';
import SearchGamesRenderer from '../../components/search-games-renderer';
import Grid from '@material-ui/core/Grid';
import SearchUsersRenderer from '../../components/search-users-renderer';

const SearchPage = () => {
    const [games, setGames] = useState(null);
    const [users, setUsers] = useState(null);
    const [ended, setEnded] = useState(false);
    const [ selected, setSelected ] = useState('g');

    const params = useParams();

    const getData = async () => {
        const search = params.serachVal;

        const gPromise = await fetch(`http://localhost:9999/getGames/${search}`);
        const uPromise = await fetch(`http://localhost:9999/getUsers/${search}`);

        const gResponse = await gPromise.json();
        const uResponse = await uPromise.json();

        setGames(gResponse.games);
        setUsers(uResponse.users);
        setEnded(true);
    }

    const onClickGames = () => {
        setSelected('g');
    }

    const onClickUsers = () => {
        setSelected('u');
    }

    useEffect(() => {
        getData();
    }, [params.serachVal])

    return (
        <Layout>
            <Page>
                <h1>Results for: <span className={styles.search}>{params.serachVal}</span></h1>

                <div className={styles.btns}>
                    <button className={`${styles.btn} ${selected === 'g' ? styles.btnSelected : ''}`} onClick={onClickGames}>Games</button>
                    <button className={`${styles.btn} ${selected === 'u' ? styles.btnSelected : ''}`} onClick={onClickUsers}>Users</button>
                </div>

                { ended && selected === 'g' && games.length !== 0 && <SearchGamesRenderer games={games} />}
                { ended && selected === 'g' && games.length === 0 && <p className={styles.p}>No games!</p>}

                { ended && selected === 'u' && users.length !== 0 && <SearchUsersRenderer users={users} />}
                { ended && selected === 'u' && users.length === 0 && <p className={styles.p}>No users!</p>}
            </Page>
        </Layout>
    )
}

export default SearchPage;
