import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';

//import {Button, Container, Card} from 'react-bootstrap'
const Register =()=>{
    const history= useHistory();
    
    const[name,setName]= useState('');
    const[email,setEmail]= useState('');
    const [password, setPassword]= useState('');

    const register= async (e)=>{
        e.preventDefault();
        const data= {name,email,password}
        try{
            const response= await api.post('user', data);
            alert(`Seu id é: ${response.data.id}`);
            history.push('/login');    
        }
        catch{
            alert('Erro');
        }
        

    }

    return(

        <div className="container mt-4">
            <div className="card mt-4">
                <div className="card-body">
                    <form onSubmit={register}>

                        <div className="form-group">
                            <label for="name">Nome: </label>
                            <input type="text" className="form-control" placeholder="Nome"
                            value={name}
                            onChange={e=> setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label for="email">Email: </label>
                            <input type="email" className="form-control" placeholder="Email"
                            value={email}
                            onChange={e=> setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label for="password">Senha: </label>
                            <input type="password" className="form-control" placeholder="Senha"
                            value={password}
                            onChange={e=> setPassword(e.target.value)}
                            />
                        </div>

                        <button type="button" className="btn btn-primary" onClick={register}>Registrar</button>
                    </form>
                </div>
            </div>
        </div>
            
    )
}

export default Register;