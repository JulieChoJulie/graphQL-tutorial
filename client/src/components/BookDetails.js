import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBook } from "../queries/queries";

const BookDetails = ({ id }) => {
    const bookData = useQuery(getBook, {
            variables: { id },
    });
    const displayDetails = () => {
        if (bookData.loading) {
            return <p>Loading...</p>
        } else if (bookData.error) {
            return <p>Error..</p>
        } else if (bookData.data.book) {
            const book = bookData.data.book
            return (
                <>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by the author</p>
                    <ul className='other-books'>
                        {
                            book.author.books.map((book) => (
                                <li key={book.id}>
                                    {book.name}
                                </li>
                            ))
                        }
                    </ul>
                </>
            )
        } else {
            return <p>No Book Selected</p>
        }
    }

    return (
        <div id="book-details">
            {displayDetails()}
        </div>
    );
};

export default BookDetails;
