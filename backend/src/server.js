    const express= require('express');
    const app= express();
    const routes= require('./routes');
    const cors= require('cors');

    app.use(cors());
    app.use(express.json());
    app.use(routes);
    
    const server= require('http').createServer(app);
    const io= require('socket.io')(server);

io.on('connection', socket => {

    console.log(`socket conectado: ${socket.id}`);
    
    socket.on('chat.message', data => {
        console.log('mensagem do chat => ', data)
        io.emit('chat.message', data);
    });

    socket.on('disconnect', () => {
        console.log('Um user se desconectou');
    });

})

server.listen(3030);



//commit
    // //Run quando client se conecta
    // io.on('connection', (socket)=> {
    //     console.log(`Socket conectado: ${socket.id}`);
        
    //     //Welcome do atual user
    //     //socket.emit('message', 'Welcome');//Cliente especifico

    //     //Quando um user menos voce se conectar
    //     socket.broadcast.emit('message', 'Um user se conectou');//Todos clientes menos o conectado
        
    //     //Quando um user desconectar
    //     socket.on('disconnect', ()=>{
    //         io.emit('message', 'Um user saiu');
    //     });
        
    //     //Mensagem do chat
    //     socket.on('chatMessage', msg=>{
    //         io.emit('message', msg);
    //     });

    //     //Mensagens passadas
    //     // socket.on('previousMessage', msg=>{
    //     //     io.emit('message', msg);
    //     // })

    //     //io.emit();//Todos clientes
    // });


