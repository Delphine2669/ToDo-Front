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
            <table>
              <th>
                <td>Title:</td>
              </th>
              <td>
                <h5>{movie.title}</h5>
              </td>
              <tr>
                <td>
                  <p>genre:</p>
                </td>
                <td>
                  <p>{movie.genre}</p>
                </td>
              </tr>
              <tr>
                <td>Year:</td>
                <td>
                  <p>{movie.releaseYear}</p>
                </td>
              </tr>
              <tr>
                <td>Actors:</td>
                <td>
                  <p>{movie.notableActors}</p>
                </td>
              </tr>
              <tr>
                <td>Streaming platform:</td>
                <td>
                  <p>{movie.streamingService}</p>
                </td>
              </tr>
              <tr>
                <td>director:</td>
                <td>
                  <p>{movie.director}</p>
                </td>
              </tr>
            </table>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
