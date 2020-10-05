import {Router} from 'express';
import {indexController} from '../controllers/indexControler';
//import {indexController} from '../controllers/indexController';
class IndexRoutes{
    public router: Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',indexController.index);
        this.router.get('/consulta1',indexController.getConsulta1);
        this.router.get('/consulta2',indexController.getConsulta2);
        this.router.get('/consulta3',indexController.getConsulta3);
              this.router.get('/consulta4',indexController.getConsulta4);
              this.router.get('/consulta5',indexController.getConsulta5);
              this.router.get('/consulta6',indexController.getConsulta6);
              this.router.get('/consulta7',indexController.getConsulta7);
              this.router.get('/consulta8',indexController.getConsulta8);
              this.router.get('/consulta9',indexController.getConsulta9);
              this.router.get('/consulta10',indexController.getConsulta10);
              this.router.get('/eliminarTemporal',indexController.deleteTemporal);
              this.router.get('/mostrar',indexController.mostrar);
              this.router.get('/cargarTemporal',indexController.cargarTemporal);
              this.router.get('/eliminarModelo',indexController.eliminaModelo);
              this.router.get('/cargarModelo',indexController.cargaModelo);
              this.router.get('/elimTabla',indexController.eliminaTabla);
              this.router.get('/creaTabla',indexController.creaTabla);
            }
}
const indexRoutes= new IndexRoutes();
export default indexRoutes.router;