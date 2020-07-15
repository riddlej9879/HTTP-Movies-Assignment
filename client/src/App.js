import React, { useState, useEffect } from "react";
import { Route, withRouter } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from "axios";

import UpdateMovie from "./Movies/UpdateMovie";

const App = (props) => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(
        (res) =>
          console.log("Get Response App", res.data) || setMovies(res.data)
      )
      .catch((err) => console.log("Get Error App", err.response));
  }, []);

  const editMovie = (event, movie) => {
    event.preventDefault();
    console.log("Edit Movie", movie);
    const updatedList = movies.map((mv) => {
      if (mv.id === movie.id) {
        return movie;
      } else {
        return mv;
      }
    });
    setMovies(updatedList);
    props.history.push("/");
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route
        exact
        path="/"
        render={(props) => <MovieList {...props} movies={movies} />}
      />
      <Route
        path="/update-movie/:id"
        render={(props) => (
          <UpdateMovie {...props} movies={movies} editMovie={editMovie} />
        )}
      />

      <Route
        path="/movies/:id"
        render={(props) => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
    </>
  );
};

export default withRouter(App);
