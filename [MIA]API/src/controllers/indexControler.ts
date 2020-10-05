import {Request, Response} from 'express';
import pool from '../database';

class IndexController{
    public index(req: Request,  res: Response){
        //res.send('Mensaje');
        res.json({text:'Hola bbsitas'});
    }
    public async getConsulta1(req: Request,  res: Response){
        const peticion= await pool.query(`select  usr.nombre_usuario,usr.telefono_usuario,dcu.id_det_comp_usr as "Numero de Orden",dcu.total
        from det_compania_usuario dcu
        join usuario usr
        on usr.id_usuario=dcu.id_usuario
        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario
        where tip.nombre_usuario='P'
        order by total desc limit 1`);
        res.json(peticion);
    }
    public async getConsulta2(req: Request,  res: Response){
        const peticion= await pool.query(`select usr.id_usuario,usr.nombre_usuario,dcu.total,dpc.id_det_comp_usr,count(dpc.id_det_comp_usr) as Cantidad_Comprada
        from detalle_producto_compania  dpc
        join det_compania_usuario dcu
        on (dcu.id_det_comp_usr= dpc.id_det_comp_usr)
        join usuario usr
        on (dcu.id_usuario=usr.id_usuario)
        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario
        where tip.nombre_usuario='C'
        group by dpc.id_det_comp_usr 
        order by Cantidad_Comprada desc limit 1`);
        res.json(peticion);
    }
    public async getConsulta3(req: Request,  res: Response){
        const peticion= await pool.query(`(select rg.nombre_region as REGION,cd.nombre_ciudad as CIUDAD,dir.nombre_direccion as DIRECCION,count(usr.id_direccion) as Pedidos from det_compania_usuario dcu 
        join usuario usr on usr.id_usuario=dcu.id_usuario 
        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario
        join direccion dir
        on usr.id_direccion= dir.id_direccion 
        join ciudad cd
        on dir.id_ciudad=cd.id_ciudad
        join region rg
        on cd.id_region= rg.id_region
        where tip.nombre_usuario='P'
        group by dir.id_direccion order by Pedidos desc limit 1)
        union 
        (select rg.nombre_region as REGION,cd.nombre_ciudad as CIUDAD,dir.nombre_direccion as DIRECCION,count(usr.id_direccion) as Pedidoz from det_compania_usuario dcu 
        join usuario usr on usr.id_usuario=dcu.id_usuario 
        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario
        join direccion dir
        on usr.id_direccion= dir.id_direccion 
        join ciudad cd
        on dir.id_ciudad=cd.id_ciudad
        join region rg
        on cd.id_region= rg.id_region
        where tip.nombre_usuario='P'
        group by dir.id_direccion order by Pedidoz asc limit 1)`);
        res.json(peticion);
    }
    public async getConsulta4(req: Request,  res: Response){
        const peticion= await pool.query(`select usr.id_usuario,usr.nombre_usuario,sum(total)as Total,count(dcu.id_det_comp_usr) as Ordenes 
        from det_compania_usuario dcu 
        join detalle_producto_compania dpc
        on dcu.id_det_comp_usr=dpc.id_det_comp_usr and dpc.nombre_producto in (select nombre_producto from producto join categoria on producto.id_categoria=categoria.id_categoria where categoria.nombre_categoria='Cheese')
        join usuario usr
        on (usr.id_usuario=dcu.id_usuario)
        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario
        where dcu.id_usuario=usr.id_usuario and tip.nombre_usuario='C' group by usr.id_usuario order by Ordenes desc limit 5`);
        res.json(peticion);
    }
    public async getConsulta5(req: Request,  res: Response){
        const peticion= await pool.query(`(select count(dcu.id_usuario) as Solicitud,usr.nombre_usuario,usr.fecha_ingreso 
        from det_compania_usuario dcu 
        join usuario usr
        on dcu.id_usuario=usr.id_usuario
        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario
        where tip.nombre_usuario='C'
        group by dcu.id_usuario order by Solicitud asc limit 4)   
        union
        (select count(dcu.id_usuario) as Solicitud,usr.nombre_usuario,usr.fecha_ingreso 
        from det_compania_usuario dcu 
        join usuario usr
        on dcu.id_usuario=usr.id_usuario
        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario
        where tip.nombre_usuario='C'
        group by dcu.id_usuario order by Solicitud desc limit 4)`);
        res.json(peticion);
    }
    public async getConsulta6(req: Request,  res: Response){
        const peticion= await pool.query(`(select cat.nombre_categoria, sum(pr.precio_producto) as Total,count(pr.id_categoria) as categoriaVendida
        from detalle_producto_compania dpc 
        join producto pr 
        on dpc.nombre_producto=pr.nombre_producto 
        join categoria cat 
        on pr.id_categoria=cat.id_categoria
        group by cat.id_categoria order by categoriaVendida desc limit 1)
        union all
        (select cat.nombre_categoria, sum(pr.precio_producto) as Total,count(pr.id_categoria) as categoriaVendida
        from detalle_producto_compania dpc 
        join producto pr 
        on dpc.nombre_producto=pr.nombre_producto 
        join categoria cat 
        on pr.id_categoria=cat.id_categoria
        group by cat.id_categoria order by categoriaVendida asc limit 1)`);
        res.json(peticion);
    }
    public async getConsulta7(req: Request,  res: Response){
        const peticion= await pool.query(`select dcu.id_usuario,usr.nombre_usuario,usr.correo_usuario,usr.telefono_usuario,count(dcu.id_usuario) as Pedidos, sum(dpc.precio_producto) as TOTAL from det_compania_usuario dcu 
        join usuario usr on dcu.id_usuario=usr.id_usuario 
        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario
        join detalle_producto_compania dpc on dcu.id_det_comp_usr=dpc.id_det_comp_usr
        join producto pr on pr.nombre_producto=dpc.nombre_producto
        join categoria cat on pr.id_categoria=cat.id_categoria
        where tip.nombre_usuario='P' and cat.nombre_categoria='Fresh Vegetables'
        group by dcu.id_usuario order by TOTAL desc limit 5`);
        res.json(peticion);
    }
    public async getConsulta8(req: Request,  res: Response){
        const peticion= await pool.query(`(select dir.nombre_direccion as DIRECCION,cd.nombre_ciudad AS CIUDAD,cd.codigo_postal AS COD_POSTAL,reg.nombre_region AS REGION,usr.nombre_usuario AS USUARIO,sum(dcu.total) as Total from det_compania_usuario dcu 
        join usuario usr on dcu.id_usuario=usr.id_usuario 
        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario
        join direccion dir on usr.id_direccion=dir.id_direccion
        join ciudad cd on dir.id_ciudad=cd.id_ciudad
        join region reg on cd.id_region=reg.id_region
        where tip.nombre_usuario='C'
        group by dcu.id_usuario  order by Total desc limit 3)
        union all
        (select dir.nombre_direccion as DIRECCION,cd.nombre_ciudad AS CIUDAD,cd.codigo_postal AS COD_POSTAL,reg.nombre_region AS REGION,usr.nombre_usuario AS USUARIO,sum(dcu.total) as Total from det_compania_usuario dcu 
        join usuario usr on dcu.id_usuario=usr.id_usuario
        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario 
        join direccion dir on usr.id_direccion=dir.id_direccion
        join ciudad cd on dir.id_ciudad=cd.id_ciudad
        join region reg on cd.id_region=reg.id_region
        where tip.nombre_usuario='C'
        group by dcu.id_usuario  order by Total asc limit 3)`);
        res.json(peticion);
    }
    public async getConsulta9(req: Request,  res: Response){
        const peticion= await pool.query(`select usr.nombre_usuario AS PROVEEDOR,usr.telefono_usuario AS TELEFONO,dcu.id_det_comp_usr as NUMERO_ORDEN,dcu.total AS TOTAL,sum(dpc.cantidad) as Cantidad_Comprada from det_compania_usuario dcu 
        join usuario usr on dcu.id_usuario=usr.id_usuario 
        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario
        join detalle_producto_compania dpc on dcu.id_det_comp_usr=dpc.id_det_comp_usr
        where tip.nombre_usuario='P'
        group by dcu.id_det_comp_usr order by Cantidad_Comprada asc limit 12`);
        res.json(peticion);
    }
    public async getConsulta10(req: Request,  res: Response){
        const peticion= await pool.query(`select usr.nombre_usuario,usr.correo_usuario,usr.telefono_usuario,sum(pr.precio_producto) as Total,sum(dpc.cantidad) as Cantidad_Comprada from det_compania_usuario dcu
        join usuario usr on dcu.id_usuario=usr.id_usuario
        join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario
        join detalle_producto_compania dpc on dcu.id_det_comp_usr=dpc.id_det_comp_usr
        join producto pr on dpc.nombre_producto=pr.nombre_producto
        join categoria cat on pr.id_categoria=cat.id_categoria
        where cat.nombre_categoria='Seafood' and tip.nombre_usuario='C'
        group by dcu.id_usuario order by Cantidad_Comprada desc limit 10`);
        res.json(peticion);
    }
    public async deleteTemporal(req: Request,  res: Response){
        const peticion= await pool.query('delete from temporal');
        res.json(peticion);
    }
    public async mostrar(req: Request,  res: Response){
        const peticion= await pool.query('select * from temporal');
        res.json(peticion);
    }
    public async cargarTemporal(req: Request, res: Response){
        const peticion= await pool.query(`load data infile '/var/lib/mysql-files/DataCenterData.csv'
        into table eje_de_mundo.temporal fields terminated by ';'
        lines terminated by '\n' ignore 1 lines`);
        res.json(peticion);
    }
    public async eliminaModelo(req: Request, res: Response){
        const tipo_usuario= await pool.query('delete from tipo_usuario');
        const usuario= await pool.query('delete from usuario');
        const compania= await pool.query('delete from compania');
        const categoria= await pool.query('delete from categoria');
        const producto= await pool.query('delete from producto');
        const direccion= await pool.query('delete from direccion');
        const ciudad= await pool.query('delete from ciudad');
        const region= await pool.query('delete from region');
        const det_compania_usuario= await pool.query('delete from det_compania_usuario');
        const detalle_producto_compania= await pool.query('delete from detalle_producto_compania');
        res.json('Datos eliminados Exitosamente');
    }
    public async cargaModelo(req: Request, res: Response){
        const inst_user= await pool.query(`insert into tipo_usuario (nombre_usuario) values ('C')`);
        const inst_usr= await pool.query(`insert into tipo_usuario (nombre_usuario) values ('P')`);
        const cat= await pool.query(`insert into categoria (nombre_categoria) select distinct categoria_producto from temporal`);
        const producto= await pool.query(`insert into producto (id_categoria,nombre_producto,precio_producto) 
        select distinct (select id_categoria from categoria where temporal.categoria_producto= categoria.nombre_categoria), nombre_producto, precio_producto 
        from temporal`);
        const region= await pool.query(`insert into region (nombre_region) select distinct region_c_p from temporal`);
        const ciudad= await pool.query(`insert into ciudad (id_region,nombre_ciudad,codigo_postal) 
        select distinct (select id_region from region 
        where temporal.region_c_p= region.nombre_region),ciudad_c_p,codigo_postal_c_p from temporal`);
        const direccion= await pool.query(`insert into direccion(id_ciudad,nombre_direccion) 
        select distinct (select id_ciudad from ciudad 
        where temporal.ciudad_c_p=ciudad.nombre_ciudad 
        and temporal.codigo_postal_c_p=ciudad.codigo_postal),direccion_c_p from temporal`);
        const compania= await pool.query(`insert into compania (nombre_compania, nombre_contacto, correo_compania, telefono_compania) 
        select distinct nombre_compania, contacto_compania, correo_compania,telefono_compania 
        from temporal`);
        const usur= await pool.query(`insert into usuario (id_tipo_usuario,id_direccion,nombre_usuario,correo_usuario,telefono_usuario,fecha_ingreso) 
        select distinct 
        (select id_tipo_usuario from tipo_usuario where temporal.tipo=tipo_usuario.nombre_usuario),
        (select id_direccion from direccion where temporal.direccion_c_p=direccion.nombre_direccion),
        nombre_c_p,
        correo_c_p,
        telefono_c_p,
        fecha_registro_c_p
        from temporal`);
        const det_com= await pool.query(`insert into det_compania_usuario (id_usuario,id_compania, total) 
        select distinct (
        select id_usuario from usuario where temporal.nombre_c_p=usuario.nombre_usuario),
        (select id_compania from compania where temporal.nombre_compania=compania.nombre_compania),
        '0.00' 
        from temporal`);
        const det= await pool.query(`insert into detalle_producto_compania (id_det_comp_usr,nombre_producto,precio_producto,cantidad)
        select (
        select id_det_comp_usr 
        from det_compania_usuario 
        where id_usuario=(select id_usuario from usuario where usuario.nombre_usuario=temporal.nombre_c_p) 
        and id_compania=(select id_compania from compania where compania.nombre_compania=temporal.nombre_compania)
        ),
        nombre_producto,
        precio_producto,
        cantidad
        from temporal`);
        const update= await pool.query(`update det_compania_usuario 
        set total =(select sum(precio_producto*cantidad) as Total 
        from detalle_producto_compania where det_compania_usuario.id_det_comp_usr=detalle_producto_compania.id_det_comp_usr group by id_det_comp_usr)`);
        
        res.json("Datos Cargados a la Base de datos Exitosamente");
    }
    //PERSONALES
    public async eliminaTabla(req: Request, res: Response){
        const peticion= await pool.query(`drop database eje_de_mundo`);
        res.json(peticion);
    }
    public async creaTabla(req: Request, res: Response){
        const peticion= await pool.query(`create database if not exists eje_de_mundo`);
        const peticion1= await pool.query(`use eje_de_mundo`);
        res.json("Database creada");
    }
    //eliminar datos del modelo es decir de la base de datos :V
    //cargar datos del modelo es decir la base de datos :vv
}
export const indexController= new IndexController();