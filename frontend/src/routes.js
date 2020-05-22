import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Register from './Pages/Register';
import Login from './Pages/Login';
import Chat from './Pages/Chat';

const Routes= ()=>{

    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Register}/>
                <Route path="/login" component={Login}/>
                <Route path="/chat" component={Chat}/>

            </Switch>
        </BrowserRouter>
    );
}

export default Routes;