import Student from '../../models/student';
import { nameCapitalized, addAverage ,addCoursesId, updateCoursesId } from '../../validators/validators'

/* 
    * En este archivo se encuentran los resolvers asociados a archivo 'student.graphql', por lo tanto las Querys y Mutations tienen que tener los mismos nombres las funciones definidas abajo.
    ? Algunas cosas a considerar:
    ? Como mencionamos en los schemas de mongoose, la funcion populate() rellena con el objeto correspondiente, en este caso onjetos Course. Solo debemos pasarle el campo donde se encuentra la referencia al objeto. En este caso es 'course' que esta dentro de 'courses', por lo tanto se pasa asi -> courses.course.
    ? La funcion lean(), hace que solo se devuelvan los datos del objeto, ya que sino el objeto devuevo por mongoose tiene muchos mas campos. Asi con esta funcion el objeto pesa menos.
    ! Hay que aclarar que el uso de este metodo no deja modificar el objeto devuelto.
    ? Se utiliza async/await en todos los casos, por lo tanto para capturar los errores, utilizamos try/catch.
    ? En el metodo findByIdAndUpdate() se le pasa como parametro 'new: true', esto es para que la funcion devuelva el objeto actualizado, sino por defecto devuelve el objeto antes de actualizar.
    ? Ademas por defecto los validators estan desactivados en las Query de update, por lo tanto tenemos que pasar la opcion 'runValidators: true', en la Query.
    ? Se utilizan funciones importadas de validators.js en el cual se definen las funciones que se utilizan en varios archivos.
    ! Los metodos los puedes encontrar en la documentacion de mongoose -> https://mongoosejs.com/docs/queries.html.
    ! Antes de terminar, me gustaria aclarar que al crear esta API tuve en consideracion todas las validaciones, como por ejemplo si no se ingresa nada a la hora de hacer un update, esto podria realizarse en el FronEnd y evitar ese codigo en dicha funcion.
    * Por utlimo exportamos las funciones para utilizarlas en studentResolvers.js.
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