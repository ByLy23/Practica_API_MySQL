create database if not exists eje_de_mundo;
use eje_de_mundo;

create table temporal (nombre_compania varchar(50),
contacto_compania varchar(50),
correo_compania varchar(100),
telefono_compania varchar(50),
tipo char, 
nombre_c_p varchar(50),
correo_c_p varchar(100),
telefono_c_p varchar(50),
fecha_registro_c_p varchar(20),
direccion_c_p varchar(50),
ciudad_c_p varchar(50),
codigo_postal_c_p varchar(10),
region_c_p varchar(20),
nombre_producto varchar(50),
categoria_producto varchar(50),
cantidad int, 
precio_producto decimal(8,2));


create table categoria (
id_categoria int primary key not null auto_increment,
nombre_categoria varchar(100)
);
create table producto (
id_producto int primary key not null auto_increment,
id_categoria int not null,
nombre_producto varchar(100),
precio_producto decimal(8,2),
foreign key(id_categoria) references categoria(id_categoria) on update
cascade on delete cascade
);
create table compania(
id_compania int primary key not null auto_increment,
nombre_compania varchar(100),
nombre_contacto varchar(100),
correo_compania varchar(100),
telefono_compania varchar(100)
);
create table region(
id_region int primary key not null auto_increment,
nombre_region varchar(50)
);
create table ciudad(
id_ciudad int primary key not null auto_increment,
id_region int,
nombre_ciudad varchar(50),
codigo_postal varchar(50),
foreign key (id_region) references region(id_region) on update
cascade on delete cascade
);
create table direccion(
id_direccion int primary key not null auto_increment,
id_ciudad int,
nombre_direccion varchar(100),
foreign key (id_ciudad) references ciudad(id_ciudad) on update
cascade on delete cascade
);
create table tipo_usuario(
id_tipo_usuario int primary key not null auto_increment,
nombre_usuario varchar(50)
);

create table usuario (
id_usuario int primary key not null auto_increment,
id_tipo_usuario int,
id_direccion int,
nombre_usuario varchar(100),
correo_usuario varchar(100),
telefono_usuario varchar(30),
fecha_ingreso varchar(30),
foreign key (id_tipo_usuario) references tipo_usuario(id_tipo_usuario) on update
cascade on delete cascade,
foreign key (id_direccion) references direccion(id_direccion) on update
cascade on delete cascade
);
create table det_compania_usuario(
id_det_comp_usr int primary key not null auto_increment,
id_usuario int,
id_compania int,
total decimal (8,2),
foreign key (id_usuario) references usuario(id_usuario) on update
cascade on delete cascade,
foreign key (id_compania) references compania(id_compania) on update
cascade on delete cascade
);
create table detalle_producto_compania(
id_det_comp_usr int not null,
nombre_producto varchar(50),
precio_producto decimal(8,2),
cantidad int,
foreign key (id_det_comp_usr) references det_compania_usuario(id_det_comp_usr)on update
cascade on delete cascade
);

insert into tipo_usuario (nombre_usuario) values ('C');

insert into tipo_usuario (nombre_usuario) values ('P');

insert into categoria (nombre_categoria) select distinct categoria_producto from temporal;

insert into producto (id_categoria,nombre_producto,precio_producto) 
select distinct (select id_categoria from categoria where temporal.categoria_producto= categoria.nombre_categoria), nombre_producto, precio_producto 
from temporal;

insert into region (nombre_region) select distinct region_c_p from temporal;

insert into ciudad (id_region,nombre_ciudad,codigo_postal) 
select distinct (select id_region from region 
where temporal.region_c_p= region.nombre_region),ciudad_c_p,codigo_postal_c_p from temporal;

insert into direccion(id_ciudad,nombre_direccion) 
select distinct (select id_ciudad from ciudad 
where temporal.ciudad_c_p=ciudad.nombre_ciudad 
and temporal.codigo_postal_c_p=ciudad.codigo_postal),direccion_c_p from temporal;

