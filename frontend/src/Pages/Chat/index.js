import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';
import { useParams, useLocation } from 'react-router-dom';

const Chat= ()=>{

    const user_id= localStorage.getItem('user_id');


    const [comments, setComments]= useState([]);
    const [comment, setComment]= useState('');


    const [rooms, setRooms]= useState([]);
    const [room_name, setRoom_name]= useState('');

    const [users, setUsers]= useState([]);
    const [id_room, setId_room]= useState('');

     useEffect(()=>{
       const response= api.get('room/add', {headers:{
         authorization: user_id
       }}).then(dados=>{
        setRooms(dados.data);
       })
       
     },[rooms]);//mudar dependencia

    //Passar na query o id da sala
    //Exibir apenas sala de user x
    //Use effect so vai chamar todas as salas
    //Ai na funcao room pega dados da sala x
    //Toda vez que a room muda executa o use effect de novo

    const create_room= async (e)=>{
      e.preventDefault();
      const resposta= await api.post('room', {name: room_name})

      await api.post(`room/add/${resposta.data.id}`,'' ,{headers:{
        authorization: user_id

      }});

      setRoom_name('');
    }

    const load_room= async(id)=>{
      const response= await api.get(`comment?id=${id}`);
      setComments(response.data);
   
    }

    const comentar= async(d)=>{
      const response= await api.post(`comment?room_id=${id_room}`, {comment}, {
        headers:{
          authorization: user_id
        }
      })
    }

    return(
        <div className="chat-container">

        <header className="chat-header">
          <h1><i className="fas fa-smile"></i> ChatCord</h1>
          <a href="index.html" className="btn">Leave Room</a>
        </header>
        <main className="chat-main">
          <div className="chat-sidebar">
            <h3><i className="fas fa-comments"></i> Room Name:</h3>
            {rooms.map(salas=>(
              <div key={salas.id}>
              <h2 id="room-name" onClick={e=> {e.preventDefault(); load_room(salas.id); setId_room(salas.id)}}>{salas.name}</h2>
              </div>
            ))}
            
            <input type="number" placeholder="ID de uma room" />
            <button>Entrar nessa room</button>
            <input type="text" placeholder="Criar room" 
            value={room_name} onChange={e=> setRoom_name(e.target.value)}/>
            <button onClick={create_room}>Criar room</button>
            <h3><i className="fas fa-users"></i> Users</h3>
            <ul id="users">
              <li>Brad</li>
              <li>John</li>
              <li>Mary</li>
              <li>Paul</li>
              <li>Mike</li>
            </ul>
          </div>
          <div className="chat-messages">
              {comments.map(comentarios=>(
                <div key={comentarios.id}>
                  <h4>{comentarios.comment}</h4>
                </div>
              ))}
              
          </div>
        </main>
        <div className="chat-form-container" >
          <form id="chat-form" >
            <input
              id="msg"
              type="text"
            
              placeholder="Enter Message"
              onChange={e=> setComment(e.target.value)}
              required
            
            />
            <button className="btn" onClick={comentar}><i className="fas fa-paper-plane"></i> Send</button>
          </form>
        </div>
      </div>
    );
}

export default Chat;