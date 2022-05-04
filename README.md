# Delilah Resto
## Sistema de pedidos online para un restaurante montado en una REST API que permite realizar operaciones CRUD sobre una estructura de datos.

**1 - Instalación**

Clonar proyecto desde la consola:

*[git clone] (https://github.com/rociobodocco/delilah_resto.git)*

**2 - Instalación de dependencias**

*npm install*

**3 - Crear base de datos**

Importar el Archivo *delilah_resto_model_scheme_bd.sql* 
Recuerde editar el archivo *config\db.jss* con los datos de su entorno

**4 - Iniciar el servidor**

Abrir el archivo *server.js* desde VSC y ejecutar en terminal:

*npm run start*

**5 - Ya puedes utitlizar la app**

**6 - [Puedes ver algunos endpoints desde el siguiente link:] ()**

**7 Descarga el YAML**

**8 ENDPOINT**

**localhost:3000**

| Metodo | Enpoint | Body | Header | Descripción |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| POST | /register | {username,name,lastname,phone,adress,password,email,rol_id} | {token} | Crear usuario |
| POST | /login | {username,password} | {token} | Ingreso - Devuelve Token de Usuario |
| GET | /users |  | {token} | Admin - Devuelve todos los usuarios |
| GET | /users/:id |  | {token} | Admin - Devuelve 1 usuario buscado por id |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| GET | /products |  |  | Devuelve todos los productos |
| GET | /products/:id |  |  | Devuelve 1 producto buscado por id |
| POST | /products | {name,price,active,image} | {token} | Admin - Crear un nuevo producto |
| PUT | /products/:id | {name,price,active,image} | {token} | Admin - Actualizar/Modificar un producto |
| DELETE | /products/:id |  | {token} | Admin - Borrar un producto buscado por id |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| GET | /orders |  | {token} | Admin - Devuelve todas las ordenes |
| GET | /orders/:id |  | {token} | Admin - Devuelve 1 orden buscada por id |
| POST | /orders | {total_price,date,state,users_id,payoptions_id} |  | Crear una nueva orden |
| PUT | /orders/:id | {total_price,date,state,users_id,payoptions_id} | {token} | Admin - Actualizar/Modificar una orden buscada por id |
| DELETE | /orders/:id |  | {token} | Admin - Borrar una orden buscada por id |
| ------------- | ------------- | ------------- | ------------- | ------------- |

