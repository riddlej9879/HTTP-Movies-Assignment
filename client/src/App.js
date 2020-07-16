import React, { useState, useEffect } from "react";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import AddMovie from "./Movies/AddMovie";

const App = (props) => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.log("useEffect() get error", err.response));
  }, [movies]);

  const editMovie = (e, movie) => {
    e.preventDefault();
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
          return (
            <Movie
              {...props}
              addToSavedList={addToSavedList}
              setMovies={setMovies}
            />
          );
        }}
      />

      <Route path="/add-movie/" component={AddMovie} />
    </>
  );
};

export default withRouter(App);
