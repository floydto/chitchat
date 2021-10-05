export interface User{
    id:number
    username:string
    password:string
}

declare global{
    namespace Express{
        interface Request{
            user?: User
        }
}
}