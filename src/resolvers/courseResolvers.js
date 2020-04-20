import { allCourses, getCourse, newCourse, updateCourse, deleteCourse } from './methodsResolvers/courseMethods';

/* 
    * En este archivo vinculamos las funciones definidas en 'courseMethods', con las Querys y Mutations definidas en 'course.graphql'.
    ? Como se ve queda todo más limpio al modularizar, y más si las funciones definidas tienen el mismo nombre las Querys definidas en los resolvers como en el typeDef.
    ? Ya que en las últimas versiones de javascript si dos campos de un objeto tienen el mismo nombre, se puede colocar solamente el nombre.
    ? Es decir, allCourses: allCourses, es lo mismo que solo colocar allCourses.
    * Por último exportamos las funciones para usarlas en resolvers.js.
*/

module.exports = {

    Query: {
        allCourses,
        getCourse
    },
    Mutation: {
        newCourse,
        updateCourse,
        deleteCourse
    }
    
}