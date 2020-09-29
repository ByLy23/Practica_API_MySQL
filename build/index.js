"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.servirdor = void 0;
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
var apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
var server = /** @class */ (function () {
    function server() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    server.prototype.config = function () {
        this.app.set('port', process.env.PORT || 3000); //el proceso que toma una variable de entorno o el puerto 3000
        //el set es como si se hubiera declarado el app como una variable
        this.app.use(morgan_1.default('dev')); //dev, es lo que ve la peticion del cliente
        this.app.use(cors_1.default()); //pide datos al server
        this.app.use(express_1.default.json()); //para que se entienda el formato json y lo guarde asi
        this.app.use(express_1.default.urlencoded({ extended: false })); //si se usa formato html
    };
    server.prototype.routes = function () {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api', apiRoutes_1.default);
    };
    server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get('port'), function () {
            console.log('Servidor en puerto', _this.app.get('port'));
        });
    };
    return server;
}());
exports.servirdor = new server();
exports.servirdor.start();
