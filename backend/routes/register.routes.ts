import express from 'express';
import {upload} from "../main"
import RegisterController from "../controllers/register.controller";


export const RegisterRoute = (RegisterController: RegisterController) =>{
    let registerRoutes = express.Router();
    registerRoutes.post('/', upload.single("profileImage"),RegisterController.post)

    return registerRoutes;
}