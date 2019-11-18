import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

/* 
    * En este archivo unimos todos los typeDef que tenemos, la opcion all: true, se utiliza para cuando encuentre defniciones con el mismo nombre, una todas.
    ? Todo esto gracias al modulo 'merge-graphql-schemas'.
*/

const typesArray = fileLoader(__dirname);

module.exports = mergeTypes(typesArray, {all: true});