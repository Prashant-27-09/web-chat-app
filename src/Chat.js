import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, MicOutlined, MoreVert, SearchOutlined } from '@material-ui/icons';
import userEvent from '@testing-library/user-event';
import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import './Chat.css'
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase/compat/app';

const Chat = () => {


  const [{user},dispatch]= useStateValue();
const [input, setInput] = useState('');
const [messages, setMessages] = useState([]);


const {roomId}=useParams();
const[roomName,setRoomName] = useState('');

useEffect(()=>{
  if(roomId){
    db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(setRoomName(snapshot.data().name)));

    db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot=>(
      setMessages(snapshot.docs.map(doc=>doc.data()))
    ))
  }

},[roomId]);

  const sendMessage=(e)=>{
    e.preventDefault();
    console.log('input >>> ',input)
    db.collection('rooms').doc(roomId).collection('messages').add({
        message:input,
        name:user.displayName,
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput('');

  }
 


  return (
    <div key={roomId}  className='chat'>
      <div className='chat__header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random()*5000)}.svg`}/>
        <div className='chat__headerInfo'>
          <h3>{roomName}</h3>
          <p>last seen{" "}
          {new Date(messages[messages.length-1]
            ?.timestamp?.toDate()).toUTCString()}</p>
        </div>
        <div className='chat__headerInfoRight'>
          <IconButton>
            <SearchOutlined/>
          </IconButton>
          <IconButton>
            <AttachFile/>
          </IconButton>
          <IconButton>
            <MoreVert/>
          </IconButton>

        </div>

      </div>
      <div className='chat__body'>
        {messages.map((message)=>(
          <p   className={`chat__message ${message.name===user.displayName && 'chat__receiver'}`}>
          <span className='chat__name'>
            {message.name}
          </span>
            {message.message}
            <span className='chat__timestamp'>
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
        
      

      </div>
      <div className='chat__footer'>
        <InsertEmoticon/>
        <form>
          <input value={input} type="text" 
          onChange={e=>setInput(e.target.value)}
          placeholder='type a message'/>
            <button onClick={sendMessage} type='submit'>Send a message</button>
        </form>
        <MicOutlined />

        </div>      
        

    </div>
  )
}

export default Chat