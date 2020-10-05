
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