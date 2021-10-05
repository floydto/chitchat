import loginService from '../services/login.service';
import {Request,Response} from 'express';
import jwtSimple from 'jwt-simple';
import jwt from '../utils/jwt';
import { checkPassword} from '../utils/hash'

class loginController {
    constructor(public loginService: loginService){}
    post = async (req:Request,res:Response)=>{
        try{
            if (!req.body.email || !req.body.password) {
                res.status(401).json({errors:"Wrong Email/Password"});
                return;
            }
            const {email,password} = req.body;
            const user = (await this.loginService.getUserByUsername(email))[0];
            if(!user || !(await checkPassword(password,user.password))){
                res.status(401).json({errors:"Incorrect email or password input"});
                return;
            }
            const payload = {
                id: user.id,
                username: user.username,
                profile_picture: user.profile_picture,
                created_at: user.created_at,
            };
            const token = jwtSimple.encode(payload, jwt.jwtSecret);
            return res.json({
                token: token,
                payload: JSON.stringify(payload)
            });
        }catch(e){
            console.log(e)
            return res.status(500).json({errors:e.toString()})
        }
    }

    makeId = (length:number) => {
        let result = "";
        let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}

export default loginController