insert into compania (nombre_compania, nombre_contacto, correo_compania, telefono_compania) 
select distinct nombre_compania, contacto_compania, correo_compania,telefono_compania 
from temporal;

insert into usuario (id_tipo_usuario,id_direccion,nombre_usuario,correo_usuario,telefono_usuario,fecha_ingreso) 
select distinct 
(select id_tipo_usuario from tipo_usuario where temporal.tipo=tipo_usuario.nombre_usuario),
(select id_direccion from direccion where temporal.direccion_c_p=direccion.nombre_direccion),
nombre_c_p,
correo_c_p,
telefono_c_p,
fecha_registro_c_p
from temporal;

insert into det_compania_usuario (id_usuario,id_compania, total) 
select distinct (
select id_usuario from usuario where temporal.nombre_c_p=usuario.nombre_usuario),
(select id_compania from compania where temporal.nombre_compania=compania.nombre_compania),
'0.00' 
from temporal;

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

update det_compania_usuario 
set total =(select sum(precio_producto*cantidad) as Total 
from detalle_producto_compania where det_compania_usuario.id_det_comp_usr=detalle_producto_compania.id_det_comp_usr group by id_det_comp_usr);



load data infile '/var/lib/mysql-files/DataCenterData.csv'
into table eje_de_mundo.temporal fields terminated by ';'
lines terminated by '\n' ignore 1 lines;


#ACA VAN A IR LAS CONSULTAS DE LA PRACTICA
#1 Mostrar el nombre del proveedor, número de teléfono, número de orden,total de la orden por la cual se haya pagado la mayor cantidad de dinero.

select  usr.nombre_usuario,usr.telefono_usuario,dcu.id_det_comp_usr as "Numero de Orden",dcu.total
from det_compania_usuario dcu
join usuario usr
on usr.id_usuario=dcu.id_usuario
join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario
where tip.nombre_usuario='P'
order by total desc limit 1;

#2 Mostrar el número de cliente, nombre, apellido y total del cliente que más productos ha comprado.

select usr.id_usuario,usr.nombre_usuario,dcu.total,dpc.id_det_comp_usr,count(dpc.id_det_comp_usr) as Cantidad_Comprada
from detalle_producto_compania  dpc
join det_compania_usuario dcu
on (dcu.id_det_comp_usr= dpc.id_det_comp_usr)
join usuario usr
on (dcu.id_usuario=usr.id_usuario)
join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario
where tip.nombre_usuario='C'
group by dpc.id_det_comp_usr 
order by Cantidad_Comprada desc limit 1;

#3 Mostrar la dirección, región, ciudad y código postal hacia la cual se han hecho más solicitudes de pedidos y a cuál menos (en una sola consulta).

(select rg.nombre_region as REGION,cd.nombre_ciudad as CIUDAD,dir.nombre_direccion as DIRECCION,count(usr.id_direccion) as Pedidos from det_compania_usuario dcu 
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
group by dir.id_direccion order by Pedidoz asc limit 1);

#4 Mostrar el número de cliente, nombre, apellido, el número de órdenes que ha realizado y el total de cada uno de los cinco clientes que más han comprado productos de la categoría ‘Cheese’.

select usr.id_usuario,usr.nombre_usuario,sum(total)as Total,count(dcu.id_det_comp_usr) as Ordenes 
from det_compania_usuario dcu 
join detalle_producto_compania dpc
on dcu.id_det_comp_usr=dpc.id_det_comp_usr and dpc.nombre_producto in (select nombre_producto from producto join categoria on producto.id_categoria=categoria.id_categoria where categoria.nombre_categoria='Cheese')
join usuario usr
on (usr.id_usuario=dcu.id_usuario)
join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario
where dcu.id_usuario=usr.id_usuario and tip.nombre_usuario='C' group by usr.id_usuario order by Ordenes desc limit 5;

#5 Mostrar el número de mes de la fecha de registro, nombre y apellido de todos los clientes que más han comprado y los que menos han comprado (en dinero) utilizando una sola consulta.

