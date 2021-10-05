import Knex from 'knex';

class loginService {
    constructor(private knex: Knex){}
    getUser = async (id:number)=>{
        let fetchedData = await this.knex.select("*").from("users").where("id", id)
        return fetchedData
    }
    getUserByUsername = async (email:string)=>{
        let fetchedData = await this.knex.select("*").from("users").where("email", email)
        return fetchedData
    }
    toCreateAccount = async (username:string, password:string, profile_picture:string, email:string)=>{
        let is_rooms_owner = false
        let ids = await this.knex.insert({
            username,
            password,
            profile_picture,
            email
        }).into("users")
        .returning(['id', 'created_at']);
        return ids
    }
}


export default loginService