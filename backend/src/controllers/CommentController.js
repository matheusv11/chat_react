const connection= require('../database/connection')

module.exports={
    async index(req,res){

        const {id}= req.query;
        
        const response= await connection('comments')
     //   .join('users', 'users.id', '=', 'comments.user_id') pegar users
        .join('users', 'users.id', '=', 'comments.user_id')
        .where('room_id', id)
        .select([{
            comment_id: 'comments.id',
            comment: 'comments.comment',
            user_id: 'comments.user_id',
            user_name: 'users.name',
            room_id: 'comments.room_id',


        }]);
        return res.json(response);
    },

    async create(req,res){
        const user_id= req.headers.authorization;
        const {room_id}= req.query;
        const {comment}= req.body;

        const response= await connection('comments').insert({
            comment,
            user_id,
            room_id
        });

        return res.json(response);
    },

    async update(){

    },

    async delete(){
        
    }

}