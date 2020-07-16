import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentDidUpdate(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => this.setState({ movie: res.data }))
      .catch((err) => console.log("fetchMovie(id) get error", err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then((res) => {
        console.log("Movie.js axios delete", res);
        this.props.history.push("/");
      })
      .catch((err) => console.log("deleteMovie() delete error", err.response));
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save Movie
        </div>
        <div className="delete-button" onClick={this.deleteMovie}>
          Delete Movie
        </div>
        {/* - Add a button in the movie component that routes you to your new route with the movies's id as the URL param */}
        <div
          className="update-button"
          onClick={() =>
            this.props.history.push(`/update-movie/${this.state.movie.id}`)
          }
        >
          Update Movie
        </div>
      </div>
    );
  }
}
