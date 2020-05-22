const connection= require('../database/connection');

module.exports={

    async create(req,res){
        const {email,password}=req.body;

        const response= await connection('users')
        .where('email', email)
        .andWhere('password', password)
        .select('*').first();

        if(!response){
            return res.status(400).json({error: 'No user found '});//Caso ele nao retorne dados esperado na data ele retorna user not found

        }

        return res.json(response);


        
    }
}