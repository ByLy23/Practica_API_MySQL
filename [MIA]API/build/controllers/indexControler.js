"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
var database_1 = __importDefault(require("../database"));
var IndexController = /** @class */ (function () {
    function IndexController() {
    }
    IndexController.prototype.index = function (req, res) {
        //res.send('Mensaje');
        res.json({ text: 'Hola bbsitas' });
    };
    IndexController.prototype.getConsulta1 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("select  usr.nombre_usuario,usr.telefono_usuario,dcu.id_det_comp_usr as \"Numero de Orden\",dcu.total\n        from det_compania_usuario dcu\n        join usuario usr\n        on usr.id_usuario=dcu.id_usuario\n        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario\n        where tip.nombre_usuario='P'\n        order by total desc limit 1")];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.getConsulta2 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("select usr.id_usuario,usr.nombre_usuario,dcu.total,dpc.id_det_comp_usr,count(dpc.id_det_comp_usr) as Cantidad_Comprada\n        from detalle_producto_compania  dpc\n        join det_compania_usuario dcu\n        on (dcu.id_det_comp_usr= dpc.id_det_comp_usr)\n        join usuario usr\n        on (dcu.id_usuario=usr.id_usuario)\n        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario\n        where tip.nombre_usuario='C'\n        group by dpc.id_det_comp_usr \n        order by Cantidad_Comprada desc limit 1")];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.getConsulta3 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("(select rg.nombre_region as REGION,cd.nombre_ciudad as CIUDAD,dir.nombre_direccion as DIRECCION,count(usr.id_direccion) as Pedidos from det_compania_usuario dcu \n        join usuario usr on usr.id_usuario=dcu.id_usuario \n        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario\n        join direccion dir\n        on usr.id_direccion= dir.id_direccion \n        join ciudad cd\n        on dir.id_ciudad=cd.id_ciudad\n        join region rg\n        on cd.id_region= rg.id_region\n        where tip.nombre_usuario='P'\n        group by dir.id_direccion order by Pedidos desc limit 1)\n        union \n        (select rg.nombre_region as REGION,cd.nombre_ciudad as CIUDAD,dir.nombre_direccion as DIRECCION,count(usr.id_direccion) as Pedidoz from det_compania_usuario dcu \n        join usuario usr on usr.id_usuario=dcu.id_usuario \n        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario\n        join direccion dir\n        on usr.id_direccion= dir.id_direccion \n        join ciudad cd\n        on dir.id_ciudad=cd.id_ciudad\n        join region rg\n        on cd.id_region= rg.id_region\n        where tip.nombre_usuario='P'\n        group by dir.id_direccion order by Pedidoz asc limit 1)")];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.getConsulta4 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("select usr.id_usuario,usr.nombre_usuario,sum(total)as Total,count(dcu.id_det_comp_usr) as Ordenes \n        from det_compania_usuario dcu \n        join detalle_producto_compania dpc\n        on dcu.id_det_comp_usr=dpc.id_det_comp_usr and dpc.nombre_producto in (select nombre_producto from producto join categoria on producto.id_categoria=categoria.id_categoria where categoria.nombre_categoria='Cheese')\n        join usuario usr\n        on (usr.id_usuario=dcu.id_usuario)\n        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario\n        where dcu.id_usuario=usr.id_usuario and tip.nombre_usuario='C' group by usr.id_usuario order by Ordenes desc limit 5")];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.getConsulta5 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("(select count(dcu.id_usuario) as Solicitud,usr.nombre_usuario,usr.fecha_ingreso \n        from det_compania_usuario dcu \n        join usuario usr\n        on dcu.id_usuario=usr.id_usuario\n        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario\n        where tip.nombre_usuario='C'\n        group by dcu.id_usuario order by Solicitud asc limit 4)   \n        union\n        (select count(dcu.id_usuario) as Solicitud,usr.nombre_usuario,usr.fecha_ingreso \n        from det_compania_usuario dcu \n        join usuario usr\n        on dcu.id_usuario=usr.id_usuario\n        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario\n        where tip.nombre_usuario='C'\n        group by dcu.id_usuario order by Solicitud desc limit 4)")];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.getConsulta6 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("(select cat.nombre_categoria, sum(pr.precio_producto) as Total,count(pr.id_categoria) as categoriaVendida\n        from detalle_producto_compania dpc \n        join producto pr \n        on dpc.nombre_producto=pr.nombre_producto \n        join categoria cat \n        on pr.id_categoria=cat.id_categoria\n        group by cat.id_categoria order by categoriaVendida desc limit 1)\n        union all\n        (select cat.nombre_categoria, sum(pr.precio_producto) as Total,count(pr.id_categoria) as categoriaVendida\n        from detalle_producto_compania dpc \n        join producto pr \n        on dpc.nombre_producto=pr.nombre_producto \n        join categoria cat \n        on pr.id_categoria=cat.id_categoria\n        group by cat.id_categoria order by categoriaVendida asc limit 1)")];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.getConsulta7 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("select dcu.id_usuario,usr.nombre_usuario,usr.correo_usuario,usr.telefono_usuario,count(dcu.id_usuario) as Pedidos, sum(dpc.precio_producto) as TOTAL from det_compania_usuario dcu \n        join usuario usr on dcu.id_usuario=usr.id_usuario \n        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario\n        join detalle_producto_compania dpc on dcu.id_det_comp_usr=dpc.id_det_comp_usr\n        join producto pr on pr.nombre_producto=dpc.nombre_producto\n        join categoria cat on pr.id_categoria=cat.id_categoria\n        where tip.nombre_usuario='P' and cat.nombre_categoria='Fresh Vegetables'\n        group by dcu.id_usuario order by TOTAL desc limit 5")];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.getConsulta8 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("(select dir.nombre_direccion as DIRECCION,cd.nombre_ciudad AS CIUDAD,cd.codigo_postal AS COD_POSTAL,reg.nombre_region AS REGION,usr.nombre_usuario AS USUARIO,sum(dcu.total) as Total from det_compania_usuario dcu \n        join usuario usr on dcu.id_usuario=usr.id_usuario \n        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario\n        join direccion dir on usr.id_direccion=dir.id_direccion\n        join ciudad cd on dir.id_ciudad=cd.id_ciudad\n        join region reg on cd.id_region=reg.id_region\n        where tip.nombre_usuario='C'\n        group by dcu.id_usuario  order by Total desc limit 3)\n        union all\n        (select dir.nombre_direccion as DIRECCION,cd.nombre_ciudad AS CIUDAD,cd.codigo_postal AS COD_POSTAL,reg.nombre_region AS REGION,usr.nombre_usuario AS USUARIO,sum(dcu.total) as Total from det_compania_usuario dcu \n        join usuario usr on dcu.id_usuario=usr.id_usuario\n        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario \n        join direccion dir on usr.id_direccion=dir.id_direccion\n        join ciudad cd on dir.id_ciudad=cd.id_ciudad\n        join region reg on cd.id_region=reg.id_region\n        where tip.nombre_usuario='C'\n        group by dcu.id_usuario  order by Total asc limit 3)")];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.getConsulta9 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("select usr.nombre_usuario AS PROVEEDOR,usr.telefono_usuario AS TELEFONO,dcu.id_det_comp_usr as NUMERO_ORDEN,dcu.total AS TOTAL,sum(dpc.cantidad) as Cantidad_Comprada from det_compania_usuario dcu \n        join usuario usr on dcu.id_usuario=usr.id_usuario \n        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario\n        join detalle_producto_compania dpc on dcu.id_det_comp_usr=dpc.id_det_comp_usr\n        where tip.nombre_usuario='P'\n        group by dcu.id_det_comp_usr order by Cantidad_Comprada asc limit 12")];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.getConsulta10 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("select usr.nombre_usuario,usr.correo_usuario,usr.telefono_usuario,sum(pr.precio_producto) as Total,sum(dpc.cantidad) as Cantidad_Comprada from det_compania_usuario dcu\n        join usuario usr on dcu.id_usuario=usr.id_usuario\n        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario\n        join detalle_producto_compania dpc on dcu.id_det_comp_usr=dpc.id_det_comp_usr\n        join producto pr on dpc.nombre_producto=pr.nombre_producto\n        join categoria cat on pr.id_categoria=cat.id_categoria\n        where cat.nombre_categoria='Seafood' and tip.nombre_usuario='C'\n        group by dcu.id_usuario order by Cantidad_Comprada desc limit 10")];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.deleteTemporal = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query('delete from temporal')];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.mostrar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query('select * from temporal')];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.cargarTemporal = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("load data infile '/var/lib/mysql-files/DataCenterData.csv'\n        into table eje_de_mundo.temporal fields terminated by ';'\n        lines terminated by '\n' ignore 1 lines")];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.eliminaModelo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var tipo_usuario, usuario, compania, categoria, producto, direccion, ciudad, region, det_compania_usuario, detalle_producto_compania;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query('delete from tipo_usuario')];
                    case 1:
                        tipo_usuario = _a.sent();
                        return [4 /*yield*/, database_1.default.query('delete from usuario')];
                    case 2:
                        usuario = _a.sent();
                        return [4 /*yield*/, database_1.default.query('delete from compania')];
                    case 3:
                        compania = _a.sent();
                        return [4 /*yield*/, database_1.default.query('delete from categoria')];
                    case 4:
                        categoria = _a.sent();
                        return [4 /*yield*/, database_1.default.query('delete from producto')];
                    case 5:
                        producto = _a.sent();
                        return [4 /*yield*/, database_1.default.query('delete from direccion')];
                    case 6:
                        direccion = _a.sent();
                        return [4 /*yield*/, database_1.default.query('delete from ciudad')];
                    case 7:
                        ciudad = _a.sent();
                        return [4 /*yield*/, database_1.default.query('delete from region')];
                    case 8:
                        region = _a.sent();
                        return [4 /*yield*/, database_1.default.query('delete from det_compania_usuario')];
                    case 9:
                        det_compania_usuario = _a.sent();
                        return [4 /*yield*/, database_1.default.query('delete from detalle_producto_compania')];
                    case 10:
                        detalle_producto_compania = _a.sent();
                        res.json('Datos eliminados Exitosamente');
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.cargaModelo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var inst_user, inst_usr, cat, producto, region, ciudad, direccion, compania, usur, det_com, det, update;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("insert into tipo_usuario (nombre_usuario) values ('C')")];
                    case 1:
                        inst_user = _a.sent();
                        return [4 /*yield*/, database_1.default.query("insert into tipo_usuario (nombre_usuario) values ('P')")];
                    case 2:
                        inst_usr = _a.sent();
                        return [4 /*yield*/, database_1.default.query("insert into categoria (nombre_categoria) select distinct categoria_producto from temporal")];
                    case 3:
                        cat = _a.sent();
                        return [4 /*yield*/, database_1.default.query("insert into producto (id_categoria,nombre_producto,precio_producto) \n        select distinct (select id_categoria from categoria where temporal.categoria_producto= categoria.nombre_categoria), nombre_producto, precio_producto \n        from temporal")];
                    case 4:
                        producto = _a.sent();
                        return [4 /*yield*/, database_1.default.query("insert into region (nombre_region) select distinct region_c_p from temporal")];
                    case 5:
                        region = _a.sent();
                        return [4 /*yield*/, database_1.default.query("insert into ciudad (id_region,nombre_ciudad,codigo_postal) \n        select distinct (select id_region from region \n        where temporal.region_c_p= region.nombre_region),ciudad_c_p,codigo_postal_c_p from temporal")];
                    case 6:
                        ciudad = _a.sent();
                        return [4 /*yield*/, database_1.default.query("insert into direccion(id_ciudad,nombre_direccion) \n        select distinct (select id_ciudad from ciudad \n        where temporal.ciudad_c_p=ciudad.nombre_ciudad \n        and temporal.codigo_postal_c_p=ciudad.codigo_postal),direccion_c_p from temporal")];
                    case 7:
                        direccion = _a.sent();
                        return [4 /*yield*/, database_1.default.query("insert into compania (nombre_compania, nombre_contacto, correo_compania, telefono_compania) \n        select distinct nombre_compania, contacto_compania, correo_compania,telefono_compania \n        from temporal")];
                    case 8:
                        compania = _a.sent();
                        return [4 /*yield*/, database_1.default.query("insert into usuario (id_tipo_usuario,id_direccion,nombre_usuario,correo_usuario,telefono_usuario,fecha_ingreso) \n        select distinct \n        (select id_tipo_usuario from tipo_usuario where temporal.tipo=tipo_usuario.nombre_usuario),\n        (select id_direccion from direccion where temporal.direccion_c_p=direccion.nombre_direccion),\n        nombre_c_p,\n        correo_c_p,\n        telefono_c_p,\n        fecha_registro_c_p\n        from temporal")];
                    case 9:
                        usur = _a.sent();
                        return [4 /*yield*/, database_1.default.query("insert into det_compania_usuario (id_usuario,id_compania, total) \n        select distinct (\n        select id_usuario from usuario where temporal.nombre_c_p=usuario.nombre_usuario),\n        (select id_compania from compania where temporal.nombre_compania=compania.nombre_compania),\n        '0.00' \n        from temporal")];
                    case 10:
                        det_com = _a.sent();
                        return [4 /*yield*/, database_1.default.query("insert into detalle_producto_compania (id_det_comp_usr,nombre_producto,precio_producto,cantidad)\n        select (\n        select id_det_comp_usr \n        from det_compania_usuario \n        where id_usuario=(select id_usuario from usuario where usuario.nombre_usuario=temporal.nombre_c_p) \n        and id_compania=(select id_compania from compania where compania.nombre_compania=temporal.nombre_compania)\n        ),\n        nombre_producto,\n        precio_producto,\n        cantidad\n        from temporal")];
                    case 11:
                        det = _a.sent();
                        return [4 /*yield*/, database_1.default.query("update det_compania_usuario \n        set total =(select sum(precio_producto*cantidad) as Total \n        from detalle_producto_compania where det_compania_usuario.id_det_comp_usr=detalle_producto_compania.id_det_comp_usr group by id_det_comp_usr)")];
                    case 12:
                        update = _a.sent();
                        res.json("Datos Cargados a la Base de datos Exitosamente");
                        return [2 /*return*/];
                }
            });
        });
    };
    //PERSONALES
    IndexController.prototype.eliminaTabla = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("drop database eje_de_mundo")];
                    case 1:
                        peticion = _a.sent();
                        res.json(peticion);
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexController.prototype.creaTabla = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var peticion, peticion1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("create database if not exists eje_de_mundo")];
                    case 1:
                        peticion = _a.sent();
                        return [4 /*yield*/, database_1.default.query("use eje_de_mundo")];
                    case 2:
                        peticion1 = _a.sent();
                        res.json("Database creada");
                        return [2 /*return*/];
                }
            });
        });
    };
    return IndexController;
}());
exports.indexController = new IndexController();
