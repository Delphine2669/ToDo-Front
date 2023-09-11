import { useEffect, useState } from "react";
import axios from "axios";
import "./Showing.css";

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  return (
    <div className="showing-movie-block">
      <h1 className="showing-title">Movie Watchlist</h1>
      <div className="table-container">
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <h4>{movie.title}</h4>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h6>genre:</h6>
                    </td>
                    <td>
                      <h5>{movie.genre}</h5>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h6>Year:</h6>
                    </td>
                    <td>
                      <h5>{movie.releaseYear}</h5>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h6>Actors:</h6>
                    </td>
                    <td>
                      <h5>{movie.notableActors}</h5>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h6>Streaming platform:</h6>
                    </td>
                    <td>
                      <h5>{movie.streamingService}</h5>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h6>director:</h6>
                    </td>
                    <td>
                      <h5>{movie.director}</h5>
                    </td>
                  </tr>
                </tbody>
              </table>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieList;
