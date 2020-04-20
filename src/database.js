import mongoose from 'mongoose';
import colors from 'colors';

const autoIndex = process.env.NODE_ENV !== 'production';

/* 
    * Como vemos, en este archivo vamos a configurar la conexión a nuestra base de datos con mongoose, en este caso esta alojada localmente.
    * Si estuviese alojada en algún servicio en la nube, tendría que colocar la dirección en lugar del localhost.
    ? Como se ve, estoy pasando la dirección de la DB de mongodb sin crearla, esto se debe a que si no existe mongoose la crea, por lo tanto, no debería preocuparse por eso.
    ! Por lo mencionado anteriormente, si utiliza este código sin modificar nada, se creará una DB localmente con el nombre de 'api-graphql'.
    ? Los detalles de las configuraciones de a conexión, las que se pasan como segundo parámetro, las puede encontrar en la documentación correspondiente de mongoose -> https://mongoosejs.com/docs/deprecations.html, se relacionan con algunos métodos que se encuentran deprecados y que pronto dejaran de funcionar.
    ! También quería señalar el uso de variables del sistema para el manejo de datos que queramos que estén más seguro, ya que estas variables solo son visibles por el SO. Se pueden usar para la dirección de la base de datos, como en este caso, o también para key de otra API, asignación de puertos, etc.
    * Por último exportamos la función para poder utilizarla en index.js.
 */

async function connect () {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            autoIndex
        })
        console.log(colors.bgCyan('>>> DB is connected'));
    } catch (e) {
        console.log(colors.bgRed(e));
    }
}

module.exports = connect();