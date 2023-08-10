// src/components/MovieList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3600/movies").then((response) => {
      setMovies(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Movies to Watch</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
