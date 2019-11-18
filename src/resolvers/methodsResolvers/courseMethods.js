import Course from '../../models/course';
import { nameCapitalized } from '../../validators/validators';

/* 
    * En este archivo se encuentran los resolvers asociados a archivo 'student.graphql', por lo tanto las Querys y Mutations tienen que tener los mismos nombres las funciones definidas abajo.
    ? Algunas cosas a considerar:
    ? La funcion lean(), hace que solo se devuelvan los datos del objeto, ya que sino el objeto devuevo por mongoose tiene muchos mas campos. Asi con esta funcion el objeto pesa menos.
    ! Hay que aclarar que el uso de este metodo no deja modificar el objeto devuelto.
    ? Se utiliza async/await en todos los casos, por lo tanto para capturar los errores, utilizamos try/catch.
    ? En el metodo findByIdAndUpdate() se le pasa como parametro 'new: true', esto es para que la funcion devuelva el objeto actualizado, sino por defecto devuelve el objeto antes de actualizar.
    ? Ademas por defecto los validators estan desactivados en las Query de update, por lo tanto tenemos que pasar la opcion 'runValidators: true', en la Query.
    ? Se utilizan funciones importadas de validators.js en el cual se definen las funciones que se utilizan en varios archivos.
    ! Los metodos los puedes encontrar en la documentacion de mongoose -> https://mongoosejs.com/docs/queries.html.
    ! Antes de terminar, me gustaria aclarar que al crear esta API tuve en consideracion todas las validaciones, como por ejemplo si no se ingresa nada a la hora de hacer un update, esto podria realizarse en el FronEnd y evitar ese codigo en dicha funcion.
    * Por utlimo exportamos las funciones para utilizarlas en courseResolvers.js.
*/

const allCourses = async () => {
    try {
        return await Course.find().lean();
    } catch (error) {
        return error;
    }
}

const getCourse = async ( _, { _id } ) => {
    try {
        return await Course.findById( _id ).lean();
    } catch (error) {
        return error;
    }
}

const newCourse = async ( _, { input } ) => {
    try {
        input.name = nameCapitalized(input.name);
        const newCourse = new Course( input );
        return await newCourse.save();
    } catch (error) {
        return error;
    }
};

const updateCourse = async ( _, { _id, input } ) => {
    try {
        if (!input)
            return await Course.findById( _id).lean();
        else {
            input.name = nameCapitalized(input.name);
            return await Course.findByIdAndUpdate( _id, input, { new: true, runValidators: true } ).lean();
        }
    } catch (error) {
        return error;
    }
};

const deleteCourse = async ( _, { _id } ) => {
    try {
        return await Course.findByIdAndDelete( _id ).lean();
    } catch (error) {
        return error;
    }
}

module.exports = {

    allCourses,
    getCourse,
    newCourse,
    updateCourse,
    deleteCourse

}