import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs/typeDefs';
import resolvers from './resolvers/resolvers';
/* 
   * Este archivo se va a encargar de la inicialización y configuración del servidor.
    * Como notara está dividido en 3 partes.
    
    ! Initialization:
        * Se inicializa express y se guarda en una constante app, tal como está en la documentación.
        * Luego se hace lo mismo con ApolloServer.

    ! Settings:
        * En esta parte se setea la configuración del servidor.
        * Por ejemplo un motor de plantillas seteando su app.engine('ejs', engine), luego app.set('view engine') y luego configurando la dirección de la carpeta views donde se alojan las plantillas con app.set('views', path.join(__dirname, 'views')).
        ? Notara que para determinar la dirección use path, bueno eso es un modulo que viene con nodejs, para utilizarlo solo lo tiene que importar con import path from 'path'.
        ? Esto se utiliza ya que en los diversos SO que existen, para determinar una dirección se utiliza '/' o '\' según el SO.
        * En este caso seteamos el puerto del servidor, utilizando la variable port para llamar a dicha configuración.
        ? process.env.PORT se utiliza para que primero se fije si hay algún puerto especificado en la variable de entorno, si no lo hay utiliza el 4000.
        ? Esto sirve para cuando se sube el proyecto a algún servicio en la nube, en el cual existe una variable de entorno del puerto.

    ! Middlewares:
        * Los middlewares son usados como 'filtro' antes de que se llegue al endpoint o rutas, en este caso '/graphql'.
        * En ejemplos con REST API veras que son configurados usasndo app.use..., uno de los middlewares más comunes es multer para la carga de imágenes.
        ? En este ejemplo se utilizó el módulo 'apollo-sever-express' para integrarlo con express, ya que tengo pensado usar más middlewares en el futuro.
        ? En el caso de no utilizar ningún middleware más que Apollo podríamos utilizar el módulo 'apollo-server', en vez de la integración con express -> esto esta especificado en la documentación de Apollo, más específicamente:
        ? utilizando solo apollo: https://www.apollographql.com/docs/apollo-server/migration-two-dot/#stand-alone
        ? utilizando más middlewares: https://www.apollographql.com/docs/apollo-server/migration-two-dot/#adding-additional-middleware-to-apollo-server-2
        ? Por esta razón 'app' como parámetro en applyMiddleware(), ya que estaríamos pasando la instancia de express con sus middlewares aplicados. Por eso es importante aplicarlos antes de pasarlos en la función.
        * Antes que nada 2 aclaraciones:
        ! Si estuviese trabajando con una REST API los middlewares siempre tienen que ir antes de las rutas.
        ! También puede crear sus propios middlewares.

    * Por último exportamos la configuración del servidor para utilizarla en el archivo index.js.
 */

// * Initialization

const app = express();  
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// * Settings

app.set('port', process.env.PORT);

// * Middleware

server.applyMiddleware({
    app,
    path: '/graphql'
});

module.exports = app;