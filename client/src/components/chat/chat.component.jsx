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

            <div id={'inputs-container'}>
                <input onChange={updateMessageText} placeholder={"Message"}/>
                <button onClick={sendMessage}>Send Message</button>
            </div>
        </div>
    )
};

export default Chat;