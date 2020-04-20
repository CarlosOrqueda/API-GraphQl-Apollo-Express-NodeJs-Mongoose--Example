import { Schema, model} from 'mongoose';

/*  
    * Este archivo se encargará de definir el schema de mongoose para los estudiantes.
    ? En este schema se pueden ver diferentes validaciones. Además de definir el type para cada campo, con la diferencia que el campo _id se crea automáticamente.
    ? Por ejemplo, el required, el cual obliga a recibir el valor.
    ? En el caso de 'note:', definimos una función la cual decide el valor del required, dependiendo si course existe o no.
    ? Si el campo es de type Number, se puede aplicar entre que rango se espera el valor, con max y min.
    ? Si el campo es de type String, se puede aplicar un lowecase, entre otros, este se encargara de aplicar un toLowerCase() antes de recibir el valor.
    ? Además, podemos 'setear' un valor por defecto si es que no se proporciona uno. En este caso se utiliza en el campo average.
    ! En el campo 'courses', el cual es un array de objetos ya que se puede anidar, tenemos 3 campos.
    ! 1. '_id', este campo lo pasamos en false para que no se cree más adelante, ya que al anidar mongoose crea por defecto un _id, que EN ESTE CASO NO ES NECESARIO, ya que le vamos a pasar más adelante al campo 'course' el _id correspondiente del objeto Course. Si no lo colocamos en false tendríamos dos campos con id.
    ? Podríamos asignar el campo _id del objeto Course al campo _id en este array, pero me pareció más claro llamarlo course para que sea más claro.
    ! 2. 'course', el cual es de type 'Schema.Types.ObjectId', esto quiere decir que le estamos asignando otro schema y le pasamos por referencia que schema queremos utilizar, en este caso 'Course', el mismo nombre que le pasamos a la función model().
    ? Mas adelante cuando recuperemos los datos de un estudiante, podremos utilizar el método populate(), el cual se va a encargar de rellenar el objeto Course correspondiente con sus datos definidos en su schema.
    ? Es decir tendremos el estudiante y en la parte de courses tendremos un array con los cursos, pero que contienen objetos que contienen, ya no solo el _id del objeto Course correspondiente, sino un objeto Course con el campo nombre, con su _id y la nota -> courses: [{course: {_id:,name:}note:}].
    ! Existe un módulo que nos evita llamar a la función populate(). Se llama 'mongoose-autopopulate', el cual necesita poca configuración y se aplica en el schema en el cual se especifica la ref, en este caso sería en este schema.
    ? Para más información vea la documentación: https://www.npmjs.com/package/mongoose-autopopulate.
    * Por último se exporta el schema para utilizarlos en las Querys.
*/

const newStudent = new Schema ({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, required: true, min: 16, max: 60},
    email: {
        type: String, 
        lowercase: true
    },
    average: {type: Number, required: true, default: 0},

    courses: [{
        _id: false,
        course: {type: Schema.Types.ObjectId, ref: 'Course'},
        note: {type: Number, required: function() {return this.course != null} }
    }]
})

module.exports = model ('Student', newStudent);