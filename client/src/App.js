import "./App.css";
import React, {useState, useEffect, Component} from 'react';
import io from 'socket.io-client';

import IntroScreen from "./components/intro-screen/intro-screen.component";
import GameScreen from "./components/game-screen/game-screen.component";

const socket = io.connect('http://localhost:3001');

const App = () => {

    const [playerName, setPlayerName] = useState('');
    const [roomId, setRoomId] = useState(0);
    const [isLogged, setIsLogged] = useState(false);
    const [playerSocketId, setPlayerSocketId] = useState('');

    const [players, setPlayers] = useState([]);

    const [secondPlayerName, setSecondPlayerName] = useState('');
    const [secondPlayerHasJoined, setSecondPlayerHasJoined] = useState(false);

    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState([]);

    let messagesArray = [];

    useEffect(() => {
    }, []);

    useEffect(() => {

        // socket.on('receive-message', (data) => {
        //     updateMessagesLog(data.message);
        // });

        socket.on('joined-room', (newPlayers) => {
            setPlayers(newPlayers);
        });

        socket.on('player-disconnected', (socketId) => {
                setPlayers(prev => prev.filter(player => player.socketId !== socketId ));
                console.log(`Player Deleted`);
        });

        socket.on('user-connected', (data) => {
            setPlayerSocketId(data);
        });

        socket.on('receive-message', (data) => {
                if (messages.length >= 4){
                    setMessages(messages => messages.slice(1,4))
                }

                setMessages(messages => [...messages, data.message]);
        });

        return () => {
            socket.off('joined-room');
            socket.off('user-connected');
            socket.off('player-disconnected');
            socket.off('receive-message');
        };
    }, []);

    useEffect(() => {
        if (isLogged) {
            socket.emit('join-room', playerName, roomId);
        }
        return () => {
            socket.off('join-room');
        }
    }, [isLogged]);

    useEffect(() => {
        if (players.length >= 2) {
            setSecondPlayerHasJoined(true);
            setSecondPlayerName(players[players.findIndex((player) => player.name !== playerName)].name);
        } else {
            setSecondPlayerHasJoined(false);
        }
    }, [players]);

    const updatePlayerName = (event) => {
        const newPlayerName = event.target.value;
        setPlayerName(newPlayerName);
    };

    const updateRoomId = (event) => {
        const newRoomId = parseInt(event.target.value);
        setRoomId(newRoomId);
    };

    const createNewRoom = () => {
        if (playerName !== '') {
            generateRandomRoomId();
            setIsLogged(true);
        }
    };

    const joinRoom = () => {
        if (playerName !== '') {
            setIsLogged(true);
        }
    };

    const generateRandomRoomId = () => {

        let randomRoomId = '';

        for (let i = 0; i < 6; i++) {
            const randomNum = (Math.round(Math.random() * 9)).toLocaleString();
            randomRoomId = randomRoomId + randomNum;
        }

        setRoomId(parseInt(randomRoomId));
    };

    const updateMessageText = (event) => {
        const inputText = event.target.value;
        setMessageText(inputText);
    };

    const sendMessage = (event) => {
        event.preventDefault();
        if (messageText.trim() !== ''){
            socket.emit('send-message', { message: `${playerName}: ${messageText}` });
            event.currentTarget.value = '';
        }
    };

    return (
        <div>
            {isLogged
                ? <GameScreen
                    playerName={playerName}
                    secondPlayerName={secondPlayerName}
                    secondPlayerHasJoined={secondPlayerHasJoined}
                    roomId={roomId}
                    updateMessageText={updateMessageText}
                    sendMessage={sendMessage}
                    messages={messages}
                />
                : <IntroScreen
                    isLogged={isLogged}
                    createNewRoom={createNewRoom}
                    joinRoom={joinRoom}
                    updatePlayerName={updatePlayerName}
                    updateRoomId={updateRoomId}
                />
            }
            {/*<GameScreen*/}
            {/*    playerName={'Sayth'}*/}
            {/*    secondPlayerName={'Luckyguess'}*/}
            {/*    secondPlayerHasJoined={secondPlayerHasJoined}*/}
            {/*/>*/}
        </div>
    );
};

export default App;