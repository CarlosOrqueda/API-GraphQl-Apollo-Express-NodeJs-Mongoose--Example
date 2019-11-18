import { Schema, model } from 'mongoose';

/*
    * Este archivo se encargara de definir el schema de mongoose para los cursos.
    ? Como se ve, se utilizan algunas configuraciones para validar los datos. Ademas de definir el type de cada campo, con la diferencia que el campo _id se crea automaticamente.
    ? Por ejemplo el required, el cual especifica que si o si se necesita recibir ese dato y enum, el cual recibe un array con las posible opciones que se aceptan.
    ! Tambien puede crear sus propias funciones para validar, se agregan con la funcion validate: { validator: function } la cual debe retornar un true o false para saber si 'pasa' la validacion. Mas informacion -> https://mongoosejs.com/docs/validation.html#custom-validators ir a custom validators.
    * Luego se usa la funcion model donde se pasa el nombre ,'Course' en este caso, y el schema.
    ? Con respecto al nombre se utiliza 'Course', pero en la database se crea una coleccion de 'courses'. Asi se define por convencion.
    * Por ultimo se exporta el schema para utilizarlos en las Querys.
 */

const coursesList = ['Algebra', 'Quimica', 'Fisica', 'Analisis Matematico'];

const newCourse = new Schema ({
    name: {
        type: String, 
        required: true,
        enum: coursesList
    }
})

module.exports = model ('Course', newCourse);