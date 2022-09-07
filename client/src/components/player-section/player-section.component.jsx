import React from "react";
import './player-section.styles.css';

const PlayerSection = (props) => {

    const {playerName} = props;

    const addSelectedClass = (event) => {

        const clickedBtn = event.currentTarget;
        const allBtns = event.currentTarget.parentElement.childNodes;



        allBtns.forEach((btn) => {
            if (btn === clickedBtn) {
                btn.classList.toggle('rps-btn');
                btn.classList.toggle('rps-btn-selected');
            } else {
                btn.classList.remove('rps-btn-selected');
                btn.classList.add('rps-btn');
            }
        });
    };

    return (
        <div id={'player-section'}>
            <div className={'player-dividers'}>
                <h1 id={'player-name'}>{playerName}</h1>
            </div>
            <div id={'img-container'} className={'player-dividers'}>
                <img className={'rps-btn'} id={'rock-img'}
                     src={'https://images2.imgbox.com/fa/bc/nkKdzka4_o.png'}
                     onClick={addSelectedClass}
                />
                <img className={'rps-btn'} id={'paper-img'}
                     src={'https://images2.imgbox.com/7f/4d/bOvEZuBY_o.png'}
                     onClick={addSelectedClass}
                />
                <img className={'rps-btn'} id={'scissors-img'}
                     src={'https://images2.imgbox.com/6a/24/gFqk8mFE_o.png'}
                     onClick={addSelectedClass}
                />
            </div>
        </div>
    )
};

export default PlayerSection;