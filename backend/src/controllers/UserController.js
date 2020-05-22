const connection= require('../database/connection')
const crypto= require('crypto');

module.exports={
    async index(req,res){
        
        const response= await connection('users').select('*');
        res.json(response);
    },

    async create(req,res){
        const id= crypto.randomBytes(4).toString('hex');
        const {name, email, password}= req.body;

        const verify= await connection('users').where('email', email).select('email').first();

        if(verify){//Ele nao reconhece id pois ja que ele nao acha na table ele nao retorna
            return res.status(400).json({error: 'User ja cadastrado'})
        }
       
       const [response]= await connection('users').insert({
           id,
           name,
           email,
           password
       });

       res.json({id});//Se colocar no array ali ele retorna o valor do array;
    },

    async update(req,res){

    },

    async delete(req,res){

    }

}