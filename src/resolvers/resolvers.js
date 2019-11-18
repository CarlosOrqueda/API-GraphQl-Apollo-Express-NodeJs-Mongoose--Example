import { fileLoader, mergeResolvers } from 'merge-graphql-schemas';

/*  
    * En este archivo unimos todos los resolvers que tenemos, la opcion all: true, se utiliza para cuando encuentre defniciones con el mismo nombre, una todas.
    ? Todo esto gracias al modulo 'merge-graphql-schemas'.
*/

const resolversArray = fileLoader(__dirname);

module.exports = mergeResolvers(resolversArray, { all: true });