import React, { Component } from "react";
import axios from "axios";

class AddMovie extends Component {
  state = {
    title: "",
    director: "",
    metaScore: 0,
    actor: "",
    stars: [],
  };

  addStars = () => {
    const { stars } = this.state;
    stars.push(this.state.actor);
    this.setState({ actor: "", stars });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitMovie = () => {
    const { stars, title, metaScore, director } = this.state;
    const newMovie = { stars, title, metaScore, director };
    const saveMovie = axios
      .post("http://localhost:3333/api/movies", newMovie)
      .then((response) => this.props.history.push("/"))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleChange}
          name="title"
        />
        <input
          type="text"
          placeholder="Director"
          value={this.state.director}
          onChange={this.handleChange}
          name="director"
        />
        <input
          type="text"
          placeholder="Metascore"
          value={this.state.metaScore}
          onChange={this.handleChange}
          name="metaScore"
        />
        <input
          type="text"
          placeholder="Actor"
          value={this.state.actor}
          onChange={this.handleChange}
          name="actor"
        />
        <button onClick={this.addStars}>Add Actor to List</button>
        <button onClick={this.submitMovie}>Save Movie</button>
        {this.state.stars.map((actor) => {
          return <div>{actor}</div>;
        })}
      </div>
    );
  }
}

export default AddMovie;
