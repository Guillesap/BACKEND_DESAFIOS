# PRIMERA ENTREGA PROYECTO VHS VENTA DE PELICULAS

Con el siguiente comando: npm run start,  se inicia el servidor en el puerto 8080: http://www.localhost:8080/

Se visualiza un formulario de almacenamiento de peliculas, en el cual se puede incorporar: Titulo de película, precio, stock, codigo e ingresar una imagen de archivo de la portada de la película en cuestión.


## Peliculas
- `/api/productos` GET: Devuelve todas las películas
- `/api/productos/:idProduct` GET: Devuelve una película según su id. 
- `/api/productos` POST: Recibe y agrega una película y lo devuelve con su id asignando (Solo para admins). Campos requeridos: title, price, thubnail (archivo de portada), description, code y stock
- `/api/productos/:idProduct` PUT: Recibe y actualiza una película según su id (Solo para admins).
- `/api/productos/:idProduct` DELETE: Elimina una película según su id (Solo para admins).

### Cart
- `/api/carrito` POST: Crea un carrito y lo guarda en el servidor. Campos requeridos: products (array con ids de películas a agregar).
- `/api/carrito/:idCart/productos` POST: Agrega películas a un carrito existente. Campos requeridos: products (array con ids de películas a agregar).
- `/api/carrito/:idCart/productos` GET: Obtiene los datos de un carrito específico por ID.
- `/api/carrito/:idCart` DELETE: Vacia y elimina un carrito del servidor.
- `/api/carrito/:idCart/productos/:idProduct` DELETE: Elimina un producto específico de un carrito en particular.

### Login
- `/login` POST: Inicia sesión como administrador (por ahora solo cambia un booleano de forma temporal), y redirecciona al index.
- `/logout` GET: Cierra Sesión como administrador.

### Vistas
- `/`: Index, muestra las películas disponibles, permite ir a carrito, iniciar sesión, agregar una película al carrito, y si somos administradores editar o eliminar una película.
- `/agregar.html`: Formulario para agregar una película  (Solo para admins).
- `/edit.html?id=:idProduct`: Formulario de edición de una película (Solo para admins).
- `/carrito.html`: Muestra las películas agregados a un carrito (si existen) y te permite vaciar el carrito completo, o eliminar una película en particular 


