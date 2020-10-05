import {Router} from 'express';
import {apiController} from '../controllers/apiController';
class ApiRoutes{
    public router: Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/consulta1',apiController.getConsulta1);
        this.router.get('/consulta2',apiController.getConsulta2);
        this.router.get('/consulta3',apiController.getConsulta3);
        this.router.get('/consulta4',apiController.getConsulta4);
        this.router.get('/consulta5',apiController.getConsulta5);
        this.router.get('/consulta6',apiController.getConsulta6);
        this.router.get('/consulta7',apiController.getConsulta7);
        this.router.get('/consulta8',apiController.getConsulta8);
        this.router.get('/consulta9',apiController.getConsulta9);
        this.router.get('/consulta10',apiController.getConsulta10);
        this.router.get('/eliminarTemporal',apiController.deleteTemporal);
        this.router.get('/cargarTemporal',apiController.cargarTemporal);
        this.router.get('/eliminarModelo',apiController.eliminaModelo);
        this.router.get('/cargarModelo',apiController.cargaModelo);
    }
}
const apiRoutes= new ApiRoutes();
export default apiRoutes.router;