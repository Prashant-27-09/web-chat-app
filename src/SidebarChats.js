import React,{useState,useEffect} from 'react'
import {Avatar} from "@material-ui/core"
import './SidebarChats.css'
import db from './firebase'
import {Link } from 'react-router-dom'


const SidebarChats = ({id,name,addNewChat}) => {
 
  

    
const createChat=()=>{
    const roomName = prompt("Please enter a name for the chat")
    if(roomName){
        //do some clever database stuff....
        db.collection('rooms').add({name:roomName})
    }
   
}
const [messages, setMessages] = useState([]);
  useEffect(() => {
    if(id){
      db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot=>(
        setMessages(snapshot.docs.map(doc=>doc.data()))
      ))
    }
  
    
   
  }, [id])
  

  return !addNewChat ? (
    <Link key={id} to={`/rooms/${id}`}>
      <div className='sidebarchat'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random()*5000)}.svg`}/>
        <div className='sidebarChat__info'>
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
        </div>
        
    </div>

    </Link>
  ) :( 
    <div onClick={createChat}
    className="sidebarchat">
        <h2>Add New Chat</h2>
    </div>

  );
}

export default SidebarChats