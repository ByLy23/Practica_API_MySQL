#CARGA MASIVA DE DATOS
load data infile '/var/lib/mysql-files/DataCenterData.csv'
into table eje_de_mundo.temporal fields terminated by ';'
lines terminated by '\n' ignore 1 lines;

insert into tipo_usuario (nombre_usuario) values ('C');

insert into tipo_usuario (nombre_usuario) values ('P');

insert into categoria (nombre_categoria) select distinct categoria_producto from temporal;
#CARGANDO DE TEMPORAL HACIA PRODUCTO
insert into producto (id_categoria,nombre_producto,precio_producto) 
select distinct (select id_categoria from categoria where temporal.categoria_producto= categoria.nombre_categoria), nombre_producto, precio_producto 
from temporal;
#CARGANDO DE TEMPORAL HACIA REGION
insert into region (nombre_region) select distinct region_c_p from temporal;
#CARGANDO DE TEMPORAL HACIA CIUDAD
insert into ciudad (id_region,nombre_ciudad,codigo_postal) 
select distinct (select id_region from region 
where temporal.region_c_p= region.nombre_region),ciudad_c_p,codigo_postal_c_p from temporal;
#CARGANDO DE TEMPORAL HACIA DIRECCION
insert into direccion(id_ciudad,nombre_direccion) 
select distinct (select id_ciudad from ciudad 
where temporal.ciudad_c_p=ciudad.nombre_ciudad 
and temporal.codigo_postal_c_p=ciudad.codigo_postal),direccion_c_p from temporal;
#CARGANDO DE TEMPORAL HACIA COMPANIA
insert into compania (nombre_compania, nombre_contacto, correo_compania, telefono_compania) 
select distinct nombre_compania, contacto_compania, correo_compania,telefono_compania 
from temporal;
#CARGANDO DE TEMPORAL HACIA USUARIO
insert into usuario (id_tipo_usuario,id_direccion,nombre_usuario,correo_usuario,telefono_usuario,fecha_ingreso) 
select distinct 
(select id_tipo_usuario from tipo_usuario where temporal.tipo=tipo_usuario.nombre_usuario),
(select id_direccion from direccion where temporal.direccion_c_p=direccion.nombre_direccion),
nombre_c_p,
correo_c_p,
telefono_c_p,
fecha_registro_c_p
from temporal;
#CARGANDO DE TEMPORAL HACIA DETALLE COMPANIA
insert into det_compania_usuario (id_usuario,id_compania, total) 
select distinct (
select id_usuario from usuario where temporal.nombre_c_p=usuario.nombre_usuario),
(select id_compania from compania where temporal.nombre_compania=compania.nombre_compania),
'0.00' 
from temporal;

#delete from detalle_producto_compania;
#CARGANDO DE TEMPORAL HACIA DETALLE PRODUCTO
insert into detalle_producto_compania (id_det_comp_usr,nombre_producto,precio_producto,cantidad)
select (
select id_det_comp_usr 
from det_compania_usuario 
where id_usuario=(select id_usuario from usuario where usuario.nombre_usuario=temporal.nombre_c_p) 
and id_compania=(select id_compania from compania where compania.nombre_compania=temporal.nombre_compania)
),
nombre_producto,
precio_producto,
cantidad
from temporal;

#ESTO SE ACTUALIZA CON LOS PRECIOS FINALES, EJECUTAR AL FINAL DE LLENAR TODOS LOS DATOS
update det_compania_usuario 
set total =(select sum(precio_producto*cantidad) as Total 
from detalle_producto_compania where det_compania_usuario.id_det_comp_usr=detalle_producto_compania.id_det_comp_usr group by id_det_comp_usr);