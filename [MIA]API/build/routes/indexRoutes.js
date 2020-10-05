"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var indexControler_1 = require("../controllers/indexControler");
//import {indexController} from '../controllers/indexController';
var IndexRoutes = /** @class */ (function () {
    function IndexRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    IndexRoutes.prototype.config = function () {
        this.router.get('/', indexControler_1.indexController.index);
        this.router.get('/consulta1', indexControler_1.indexController.getConsulta1);
        this.router.get('/consulta2', indexControler_1.indexController.getConsulta2);
        this.router.get('/consulta3', indexControler_1.indexController.getConsulta3);
        this.router.get('/consulta4', indexControler_1.indexController.getConsulta4);
        this.router.get('/consulta5', indexControler_1.indexController.getConsulta5);
        this.router.get('/consulta6', indexControler_1.indexController.getConsulta6);
        this.router.get('/consulta7', indexControler_1.indexController.getConsulta7);
        this.router.get('/consulta8', indexControler_1.indexController.getConsulta8);
        this.router.get('/consulta9', indexControler_1.indexController.getConsulta9);
        this.router.get('/consulta10', indexControler_1.indexController.getConsulta10);
        this.router.get('/eliminarTemporal', indexControler_1.indexController.deleteTemporal);
        this.router.get('/mostrar', indexControler_1.indexController.mostrar);
        this.router.get('/cargarTemporal', indexControler_1.indexController.cargarTemporal);
        this.router.get('/eliminarModelo', indexControler_1.indexController.eliminaModelo);
        this.router.get('/cargarModelo', indexControler_1.indexController.cargaModelo);
        this.router.get('/elimTabla', indexControler_1.indexController.eliminaTabla);
        this.router.get('/creaTabla', indexControler_1.indexController.creaTabla);
    };
    return IndexRoutes;
}());
var indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
