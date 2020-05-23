import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';
import io from 'socket.io-client'
const socket = io('http://localhost:3030');
const Chat= ()=>{
    
    const user_id= localStorage.getItem('user_id');
    
    const [rooms, setRooms]= useState([]);
    const [room_name, setRoom_name]= useState('');
    const [room_id, setRoom_id]= useState('');
    const [room_add, setRoom_add]= useState(false);

    const [comments,setComments]= useState([]);
    const [comment, setComment]= useState('');

    const [users, setUsers]= useState([]);

//---------------------------------------CREATE ROOM---------------------------------------------------------------
    const create_room= async ()=>{
      try{
        const response= await api.post('room', {name: room_name} );
        api.post(`room/add/${response.data.id}`, '', {
          headers:{
            authorization: user_id
          }
        });
        setRooms([...rooms, {room_name: room_name, room_id: response.data.id}]);
        setRoom_name('');
      }
      catch{
        alert('erro');
      }

    }
//--------------------------------------LOAD_COMMENTS----------------------------------------------------------------
const load_comments= async(e, id)=>{
  e.preventDefault();
  const rescom= await api.get(`comment?id=${id}`);
  setComments(rescom.data);
  
}

//--------------------------------------LOAD_ROOM----------------------------------------------------------------

const load_room= async(e,id)=>{
 // event.preventDefault();
  //Carregar users e comentarios
  const response= await api.get(`room?id=${id}`);

  setUsers(response.data);
  load_comments(e,id);

}

//---------------------------------------ENTER_ROOM---------------------------------------------------------------

const enter_room= async (e)=>{
  e.preventDefault(); 
  const response= await api.post(`room/add/${room_id}`,'', {
    headers:{
      authorization: user_id
    }
  });
  //setRooms([...rooms, {room_id: response.data.id}]);
  setRoom_add(true);
  setRoom_add(false);
  //Usar socket
  //Ou chamar novamente outra funcao
  //Ou fazer select no backend 
}
//---------------------------------------COMENTAR---------------------------------------------------------------

const comentar= async(e)=>{
  e.preventDefault();
  const response= await api.post(`comment?room_id=${room_id}`, {comment}, {
    headers:{
      authorization: user_id
    }
  });
  socket.emit('chat.message', {
    comment
})
load_comments(e, room_id);
  //setComments([...comments, {comment: comment, user_name: response.data.user_name}]);
}
//-----------------------------------------USE_EFFECT--------------------------------------------------------------

    useEffect(()=>{

      const response= api.get(`room/add`, {
        headers:{
          authorization: user_id
        }
      }).then(dados=>{
        setRooms(dados.data);
      })

      const handleNewMessage= newMessage =>{
        setComments([...comments, newMessage]);
    }
    socket.on('chat.message', handleNewMessage)
    return ()=> socket.off('chat.message', handleNewMessage);
    
      
    },[room_add, comments]);
//--------------------------------------------------------------------------------------------------------

    return(
        <div className="chat-container">

        <header className="chat-header">
          <h1><i className="fas fa-smile"></i> ChatCord</h1>
            <input type="number" onChange={e=> setRoom_id(e.target.value)} placeholder="ID de uma room" />
            <button onClick={enter_room}>Entrar nessa room</button>
            <input type="text" placeholder="Criar room" 
            value={room_name}
            onChange={e=> setRoom_name(e.target.value)}
            />
            <button onClick={create_room}>Criar room</button>
        </header>
        <main className="chat-main">
          <div className="chat-sidebar">
            <h3><i className="fas fa-comments"></i> Room Name:</h3>
              {rooms.map(salas=>(
                <div key={salas.room_id}>
                 <h2 id="room-name" onClick={e=> {load_room(e,salas.room_id); setRoom_id(salas.room_id)}}>{salas.room_name}</h2>

                </div>
              ))}

            <h3><i className="fas fa-users"></i> Users</h3>
            <ul id="users">
              {users.map(usuarios=>(
                <li>{usuarios.user_name}</li>
              ))}
                
            </ul>
          </div>
          <div className="chat-messages">
          {comments.map(comentarios=>(
          // <div className={`message--${mensagem.id===myId ? 'mine' : 'other'}`} key={mensagem.id}>
          <div className="message--mine">
          <p className="meta">{comentarios.user_name} <span>9:12pm</span></p>
          <p className="text">
            {comentarios.comment}
          </p>

        </div>
        ))}
          </div>
        </main>
        <div className="chat-form-container" >
          <form id="chat-form" onSubmit={comentar} >
            <input
            id="msg"
            type="text"
            value={comment}
            placeholder="Enter Message"
            onChange={e=> setComment(e.target.value)}
            required
          />
            <button className="btn"><i className="fas fa-paper-plane"></i> Send</button>
          </form>
        </div>
      </div>
    );
}

export default Chat;