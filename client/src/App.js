import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from './Movies/UpdateForm'
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    // Added the if statement to prevent duplicate entries
    if (!savedList.includes(movie)) {
      console.log(savedList)
      setSavedList([...savedList, movie]);
    } else {
      console.log('nope')
    }
  };

  const removeFromSavedList = movie => {
    if (savedList.includes(movie)) {
      setSavedList([...savedList.delete(movie)])
    } else {
      console.log('Nope')
    }
  }

  useEffect(() => {
    getMovieList();
    
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} removeFromSavedList={removeFromSavedList} />
      </Route>
      <Route path={`/update-movie/:id`}
        render={props => (
          <UpdateForm {...props} movieList={movieList} updateMovieList={setMovieList}/>
        )}
      />
      <Route path={`/add-movie/`}
        render={props => (
          <UpdateForm {...props} movieList={movieList} updateMovieList={setMovieList}/>
        )}
      />
    </>
  );
};

export default App;
