import {Request, Response} from 'express';
import pool from '../database';

class ApiController{
    public async getFunciones(req: Request,  res: Response){
        const peticion= await pool.query('PEticion de base de datos');
        res.json(peticion);
    }
}//esto es un comentario
export const apiController= new ApiController();
