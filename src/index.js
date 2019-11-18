import app from './server';
import database from './database';
import colors from 'colors';

/* 
    * En este archivo importamos el servidor y la database y la utilizamos en una funcion anonima con sync/await -> un video recomendado sobre el tema https://www.youtube.com/watch?v=Q3HtXuDEy5s
    ? Asi como 'seteamos' el 'port' en la configuracion del server, se puede llamar a dicha configuracion con app.get(...) y dentro colocamos el nombre que le dimos a la conficuracion.
    ? Esoy utilizando el modulo colors para poder colorear la salida en la consola, asi puedo ver con mas claridad las cosas, como los errores. Esto es optativo.
    ! Para que realizar una auto llamada de la funcion envueve la misma en parentesis y luego se coloca otros al final -> (function)().
 */

(async () => {
    try {
        await app.listen(app.get('port'));
        console.log(colors.bgGreen(`Server on port ${app.get('port')}`));
        await database();
        console.log(colors.bgCyan('>>> DB is connected'));
    } catch (e) {
        console.log(colors.bgRed(e));
    }
})();