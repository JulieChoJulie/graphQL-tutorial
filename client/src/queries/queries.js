import { gql } from 'apollo-boost';

export const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    }
`;

export const getBookQuery = gql`
    {
        books{
            name
            id
        }
    }
`;

export const addBookMutation = gql`
    mutation AddBook($genre: String!, $name: String!, $authorId: ID!) {
        addBook(genre: $genre, name: $name, authorId: $authorId){
            name,
            id,
        } 
    }
`;

export const getBook = gql`
    query($id: ID){
        book(id: $id){
            name,
            id,
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        } 
    }
`;
