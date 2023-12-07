import { useEffect, useState } from 'react';
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import './Messenger.scss'
import { io } from "socket.io-client";

export default function Messenger() {
  const [socket, setSocket] = useState(null)

  useEffect(()=>{
    setSocket(io("ws://localhost:8900"))
  },[])
  return (
    <div className='messenger'>
        <div className='chatMenu'>
          <input placeholder='Search for artists'/>
          <Conversation/>
          <Conversation/>
          <Conversation/>
          <Conversation/>
          <Conversation/>
          <Conversation/>
        </div>
        <div className='chatBox'>
          <div className='chatBoxWrapper'>
            <div className='chatBoxTop'>
              <Message/>
              <Message own = {true} />
              <Message/>
              <Message own = {true}/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
            </div>
            <div className='chatBoxBottom'>
              <textarea placeholder='Write something...'></textarea>
              <button>Send</button>
            </div>
          </div>
        </div>
        <div className='chatOnline'>
          <div className='chatOnlineWrapper'>
            <ChatOnline/>
          </div>
        </div>
    </div>
  )
}
