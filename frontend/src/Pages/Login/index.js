import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';

const Login= ()=>{
    
    const history= useHistory(); 
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');

    const Login= async ()=>{
        const data= {email,password}

        try{
            const response= await api.post('auth', data);
            // localStorage.setItem('user_data', {
            //     user_id: response.data.id,
            //     user_name: response.data.name
            // } );
            localStorage.setItem('user_id', response.data.id);
            localStorage.setItem('user_name', response.data.name);
            history.push('/chat');
        }
        catch{
            alert('erro');
        }
    }

    return(
       
        <div className="container mt-4">
            <div className="card mt-4">
                <div className="card-body">
                    <form onSubmit={Login}>


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

                        <button type="button" className="btn btn-primary" onClick={Login}>Logar</button>
                    </form>
                </div>
            </div>
        </div>
            
    )

}

export default Login;