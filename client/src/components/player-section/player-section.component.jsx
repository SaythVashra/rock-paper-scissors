import React from "react";
import './player-section.styles.css';

const PlayerSection = (props) => {

    const {playerName} = props;

    return (
        <div id={'player-section'}>
            <div className={'player-dividers'}>
                <h1 id={'player-name'}>{playerName}</h1>
            </div>
            <div id={'img-container'} className={'player-dividers'}>
                <img className={'rps-btn'} id={'rock-img'}
                     src={'https://images2.imgbox.com/fa/bc/nkKdzka4_o.png'}
                />
                <img className={'rps-btn'} id={'paper-img'}
                     src={'https://images2.imgbox.com/7f/4d/bOvEZuBY_o.png'}
                />
                <img className={'rps-btn'} id={'scissors-img'}
                     src={'https://images2.imgbox.com/6a/24/gFqk8mFE_o.png'}
                />
            </div>
        </div>
    )
};

export default PlayerSection;