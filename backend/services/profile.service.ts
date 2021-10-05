import Knex from 'knex';

class profileService {
    constructor(private knex: Knex){}
    toUpdateAvatar = async (id, profile_picture) =>{
        await this.knex("users")
			.update({
				profile_picture: profile_picture,
			})
			.where("id", id)
    }
    fetchUserData = async (id)=>{
        return await this.knex("users").select(["username", "id", "created_at", "profile_picture"]).where("id",id)
    }
}



export default profileService