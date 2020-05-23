const connection= require('../database/connection')

module.exports={

    async index(req,res){
        const user_id= req.headers.authorization;//Pegar todos as salas desse usuario

        const response= await connection('rooms')//Pegar dados da room
        .join('users_room', 'users_room.room_id', '=', 'rooms.id')
        .where('users_room.user_id', user_id)
        .select([{
            room_id: 'rooms.id',
            room_name: 'rooms.name'
        }]);
        
        return res.json(response);
    },

    async create(req,res){
        const user_id= req.headers.authorization;
        const room_id= req.params.id;

        const response= await connection('users_room')
        .insert({
            user_id,
            room_id
        })   

        return res.json({user_id, room_id});
    }
}