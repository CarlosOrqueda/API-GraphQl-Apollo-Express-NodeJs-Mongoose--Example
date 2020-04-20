import { allStudent,getStudent, newStudent, updateStudent, deleteStudent } from './methodsResolvers/studentMethods';

/* 
    * En este archivo vinculamos las funciones definidas en 'studentMethods', con las Querys y Mutations definidas en 'student.graphql'.
    ? Como se ve queda todo más limpio al modularizar, y más si las funciones definidas tienen el mismo nombre las Querys definidas en los resolvers como en el typeDef.
    ? Ya que en las últimas versiones de javascript si dos campos de un objeto tienen el mismo nombre, se puede colocar solamente el nombre.
    ? Es decir, allStudent: allStudent, es lo mismo que solo colocar allStudent.
    * Por último exportamos las funciones para usarlas en resolvers.js.
*/

module.exports = {

    Query: {
        allStudent,
        getStudent
    },
    Mutation: {
        newStudent,
        updateStudent,
        deleteStudent
    }

}