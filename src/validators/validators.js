import Student from '../models/student';
import Course from '../models/course';

/* 
    * En este archivo definimos todas las funciones que se utilizaran en varios lugares.
    ? Algunas cosas a considerar:
    ? El segundo parámetro que se le pasa a la funciones find...(), es el campo que queremos utilizar, dando como resultado que la búsqueda solo devuelve dicho campo.
    * Por último exportamos las funciones para que se puedan usar en cualquier lugar.
*/

const nameCapitalized = (...names) => {
    let nameComplete = '';
    names.forEach( name => {
        let namesArray = name.split(" ");
        namesArray.forEach(singleName => {
            singleName = singleName.charAt(0).toUpperCase() + singleName.slice(1);
            nameComplete === '' ? nameComplete = singleName : nameComplete += ` ${singleName}`;
        })
    })
    return nameComplete;
}

const addAverage = newStudent => {
    let average = 0;
    newStudent.courses.forEach( courseName => {
        average += courseName.note;
    })
    average = average / newStudent.courses.length;
    newStudent.average = average;
}

const addCoursesId = async (coursesNames, newStudent) => {
    try {
        for (const courseName of coursesNames) {
            let addCourse = await Course.findOne( {name: nameCapitalized(courseName.name)}, '_id');
            let newData = {
                course: addCourse._id,
                note: courseName.note
            };
            newStudent.courses.push( newData );
        }
    } catch (error) {
        return error;
    }
}

const updateCoursesId = async (_id, coursesNames, input) => {
    try {
        const updateStudent = await Student.findById(_id, 'courses');
        let courses = updateStudent.courses;
        for (const courseName of coursesNames) {
            let addCourse = await Course.findOne( {name: nameCapitalized(courseName.name)}, '_id');
            let newData = {
                course: addCourse._id,
                note: courseName.note
            };
            courses.push( newData );
        input.courses = courses;
        }
    } catch (error) {
        return error;
    }
}

module.exports = {

    nameCapitalized,
    addAverage,
    addCoursesId,
    updateCoursesId
    
}