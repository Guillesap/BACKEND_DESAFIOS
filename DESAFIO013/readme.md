
# DESAFIO 13

A fin de iniciar el servidor, ingresar el siguiente comando:  npm run start

Se visualizará un formulario de login, previo ingresar a Boton Registro, registrar a fin de ingresar nombre de usuario, contraseña y mail.
Luego regresa a formulario login, solicitando mail y contraseña, a fin de ingresar  a la pantalla central del  sitio VHS PELÍCULAS, figurando  un centro de mensajes, para consultar por tu película favorita.


## CLUSTER / FORK
A fin de iniciar servidor en modo cluster o fork usar:
```sh
nodemon server.js [NUMERO DE PUERTO] [CLUSTER, FORK]
```
## FOREVER
```sh
forever server.js [NUMERO DE PUERTO] [CLUSTER, FORK]
```
## PM2 (CLUSTER)
```sh
pm2 start server.js --name="Server2" --watch -i max -- [PUERTO]
```
## PM2 (FORK)

```sh
pm2 start server.js --name="Server2" --watch -- [PUERTO]
```
