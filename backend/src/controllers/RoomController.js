const connection= require('../database/connection')

module.exports={
    async index(req,res){

        const {id}= req.query;
        const response= await connection('rooms')//Pegar todos usuarios da room x 3 join
        .join('users_room', 'users_room.room_id', '=', 'rooms.id')//Entra na tabela users_room pois lá possui todos usuarios cadastro em x room
        .join('users', 'users.id', '=', 'users_room.user_id')//Entra na tabela usuario para pegar dados do user
        .where('rooms.id', id)
        .select([{
            room_id: 'rooms.id', 
            room_name:'rooms.name',
            user_id:'users.id', 
            user_name:'users.name',
            user_email:'users.email',
        }]);
        
        return res.json(response);
                //.join('comments', 'comments.user_id', '=', 'users.id')
 
        //.join('comments', 'comments.room_id', '=', 'rooms.id')
    },

    async create(req,res){
        const {name}= req.body;

        const [response]= await connection('rooms').insert({name});
        res.json({id: response});

    },

    async update(){

    },

    async delete(){
        
    }

}