import express from 'express'
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs/typeDefs';
import resolvers from './resolvers/resolvers';
/* 
    * Este archivo se va a encargar de la inicializacion y configuracion del servidor.
    * Como notara esta dividido en 3 partes.
    
    ! Inizialization:
        * Se inicializa express y se guarda en una constante app, tal como esta en la documentacion.
        * Luego se hace lo mismo con ApolloServer.

    ! Settings:
        * En esta parte se setea la configuracion del servidor.
        * Por ejemplo un motor de plantillas seteando su app.engine('ejs', engine), luego app.set('view engine') y luego configurando la direccion de la carpeta views donde se alojan las plantillas con app.set('views', path.join(__dirname, 'views')).
        ? Notara que para determinar la direccion use path, bueno eso es un modulo que viene con nodejs, para utiliazarlo solo lo tiene que importar con import path from 'path'.
        ? esto se utiliza ya que que en los diversos SO que existen, para determinar una direccion se utiliza '/' o '\' segun el SO.
        * En este caso seteamos el puerto del servidor, utilizando la variable port para llamar a dicha configuracion.
        ? process.env.PORT se utiliza para que primero se fije si hay algun puerto especificado en la variable de entorno, si no lo hay utiliza el 4000.
        ? esto sirve para cuando sube el proyecto a algun servicio de la nube, ellos en su servidores tienen configurado un puerto en la variable del entorno.

    ! Middlewares:
        * Los middlewares son usados como 'filtro' antes de que se llegue al endpoint o rutas, en este caso '/graphql'.
        * En ejemplos con REST API veras que son configurados usasndo app.use..., uno de los middlewares mas comunes es multer para la carga de imagenes.
        ? En este ejemplo se utilizo el modulo 'apollo-sever-express' para integrarlo con express, ya que tengo pensado usar mas middlewares en el futuro.
        ? En el caso de no utilizar ningun middleware mas que Apollo podriamos utilizar el modulo 'apollo-server', en vez de la integracion con express -> esto esta especificado en la documentacion de Apollo, mas especificamente:
        ? utlizando solo apollo: https://www.apollographql.com/docs/apollo-server/migration-two-dot/#stand-alone
        ? utilizando mas middlewares: https://www.apollographql.com/docs/apollo-server/migration-two-dot/#adding-additional-middleware-to-apollo-server-2
        ? Por esta razon 'app' como parametro en applyMiddleware(), ya que estariamos pasando la instancia de express con sus middlewares aplicados. Por eso es importante aplicarlos antes de pasarlos en la funcion.
        * Antes que nada 2 aclaraciones:
        ! Si estuviese trabajando con una REST API los middlewares siempre tienen que ir antes de las rutas.
        ! Tambien puede craer sus propios middlewares pero tendria.

    * Por ultimo exportamos la configuracion del servidor para utilizarla en el archivo index.js.
 */

// * Initialization

const app = express();  
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// * Settings

app.set('port', process.env.PORT || 4000);

// * Middleware

server.applyMiddleware({
    app,
    path: '/graphql'
});

module.exports = app;