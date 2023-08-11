// src/components/MovieList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Showing.css";

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [tvshows, setTvShows] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/movies").then((response) => {
      setMovies(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/tv-shows").then((response) => {
      setTvShows(response.data);
    });
  }, []);
  return (
    <div className="showing-movie-block">
      <h2 className="showing-title">Movie Watchlist</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h5>{movie.title}</h5>
            <p>{movie.director}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
