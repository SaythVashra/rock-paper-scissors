import React from "react";
import './second-player-section.styles.css';

const SecondPlayerSection = (props) => {

    const {secondPlayerName, secondPlayerHasJoined} = props;

    return (
        <div>
            {secondPlayerHasJoined
                ? <div id={'second-player-section'}>
                    <div id={'second-img-container'} className={'second-player-dividers'}>
                        <img className={'second-rps-btn'} id={'second-rock-img'}
                             src={'https://images2.imgbox.com/63/2a/zxCrAJZy_o.png'}
                        />
                        <img className={'second-rps-btn'} id={'second-paper-img'}
                             src={'https://images2.imgbox.com/a3/ae/YMOLGooo_o.png'}
                        />
                        <img className={'second-rps-btn'} id={'second-scissors-img'}
                             src={'https://images2.imgbox.com/99/33/TumDNQ9R_o.png'}
                        />
                    </div>
                    <div className={'second-player-dividers'}>
                        <h1 id={'second-player-name'}>{secondPlayerName}</h1>
                    </div>
                </div>
                : <h1 id={'waiting-for-player'}>Waiting for another player...</h1>
            }

        </div>
    )
};

export default SecondPlayerSection;