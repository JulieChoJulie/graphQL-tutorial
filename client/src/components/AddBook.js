import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getAuthorsQuery } from "../queries/queries";

const AddBook = () => {
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

    return (
        <div id="add-book">
            <div className="field">
                <label>Book name:</label>
                <input type="text"/>
            </div>
            <div className="field">
                <label>Book genre:</label>
                <input type="text"/>
            </div>
            <div className="field">
                <label>Author</label>
                <select>
                    <option>Select Author</option>
                    {displayAuthor()}
                </select>
            </div>
        </div>
    );
};

export default AddBook;
