import React, {useEffect} from "react";
import './chat.styles.css';

const Chat = (props) => {

    const {updateMessageText, sendMessage, messages} = props;
    const limitedMessages = [];

    const takeFourMessages = () => {
        for (let i = 0; i <= 3; i++) {
            limitedMessages.push(messages[i]);
        }
    };

    takeFourMessages();

    return (
        <div id={'chat'}>
            {limitedMessages.map((message) => {
                console.log(limitedMessages);
                return <h1 className={'chat-text'}>{message}</h1>
            })}

            <form id={'inputs-container'}>
                <input id={'chat-input'} onChange={updateMessageText} onSubmit={sendMessage} autoComplete={'off'} placeholder={"Message"}/>
                <button id={'chat-btn'} onClick={sendMessage}>Send Message</button>
            </form>
        </div>
    )
};

export default Chat;