import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import { getAuthorsQuery } from "../queries/queries";
import { addBookMutation } from "../queries/queries";
import { getBookQuery } from "../queries/queries";

const AddBook = () => {
    const [authorId, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [name, setName] = useState('');

    const authorsData = useQuery(getAuthorsQuery);
    const [addBook, { data }] = useMutation(addBookMutation);

    const displayAuthor = () => {
        if(authorsData.loading) {
            return (<option disabled>Loading..</option>)
        } else if (authorsData.error) {
            return (<option disabled>Error</option>)
        } else if (authorsData.data) {
            return (
                <>
                    {
                        authorsData.data.authors.map((author) => (
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
        addBook({
            variables: {
                genre,
                name,
                authorId,
            },
            refetchQueries: [{ query: getBookQuery  }]
        });
        setAuthor('');
        setName('');
        setGenre('');
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
                    <option key="first-option">Select Author</option>
                    {displayAuthor()}
                </select>
            </div>
            <button type="submit">+</button>
        </form>
    );
};

export default AddBook;
