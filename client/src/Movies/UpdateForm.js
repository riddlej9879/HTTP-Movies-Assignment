import React, { useState, useEffect } from "react";
import axios from "axios";

import './UpdateForm.styles.css'

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateForm = props => {
    const [movie, setMovie] = useState(initialMovie);

    useEffect(() => {
        const movieToUpdate = props.movieList.find(movie => {
            return `${movie.id}` === props.match.params.id;
        });

        if (movieToUpdate) {
            setMovie(movieToUpdate);
        }

        // axios
        //   .get(`/movies/${movieToUpdate.id}`)
        //   .then(res => console.log("Res: ", res))
        //   .catch(err => console.log("Err is: ", err));
    }, [props.movieList, props.match.params.id]);

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.value === 'metascore') {
            value = parseInt(value, 10);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => console.log('UpdateForm Results: ', res))
            .catch(err => console.log('UpdateForm Error: ', err))
    }
    console.log('UpdateForm.js: ', movie)

    return (
        // Needs a form built to accept data and push to server
        <div className='movie-form'>
            <h2>Update movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className=''
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="Title"
                    value={movie.title}
                />
                <input
                    className=''
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="Director"
                    value={movie.director}
                />
                <input
                    className=''
                    type="text"
                    pattern="[0-9]*"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="Metascore"
                    value={movie.metascore}
                />
                <input
                    className=''
                    type="text"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="Actor"
                    value={movie.stars[0]}
                />
                <input
                    className=''
                    type="text"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="Actor"
                    value={movie.stars[1]}
                />
                <input
                    className=''
                    type="text"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="Actor"
                    value={movie.stars[2]}
                />
                <button className='movie-button'>Update movie</button>
            </form>
        </div>
    )
}

export default UpdateForm
