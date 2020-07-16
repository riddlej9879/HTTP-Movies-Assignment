import React, { useState, useEffect } from "react";

const initialValue = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateMovie = (props) => {
  const [movie, setMovie] = useState(initialValue);

  useEffect(() => {
    const movieToEdit = props.movies.find((movie) => {
      return `${movie.id}` === props.match.params.id;
    });
    if (movieToEdit) {
      setMovie(movieToEdit);
    }
  }, [props.movies, props.match.params.id]);

  const handleChange = (event) => {
    setMovie({ ...movie, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h1>Update Movies!</h1>
      <form>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          value={movie.title}
        />
        <input
          type="text"
          name="director"
          onChange={handleChange}
          placeholder="Director"
          value={movie.director}
        />
        <input
          type="text"
          name="metascore"
          onChange={handleChange}
          placeholder="Metascore"
          value={movie.metascore}
        />
        <input
          type="text"
          name="stars"
          onChange={handleChange}
          placeholder="Stars"
          value={movie.stars}
        />
        <button onClick={(event) => props.editMovie(event, movie)}>
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
