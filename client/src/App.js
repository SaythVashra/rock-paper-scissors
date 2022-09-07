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

    const sendMessage = () => {
        socket.emit('send-message', { message: messageText });
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

// const App = () => {
//
//     const [isLogged, setIsLogged] = useState(false);
//     const [playerName, setPlayerName] = useState('');
//     const [roomId, setRoomId] = useState('');
//
//     const createNewRoom = () => {
//         if (playerName !== '') {
//             generateRandomRoomId();
//             setIsLogged(true);
//             socket.emit('join-room', playerName, roomId);
//         }
//     };
//
//     useEffect(() => {
//
//         // socket.on('receive-message', (data) => {
//         //     updateMessagesLog(data.message);
//         // });
//
//         socket.on('joinedRoom', (arg1, arg2) => {
//             console.log(`${arg1} has joined the room ${arg2}`);
//         });
//
//         return () => {
//             socket.off('joinedRoom');
//             // socket.off('pong');
//             // socket.off('receive-message');
//         };
//     }, []);
//
//     const generateRandomRoomId = () => {
//
//         let randomRoomId = '';
//
//         for (let i = 0; i < 6; i++) {
//             const randomNum = (Math.round(Math.random() * 9)).toLocaleString();
//             randomRoomId = randomRoomId + randomNum;
//         }
//
//         setRoomId(randomRoomId);
//     };
//
//     const updatePlayerName = (event) => {
//         const newPlayerName = event.target.value;
//         setPlayerName(newPlayerName);
//     };
//
//     const updateRoomId = (event) => {
//         const newRoomId = event.target.value;
//         setRoomId(newRoomId);
//     };
//
//     return (
//         <div>
//             {isLogged
//                 ? <h1>{playerName} is logged in room: {roomId}</h1>
//                 : <IntroScreen
//                     isLogged={isLogged}
//                     createNewRoom={createNewRoom}
//                     updatePlayerName={updatePlayerName}
//                     updateRoomId={updateRoomId}
//                 />
//             }
//         </div>
//     )


//
//   const [messageText, setMessageText] = useState('');
//   const [messages, setMessages] = useState([]);
//
//   useEffect(() => {
//
//       socket.on('receive-message', (data) => {
//           updateMessagesLog(data.message);
//       });
//
//       return () => {
//           socket.off('pong');
//           socket.off('receive-message');
//       };
//   }, []);
//
//   let messagesArray = [];
//
//   const updateMessagesLog = (message) => {
//       setMessages(messages => [...messages, message]);
//   };
//
//   const updateMessageText = (event) => {
//       const inputText = event.target.value;
//       setMessageText(inputText);
//   };
//
//   const sendMessage = () => {
//       socket.emit('send-message', { message: messageText });
//   };
//
// return(
//     <div className={'App'}>
//       <input onChange={updateMessageText} placeholder={"Message"} />
//
//       <button onClick={sendMessage}>Send Message</button>
//         {messages.map((message) => {
//             return <h1>{message}</h1>
//         })}
//     </div>
// )
// };

export default App;
