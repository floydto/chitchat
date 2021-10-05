import profileService from '../services/profile.service';
import express from "express";

class ProfileController {
    constructor(public profileService: profileService){}
    updateAvatar = async (req: express.Request, res: express.Response)=>{
        try{
            const userId = req.user?.id
            const fileName = req.file?.filename;
            await this.profileService.toUpdateAvatar(userId,fileName)
            return res.status(200).json({url:fileName})
        }catch(err){
            return res.status(500).json({message:"something went wrong"})
        }
        

    }
    fetchUserData = async (req: express.Request, res: express.Response)=>{
        try{
            const userId = req.user?.id
            const userInfoArr = await this.profileService.fetchUserData(userId)
            const userInfo = userInfoArr[0]
            return res.status(200).json({userInfo})
        }catch(err){
            return res.status(500).json({message:"something went wrong"})
        }
    }
}

export default ProfileController