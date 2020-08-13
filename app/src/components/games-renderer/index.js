import React, { useMemo } from 'react';
import GameCard from '../game-card';

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
            {renderer}
        </div>
    )
}

export default GamesRenderer;
