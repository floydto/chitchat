import Knex from "knex";


class RegisterService {
    constructor(public knex: Knex){}
    toRegister = async (username:string,password:string, profile_picture:string, email:string) =>{
        let ids = await this.knex.insert({
            username,
            password,
            profile_picture,
            email
        }).into("users")
        .returning('id');
        return ids
    }

    toCheckEmailAndUsername = async (email:string, username:string) =>{
        const users = await this.knex.select('username')
                    .from('users')
                    .where('email',email)

        return users
    }
}

export default RegisterService