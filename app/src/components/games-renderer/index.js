import React, { useMemo } from 'react';
import GameCard from '../game-card';
import Grid from '@material-ui/core/Grid';

const GamesRenderer = (props) => {
    const renderer = useMemo(() => {
        return props.games.map((game, index) => {
            return (
                <GameCard key={game._id} index={index} game_id={game._id} posterUrl={game.posterUrl} gameName={game.name} />
            )
        })
    }, [props.games]);

    return (
        <div>
            <Grid container direction='row' justify="space-around" alignItems="center" spacing={5}>
                {renderer}
            </Grid>
        </div>
    )
}

export default GamesRenderer;
