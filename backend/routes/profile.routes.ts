import express from 'express';
import {upload} from "../main"
import ProfileController from "../controllers/profile.controller"
import { isLoggedIn } from "../utils/guards";

export const ProfileRoute = (ProfileController: ProfileController) =>{
    let profileRoutes = express.Router();
    profileRoutes.get("/get-user",isLoggedIn,ProfileController.fetchUserData)
    profileRoutes.put("/avatar-update",isLoggedIn,upload.single("profileImage"), ProfileController.updateAvatar)
    return profileRoutes;
}