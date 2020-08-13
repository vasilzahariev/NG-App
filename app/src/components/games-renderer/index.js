import React, { useMemo } from 'react';
import GameCard from '../game-card';
import Grid from '@material-ui/core/Grid';

const GamesRenderer = (props) => {
    const renderer = useMemo(() => {
        return props.games.map((game, index) => {
            const status = props.statuses ? props.statuses.find(s => {
                if (s.gameId === game._id) {
                    return s;
                }
            }) : 0;

            return (
                <GameCard key={game._id} index={index} game_id={game._id} posterUrl={game.posterUrl} gameName={game.name} status={ status ? status.status : 0} />
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
