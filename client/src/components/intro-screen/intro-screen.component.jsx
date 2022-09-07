import React, {Component} from "react";
import './intro-screen.styles.css';

class IntroScreen extends Component {
    render() {

        const {joinRoom, createNewRoom, isLogged, updatePlayerName, updateRoomId} = this.props;

        return (
            <div>
                <h1 id={'game-title'}>Rock, Paper, Scissors</h1>

                <div id={'intro-form'}>
                    {/*Player name text input*/}
                    <div className={'input-container'}>
                        <input className={'text-input'} placeholder={'Player Name'} maxLength={16}
                               onChange={updatePlayerName}/>
                    </div>

                    {/*Join room text input*/}
                    <div className={'input-container'}>
                        <input className={'text-input'} placeholder={'Room ID'} maxLength={6} type={'number'}
                               onChange={updateRoomId}/>
                        <button className={'intro-btn'} onClick={joinRoom}>Join</button>
                    </div>

                    <div id={'intro-create-btn'}>
                        <button className={'intro-btn'} onClick={createNewRoom}>Create New Room</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default IntroScreen;