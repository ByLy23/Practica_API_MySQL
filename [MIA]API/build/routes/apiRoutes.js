"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiController_1 = require("../controllers/apiController");
var ApiRoutes = /** @class */ (function () {
    function ApiRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    ApiRoutes.prototype.config = function () {
        this.router.get('/consulta1', apiController_1.apiController.getConsulta1);
        this.router.get('/consulta2', apiController_1.apiController.getConsulta2);
        this.router.get('/consulta3', apiController_1.apiController.getConsulta3);
        this.router.get('/consulta4', apiController_1.apiController.getConsulta4);
        this.router.get('/consulta5', apiController_1.apiController.getConsulta5);
        this.router.get('/consulta6', apiController_1.apiController.getConsulta6);
        this.router.get('/consulta7', apiController_1.apiController.getConsulta7);
        this.router.get('/consulta8', apiController_1.apiController.getConsulta8);
        this.router.get('/consulta9', apiController_1.apiController.getConsulta9);
        this.router.get('/consulta10', apiController_1.apiController.getConsulta10);
        this.router.get('/eliminarTemporal', apiController_1.apiController.deleteTemporal);
        this.router.get('/cargarTemporal', apiController_1.apiController.cargarTemporal);
        this.router.get('/eliminarModelo', apiController_1.apiController.eliminaModelo);
        this.router.get('/cargarModelo', apiController_1.apiController.cargaModelo);
    };
    return ApiRoutes;
}());
var apiRoutes = new ApiRoutes();
exports.default = apiRoutes.router;
