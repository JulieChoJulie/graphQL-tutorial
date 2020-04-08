import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getAuthorsQuery } from "../queries/queries";

const AddBook = () => {
    const [authorId, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [name, setName] = useState('');

    const { loading, error, data } = useQuery(getAuthorsQuery);
    const displayAuthor = () => {
        if(loading) {
            return (<option disabled>Loading..</option>)
        } else if (error) {
            return (<option disabled>Error</option>)
        } else if (data) {
            return (
                <>
                    {
                        data.authors.map((author) => (
                            <option
                                key={author.id}
                                value={author.id}
                            >
                                {author.name}
                            </option>
                        ))
                    }
                </>
            )
        }
    };

    const submitForm = e => {
        e.preventDefault();
        console.log({
            authorId,
            genre,
            name
        })
    };

    return (
        <form id="add-book" onSubmit={submitForm}>
            <div className="field">
                <label>Book name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="field">
                <label>Book genre:</label>
                <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                />
            </div>
            <div className="field">
                <label>Author</label>
                <select onChange={(e) => setAuthor(e.target.value)}>
                    <option>Select Author</option>
                    {displayAuthor()}
                </select>
            </div>
            <button type="submit">+</button>
        </form>
    );
};

export default AddBook;
