import Course from '../../models/course';
import { nameCapitalized } from '../../validators/validators';

/* 
    * En este archivo se encuentran los resolvers asociados a archivo 'student.graphql', por lo tanto las Querys y Mutations tienen que tener los mismos nombres las funciones definidas abajo.
    ? Algunas cosas a considerar:
    ? La función lean(), hace que solo se devuelvan los datos del objeto, ya que sino el objeto devuelto por mongoose tendría más campos. Así con esta función el objeto pesa menos.
    ! Hay que aclarar que el uso de este método no deja modificar el objeto devuelto.
    ? Se utiliza async/await en todos los casos, por lo tanto, para capturar los errores, utilizamos try/catch.
    ? En el metodo findByIdAndUpdate() se le pasa como parámetro 'new: true', esto es para que la función devuelva el objeto actualizado, sino por defecto devuelve el objeto antes de actualizar.
    ? Además, por defecto los validators están desactivados en las Query de update, por lo tanto, tenemos que pasar la opción 'runValidators: true', en la Query.
    ? Se utilizan funciones importadas de validators.js en el cual se definen las funciones que se utilizan en varios archivos.
    ! Los métodos los puedes encontrar en la documentación de mongoose -> https://mongoosejs.com/docs/queries.html.
    ! Antes de terminar, me gustaría aclarar que al crear esta API tuve en consideración todas las validaciones, como por ejemplo si no se ingresa nada a la hora de hacer un update, esto podría realizarse en el FrontEnd y evitar ese código en dicha función.
    * Por ultimo exportamos las funciones para utilizarlas en courseResolvers.js.
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