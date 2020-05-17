import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import MovieCard from "./MovieCard";
// import UpdateForm from "./UpdateForm";

function Movie({ addToSavedList, removeFromSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    // console.log(movie)
    addToSavedList(movie);
  };

  const removeMovie = () => {
    // console.log(movie)
    removeFromSavedList(movie)
  }

  useEffect(() => {
    console.log('Movie.js params: ', params)
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <Link to={`/update-movie/${params.id}`}>
        <button className='update-button' type='button'>Update</button>
      </Link>
      <div className="delete-button" onClick={removeMovie} >
        Remove
      </div>
    </div >
  );
}

export default Movie;
