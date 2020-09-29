"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
//import pool from '../database';
var IndexController = /** @class */ (function () {
    function IndexController() {
    }
    IndexController.prototype.index = function (req, res) {
        //res.send('Mensaje');
        res.json({ text: 'Hola bbsita' });
        //   const peticion= await pool.query('PEticion de base de datos');
        //   res.json{peticion};
    };
    return IndexController;
}());
exports.indexController = new IndexController();
