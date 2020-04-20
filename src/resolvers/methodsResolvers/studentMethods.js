import Student from '../../models/student';
import { nameCapitalized, addAverage ,addCoursesId, updateCoursesId } from '../../validators/validators'

/* 
    * En este archivo se encuentran los resolvers asociados a archivo 'student.graphql', por lo tanto las Querys y Mutations tienen que tener los mismos nombres las funciones definidas abajo.
    ? Algunas cosas a considerar:
    ? Como mencionamos en los schemas de mongoose, la funcion populate() rellena con el objeto correspondiente, en este caso onjetos Course. Solo debemos pasarle el campo donde se encuentra la referencia al objeto. En este caso es 'course' que está dentro de 'courses', por lo tanto se pasa así -> courses.course.
    ? La función lean(), hace que solo se devuelvan los datos del objeto, ya que sino el objeto devuelto por mongoose tendría  más campos. Así con esta función el objeto pesa menos.
    ! Hay que aclarar que el uso de este método no deja modificar el objeto devuelto.
    ? Se utiliza async/await en todos los casos, por lo tanto, para capturar los errores, utilizamos try/catch.
    ? En el método findByIdAndUpdate() se le pasa como parámetro 'new: true', esto es para que la función devuelva el objeto actualizado, sino por defecto devuelve el objeto antes de actualizar.
    ? Además, por defecto los validators están desactivados en las Query de update, por lo tanto, tenemos que pasar la opción 'runValidators: true', en la Query.
    ? Se utilizan funciones importadas de validators.js en el cual se definen las funciones que se utilizan en varios archivos.
    ! Los métodos los puedes encontrar en la documentación de mongoose -> https://mongoosejs.com/docs/queries.html.
    ! Antes de terminar, me gustaría aclarar que al crear esta API tuve en consideración todas las validaciones, como por ejemplo si no se ingresa nada a la hora de hacer un update, esto podría realizarse en el FronEnd y evitar ese código en dicha función.
    * Por último exportamos las funciones para utilizarlas en studentResolvers.js.
*/

const allStudent = async () => {
    try {
        return await Student.find().populate('courses.course').lean();
    } catch (error) {
        return error;
    }
}

const getStudent = async (_, { _id }) => {
    try {
        return await Student.findById(_id).populate('courses.course').lean();
    } catch (error) {
        return error;
    }
}

const newStudent = async (_, { input, course }) => {
    try {
        input.firstName = nameCapitalized(input.firstName);
        input.lastName = nameCapitalized(input.lastName);
        const newStudent = new Student ( input );
        if (course) {
            await addCoursesId(course, newStudent);
            addAverage(newStudent);
        }
        console.log(newStudent)
        return await newStudent.save();
    } catch (error) {
        return error;
    }
};

const updateStudent = async (_, { _id, input, course }) => {
    try {
        if (!input && !course)
            return await Student.findById( _id).lean();
        else {
            if(input) {
                if (input.firstName)
                    input.firstName = nameCapitalized(input.firstName);
                if (input.lastName)
                    input.lastName = nameCapitalized(input.lastName);
            } else{
                input = {};
            }
            if (course) {
                await updateCoursesId(_id, course, input);
                addAverage(input);
            }
            return await Student.findByIdAndUpdate( _id, input, { new: true, runValidators: true }).lean();
        }
    } catch (error) {
        return error;
    }
};

const deleteStudent = async (_, { _id }) => {
    try {
        return await Student.findByIdAndDelete(_id).lean();
    } catch (error) {
        return error;
    }
};

module.exports = {

    allStudent,
    getStudent,
    newStudent,
    updateStudent,
    deleteStudent

}