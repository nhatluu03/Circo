import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import './Messenger.scss'

export default function Messenger() {
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
          <div className='wrapper'>
            Online
          </div>
        </div>
    </div>
  )
}
