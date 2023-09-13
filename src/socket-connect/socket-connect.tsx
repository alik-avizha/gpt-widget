import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './socket.css';

interface ChatMessage {
    role: 'server' | 'client';
    message: string;
}

const socket = io('http://localhost:5000', {
    path: '/api/socket.io',
});

const SocketConnect: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [chatList, setChatList] = useState<ChatMessage[]>([]);
    const [loader, setLoader] = useState<boolean>(false);

    socket.on('receiveMessage', (data) => {
        const newList: ChatMessage[] = [...chatList, { role: 'server', message: data.message }];
        setChatList(newList);
        setLoader(false);
    });

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected');
        });
    }, []);

    function handleSubmit() {
        socket.emit('sendMessage', { message });
        const newList: ChatMessage[] = [...chatList, { role: 'client', message }];
        setChatList(newList);
        setMessage('');
        setLoader(true);
    }

    function handleInputText(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setMessage(value);
    }

    return (
        <div>
            <div className="chat-container">
                {chatList.map((chat, index) => (
                    <div
                        key={index}
                        className={
                            chat.role === 'client' ? 'message sender-message' : 'message receiver-message'
                        }
                    >
                        <p>{chat.message}</p>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={message}
                    placeholder="Type your message"
                    onChange={handleInputText}
                />
                <div>
                    <button onClick={handleSubmit}>
                        {!loader ? 'Send' : <div id="loader" className="loader"></div>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SocketConnect;
