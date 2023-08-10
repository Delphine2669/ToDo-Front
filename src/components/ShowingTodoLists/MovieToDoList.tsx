// src/components/MovieList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      <h2>Movies to Watch</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.director}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
