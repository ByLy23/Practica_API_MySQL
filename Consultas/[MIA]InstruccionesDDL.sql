#SE CREA LA BASE DE DATOS
create database if not exists eje_de_mundo;
use eje_de_mundo;
#CREMOS LA TABLA TEMPORAL
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
#CREAMOS LAS CATEGORIAS
create table categoria (
id_categoria int primary key not null auto_increment,
nombre_categoria varchar(100)
);
#CREAMOS EL PRODUCTO
create table producto (
id_producto int primary key not null auto_increment,
id_categoria int not null,
nombre_producto varchar(100),
precio_producto decimal(8,2),
foreign key(id_categoria) references categoria(id_categoria) on update
cascade on delete cascade
);
#CREAMOS LA COMPANIA
create table compania(
id_compania int primary key not null auto_increment,
nombre_compania varchar(100),
nombre_contacto varchar(100),
correo_compania varchar(100),
telefono_compania varchar(100)
);
#CREAMOS LA REGION
create table region(
id_region int primary key not null auto_increment,
nombre_region varchar(50)
);
#CREAMOS LA CIUDAD
create table ciudad(
id_ciudad int primary key not null auto_increment,
id_region int,
nombre_ciudad varchar(50),
codigo_postal varchar(50),
foreign key (id_region) references region(id_region) on update
cascade on delete cascade
);
#CREAMOS LA DIRECCION
create table direccion(
id_direccion int primary key not null auto_increment,
id_ciudad int,
nombre_direccion varchar(100),
foreign key (id_ciudad) references ciudad(id_ciudad) on update
cascade on delete cascade
);
#CREAMOS EL TIPO DE USUARIO
create table tipo_usuario(
id_tipo_usuario int primary key not null auto_increment,
nombre_usuario varchar(50)
);
#CREAMOS EL USUARIO
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
#CREAMOS EL DETALLE USUARIO
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
#CREAMOS EL DETALLE PRODUCTO
create table detalle_producto_compania(
id_det_comp_usr int not null,
nombre_producto varchar(50),
precio_producto decimal(8,2),
cantidad int,
foreign key (id_det_comp_usr) references det_compania_usuario(id_det_comp_usr)on update
cascade on delete cascade
);