(select count(dcu.id_usuario) as Solicitud,usr.nombre_usuario,usr.fecha_ingreso 
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
group by dcu.id_usuario order by Solicitud desc limit 4); 

#6 Mostrar el nombre de la categoría más y menos vendida y el total vendido en dinero (en una sola consulta).

(select cat.nombre_categoria, sum(pr.precio_producto) as Total,count(pr.id_categoria) as categoriaVendida
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
group by cat.id_categoria order by categoriaVendida asc limit 1);

#7 Mostrar el top 5 de proveedores que más productos han vendido (en dinero) de la categoría de productos ‘Fresh Vegetables’.

select dcu.id_usuario,usr.nombre_usuario,usr.correo_usuario,usr.telefono_usuario,count(dcu.id_usuario) as Pedidos, sum(dpc.precio_producto) as TOTAL from det_compania_usuario dcu 
join usuario usr on dcu.id_usuario=usr.id_usuario 
join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario
join detalle_producto_compania dpc on dcu.id_det_comp_usr=dpc.id_det_comp_usr
join producto pr on pr.nombre_producto=dpc.nombre_producto
join categoria cat on pr.id_categoria=cat.id_categoria
where tip.nombre_usuario='P' and cat.nombre_categoria='Fresh Vegetables'
group by dcu.id_usuario order by TOTAL desc limit 5;

#8 Mostrar la dirección, región, ciudad y código postal de los clientes que más han comprado y de los que menos (en dinero) en una sola consulta.

(select dir.nombre_direccion as DIRECCION,cd.nombre_ciudad AS CIUDAD,cd.codigo_postal AS COD_POSTAL,reg.nombre_region AS REGION,usr.nombre_usuario AS USUARIO,sum(dcu.total) as Total from det_compania_usuario dcu 
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
group by dcu.id_usuario  order by Total asc limit 3);

#9 Mostrar el nombre del proveedor, número de teléfono, número de orden, total de la orden por la cual se haya obtenido la menor cantidad de producto.

select usr.nombre_usuario AS PROVEEDOR,usr.telefono_usuario AS TELEFONO,dcu.id_det_comp_usr as NUMERO_ORDEN,dcu.total AS TOTAL,sum(dpc.cantidad) as Cantidad_Comprada from det_compania_usuario dcu 
join usuario usr on dcu.id_usuario=usr.id_usuario 
join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario
join detalle_producto_compania dpc on dcu.id_det_comp_usr=dpc.id_det_comp_usr
where tip.nombre_usuario='P'
group by dcu.id_det_comp_usr order by Cantidad_Comprada asc limit 12;

#10 Mostrar el top 10 de los clientes que más productos han comprado de la categoría ‘Seafood’.

select usr.nombre_usuario,usr.correo_usuario,usr.telefono_usuario,sum(pr.precio_producto) as Total,sum(dpc.cantidad) as Cantidad_Comprada from det_compania_usuario dcu
join usuario usr on dcu.id_usuario=usr.id_usuario
join tipo_usuario tip on usr.id_tipo_usuario=tip.id_tipo_usuario
join detalle_producto_compania dpc on dcu.id_det_comp_usr=dpc.id_det_comp_usr
join producto pr on dpc.nombre_producto=pr.nombre_producto
join categoria cat on pr.id_categoria=cat.id_categoria
where cat.nombre_categoria='Seafood' and tip.nombre_usuario='C'
group by dcu.id_usuario order by Cantidad_Comprada desc limit 10;


#ELIMINAR DE MODELO
delete from tipo_usuario;
delete from usuario;
delete from compania;
delete from categoria;
delete from producto;
delete from direccion;
delete from ciudad;
delete from region;
delete from det_compania_usuario;
delete from detalle_producto_compania;
#INSERTAR A MODELO
select * from tipo_usuario;
select * from det_compania_usuario;
select * from detalle_producto_compania;
select * from usuario;
select * from compania;
select * from categoria;
select * from producto;
select * from ciudad;
select * from region;
select * from direccion;