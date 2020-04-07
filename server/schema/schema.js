const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,
    GraphQLID
} = graphql;

//  dummy data
const books = [
    {name: 'book1', id: '1', genre: 'fantasy', authorId: "1"},
    {name: 'book2', id: '2', genre: 'novel', authorId: "2"},
    {name: 'book3', id: '3', genre: 'Sci-Fi', authorId: "3"},
    {name: 'book4', id: '4', genre: 'Sci-Fi', authorId: "1"},
    {name: 'book5', id: '5', genre: 'Sci-Fi', authorId: "2"},
    {name: 'book6', id: '6', genre: 'Sci-Fi', authorId: "2"},
];

const authors = [
    {name: 'Julie C', id: '1', age: 28},
    {name: 'Simon K', id: '2', age: 30},
    {name: 'Jane S', id: '3', age: 26},
];

const BookType = new GraphQLObjectType({
   name: 'Book',
   fields: () => ({
       id: { type: GraphQLID },
       name: { type: GraphQLString },
       genre: { type: GraphQLString },
       author: {
           type: AuthorType,
           resolve(parent, arg){
               return _.find(authors, { id: parent.authorId })
           }
       }
   })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, arg) {
                return _.filter(books, { authorId: parent.id})
            }
        }
    })
});

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                return _.find(books, { id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return _.find(authors, { id: args.id })
            }
        },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve(parents, args) {
                return authors;
            }
        }

    }
});

module.exports = new GraphQLSchema({
    query: rootQuery
});
