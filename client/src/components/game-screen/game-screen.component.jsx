import PlayerSection from "../player-section/player-section.component";
import SecondPlayerSection from "../second-player-section/second-player-section.component";
import './game-screen.styles.css';
import React from "react";
import Chat from "../chat/chat.component";

const GameScreen = (props) => {

    const {playerName, secondPlayerName, secondPlayerHasJoined, roomId, updateMessageText, sendMessage, messages} = props;

    return (
        <div id={'game-screen'}>
            <PlayerSection playerName={playerName} />
            <div id={'center-section'}>
                <h1 id={'room-id-text'}>Room ID: {roomId}</h1>
                <h1 id={'vs-text'}>Vs</h1>
                <Chat
                    updateMessageText={updateMessageText}
                    sendMessage={sendMessage}
                    messages={messages}
                />
            </div>
            <SecondPlayerSection secondPlayerName={secondPlayerName} secondPlayerHasJoined={secondPlayerHasJoined}/>
        </div>
    );
};

export default GameScreen;