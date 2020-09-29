import {Request, Response} from 'express';
//import pool from '../database';

class IndexController{
    public index(req: Request,  res: Response){
        //res.send('Mensaje');
     //   const peticion= await pool.query('PEticion de base de datos');
     //   res.json{peticion};
    }
}
export const apiController= new IndexController();