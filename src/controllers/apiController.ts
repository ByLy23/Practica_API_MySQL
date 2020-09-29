import {Request, Response} from 'express';
import pool from '../database';

class ApiController{
    public async getFunciones(req: Request,  res: Response){
        const peticion= await pool.query('PEticion de base de datos');
        res.json(peticion);
    }
}
export const apiController= new ApiController();
