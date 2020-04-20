import app from './server';
import './database';
import colors from 'colors';

/* 
    * En este archivo importamos el servidor y la base de datos y la utilizamos en una función anónima con sync/await -> un video recomendado sobre el tema https://www.youtube.com/watch?v=Q3HtXuDEy5s
    ? Así como 'seteamos' el 'port' en la configuración del server, se puede llamar a dicha configuración con app.get(...) y dentro colocamos el nombre que le dimos a la configuración.
    ? Estoy utilizando el módulo colors para poder colorear la salida en la consola, así puedo ver con más claridad las cosas, como los errores. Esto es optativo.
    ! Para que realizar una auto llamada de la función envuelve la misma en paréntesis y luego se coloca otros al final -> (function)().
 */

(async () => {
    try {
        await app.listen(app.get('port'));
        console.log(colors.bgGreen(`Server on port ${app.get('port')}`));
    } catch (e) {
        console.log(colors.bgRed(e));
    }
})();