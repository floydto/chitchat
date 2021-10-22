import express from "express"
import bodyParser from 'body-parser';
import knexConfigs = require('./knexfile');
import multer from 'multer';
import Knex from 'knex';
import cors from "cors"
import http from 'http';
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
const server = new http.Server(app);


app.get("/", (req,res)=>{
    res.json({message:'123'})
})

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(express.json())
let mode = process.env.NODE_ENV || "test";

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
let knexConfig = knexConfigs[mode]
export const knex = Knex(knexConfig)

//  Configuring multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, `./public/uploads`);
    },
    filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.jpg`);
    }
})
export const upload = multer({ storage: storage })

app.use(express.static("public/uploads"));


// Register route, service, controller
import { RegisterRoute } from './routes/register.routes';
import RegisterService from './services/register.service';
import RegisterController from './controllers/register.controller'

let registerService = new RegisterService(knex)
let registerController = new RegisterController(registerService)
let registerRoute = RegisterRoute(registerController)
app.use('/register', registerRoute)

// Login route, service, controller
import { LoginRoute } from './routes/login.routes';
import LoginService from './services/login.service';
import LoginController from './controllers/login.controller';

export let loginService = new LoginService(knex);
let loginController = new LoginController(loginService);
let loginRoute = LoginRoute(loginController);
app.use('/login', loginRoute)

// Profile route, service, controller
import { ProfileRoute } from './routes/profile.routes';
import ProfileService  from './services/profile.service';
import ProfileController from './controllers/profile.controller'


export let profileService = new ProfileService(knex);
let profileController = new ProfileController(profileService);
let profileRoute = ProfileRoute(profileController);
app.use('/profile', profileRoute)

import ChatroomController from "./controllers/chatroom.controller";
import { ChatRoomRoute } from "./routes/chatroom.routes";
import ChatRoomService from "./services/chatroom.service";

export let chatRoomService = new ChatRoomService(knex);
let chatRoomController = new ChatroomController(chatRoomService);
let chatRoomRoute = ChatRoomRoute(chatRoomController);
app.use('/chatroom', chatRoomRoute)

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`listen on port http://localhost:${PORT}`)
})