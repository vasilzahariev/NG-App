import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Poster from '../poster';

const GstatusGamesRenderer = (props) => {
    const renderer = useMemo(() => {
        return props.games.map((game, index) => {
            return (
                <Grid key={game._id} index={index} item xs={2}>
                    <Link to={`/g/${game._id}`}>
                        <Poster posterUrl={game.posterUrl} height={350} status={-1} />
                    </Link>
                </Grid>
            )
        })
    })

    return (
        <div>
            <Grid container direction='row' justify="flex-start" alignItems="baseline" spacing={5}>
                {renderer}
            </Grid>
        </div>
    )
}

export default GstatusGamesRenderer;
