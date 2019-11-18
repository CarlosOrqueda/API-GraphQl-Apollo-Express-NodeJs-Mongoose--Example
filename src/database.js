import mongoose from 'mongoose';

/* 
    * Como vemos, en este archivo vamos a configurar la conexion a nuestra databases con mongoose, en este caso esta alojada localmente.
    * Si estuviese alojada en algun servicio en la nube, tendria que colocar la direccion en lugar del localhost.
    ? Como se ve, estoy pasando la direccion de la DB de mongodb sin crearla, esto se debe a que si no existe mongoose la crea, por lo tanto no deberia preocuparse por eso.
    ! Por lo mencionado anteriormente, si utliza este codigo sin modiicar nada, se creara una DB localmente con el nombre de 'api-graphql'.
    ? Las detalles de las configuraciones de a conexion, las que se pasan como segundo parametro, las puede encontrar en la documentacion correspondiente de mongoose -> https://mongoosejs.com/docs/deprecations.html, se relacionan con algunos metodos que se encuentran deprecados y que pronto dejaran de funcionar.
    * Por ultimo exportamos la funcion para poder utilizarla en index.js.
 */

const connect = () => {
    mongoose.connect('mongodb://localhost/api-graphql', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
}

module.exports = connect;