import { UseAppStore } from '@/store';
import { HOST } from '@/utils/constants';
import React, { createContext, useContext, useEffect, useRef, } from 'react'
import { io } from 'socket.io-client';

const socketContext = createContext(null);



export const useSocket = () => {
    return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
    const socket = useRef();
    const { userInfo } = UseAppStore();

    useEffect(() => {
        if (userInfo) {
            socket.current = io(HOST, {
                withCredentials: true,
                query: { userId: userInfo.id }
            });


            socket.current.on("connect", () => {
                console.log("connected to  socket server")
            })


            const handleRecieveMessage = (message) => {
                const { selectedChatData, selectedChatType, addMessage } = UseAppStore.getState();
                
            if (
                    selectedChatType !== undefined && (selectedChatData._id === message.sender._id || selectedChatData._id === message.recipient._id)
                ) {
                    
                    console.log("message received")
                    addMessage(message);
                }
            }

            socket.current.on("recieveMessage",handleRecieveMessage);

            return () => {
                socket.current.disconnect();
            };
        }
    }, [userInfo])


    return <socketContext.Provider
        value={socket.current}>
        {children}
    </socketContext.Provider>

}



