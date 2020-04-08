import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBookQuery } from "../queries/queries";

const BookList = () => {
    const { loading, error, data } = useQuery(getBookQuery);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <ul id="book-list">
                {
                    data.books.map(({ name, id }) => (
                        <li>Name: {name}</li>
                    ))
                }
            </ul>
        </div>
    );
};

export default BookList;
