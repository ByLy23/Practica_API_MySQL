import {Request, Response} from 'express';
//import pool from '../database';

class IndexController{
    public index(req: Request,  res: Response){
        //res.send('Mensaje');
        res.json({text:'Hola bbsita'});
     
     //   res.json{peticion};
    }
}
export const indexController= new IndexController();