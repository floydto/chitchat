import express from 'express';
import LoginController from "../controllers/login.controller"


export const LoginRoute = (LoginController: LoginController) =>{
    let loginRoutes = express.Router();
    loginRoutes.post("/", LoginController.post)
    return loginRoutes;
}