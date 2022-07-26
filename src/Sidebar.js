import { Avatar,IconButton } from '@material-ui/core'
import  DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { SearchOutlined } from '@material-ui/icons'
import SidebarChats from './SidebarChats'
import { useStateValue } from './StateProvider'
import db from './firebase'

const Sidebar = () => {
  const [{user},dispatch]= useStateValue();

  const [rooms,setRooms] = useState([]);
  useEffect(()=>{
    const unsubscribe = db.collection('rooms').onSnapshot(snapshot=>{
      setRooms(snapshot.docs.map(doc=>({
        id:doc.id,
        data:doc.data(),

      })))
    })
    return()=>{
      unsubscribe();
    }
  },[]);
  return (
    <div className='sidebar'>
        <div className='sidebar__header'>
         <Avatar src={user.photoURL}/>
            <div className='sidebar__headerRight'>
                <IconButton><DonutLargeIcon/></IconButton>
                <IconButton><ChatIcon /></IconButton>
                <IconButton><MoreVertIcon/></IconButton>
            </div>
        </div>
        <div className='sidebar__search'>
           <div className='sidebar__searchContainer'>
            <SearchOutlined/>
            <input type='text' placeholder='search or start a new chat'/>
           </div>
        </div>
        <div className='sidebar__chats'>
            <SidebarChats addNewChat/>
            {rooms.map(room=>(<SidebarChats key={room.id} id={room.id}  name={room.data.name}/>))}
        </div>

    </div>
  )
}

export default Sidebar