import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBookQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = () => {
    const [selected, setSelected] = useState(null);
    const { loading, error, data } = useQuery(getBookQuery);
    const displayBook = () => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        if (data) {
            return (
                <>
                {
                    data.books.map(({ name, id }) => (
                        <li
                            key={id}
                            onClick={(e) => setSelected(id)}
                        >
                            Name: {name}
                        </li>
                    ))
                }
                </>
            )
        }
    }

    return (
        <div>
            <ul id="book-list">
                {displayBook()}
            </ul>
            <BookDetails id={selected }/>
        </div>
    );

};

export default React.memo(BookList);
