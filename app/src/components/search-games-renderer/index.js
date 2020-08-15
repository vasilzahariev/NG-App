import React, { useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import GameCard from '../game-card';

const SearchGamesRenderer = (props) => {
    const renderer = useMemo(() => {
        return props.games.map((game, index) => {
            return (
                <GameCard key={game._id} index={index} game_id={game._id} posterUrl={game.posterUrl} status={-1} gameName={game.name} height={250} />
            );
        })
    }, [props.games])

    return (
        <Grid container direction='row' justify="flex-start" alignItems="baseline" spacing={5}>
            {renderer}
        </Grid>
    )
}

export default SearchGamesRenderer;
