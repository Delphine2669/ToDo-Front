import React, { useState, useEffect } from "react";
import "./ToDoList.css";
import trashImage from "/trash.circle.fill.png";
import plusImage from "/plus.circle.fill.png";
interface Todo {
  id: number;
  title: string;
  checked: boolean;
  details: MovieDetails;
  editing: boolean;
}

interface MovieDetails {
  releaseYear: number;
  notableActors: string;
  director: string;
  genre: string;
  streamingService: string;
}
const MTodoList: React.FC = () => {
  const [movies, setMovies] = useState<Todo[]>([]);
  const [newMovie, setNewMovie] = useState<string>("");
  const backendServerUrl = "http://localhost:5000";

  useEffect(() => {
    fetch(`${backendServerUrl}/movies`)
      .then((response) => response.json())
      .then((fetchedMovies) => {
        setMovies(fetchedMovies);
      })
      .catch((error) => console.error("Error fetching Movies:", error));
  }, []);

  const handleAddMovie = () => {
    if (newMovie.trim() !== "") {
      const newMovieEntry: Todo = {
        id: Date.now(),
        title: newMovie,
        checked: false,
        editing: false,
        details: {
          director: "",
          releaseYear: 0,
          notableActors: "",
          genre: "",
          streamingService: "",
        },
      };
      fetch(`${backendServerUrl}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovieEntry),
      })
        .then((response) => response.json())
        .then((createdMovie) => {
          setMovies([...movies, createdMovie]);
          setNewMovie("");
          window.location.reload();
        })
        .catch((error) =>
          console.error("Error creating new movie entry:", error)
        );
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddMovie();
    }
  };
  const handleDeleteMovie = (id: number) => {
    fetch(`${backendServerUrl}/movies/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const updatedMovies = movies.filter((movie) => movie.id !== id);
          setMovies(updatedMovies);
        } else {
          console.error("Error deleting movie:", response.status);
        }
        window.location.reload();
      })
      .catch((error) => console.error("Error deleting movie", error));
  };

  const handleToggleCheck = async (id: number) => {
    const updatedMovies = movies.map((movie) =>
      movie.id === id
        ? { ...movie, checked: !movie.checked, editing: false }
        : movie
    );
    setMovies(updatedMovies);
    try {
      const response = await fetch(`${backendServerUrl}/movies/${id}`);
      if (response.ok) {
        const fetchedDetails = await response.json();
        const updatedItems = updatedMovies.map((movie) =>
          movie.id === id
            ? { ...movie, details: fetchedDetails, editing: false }
            : movie
        );
        setMovies(updatedItems);
      } else {
        console.error("Error fetching movie details:", response.status);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const handleDetailsChange = (
    id: number,
    field: keyof MovieDetails,
    value: string
  ) => {
    const updatedItems = movies.map((movie) =>
      movie.id === id
        ? { ...movie, details: { ...movie.details, [field]: value } }
        : movie
    );
    setMovies(updatedItems);

    if (!movies.find((movie) => movie.id === id)?.editing) {
      fetch(`${backendServerUrl}/movies/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          field,
          value,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          setMovies(updatedItems);
        })
        .catch((error) =>
          console.error("Error updating movie details:", error)
        );
    }
  };

  return (
    <div className="to-do-list-block">
      <div className="movies-list">
        <h3>Movies to Watch ({movies.length})</h3>
        <input
          type="text"
          value={newMovie}
          onChange={(e) => setNewMovie(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
        <button className="add-movie-button" onClick={handleAddMovie}>
          <img src={plusImage} alt="add movie" style={{ width: "18px" }} />
        </button>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id} className={movie.checked ? "checked" : ""}>
              {movie.title}
              <label className="movie-checkbox-label">
                <input
                  className="sub-task-checkbox movie-checkbox"
                  type="checkbox"
                  checked={movie.checked}
                  onChange={() => handleToggleCheck(movie.id)}
                />
                <span className="movie-detail-checkmark"></span>
              </label>
              <button
                className="delete-movie-button"
                onClick={() => handleDeleteMovie(movie.id)}
              >
                <img src={trashImage} alt="delete" style={{ width: "18px" }} />
              </button>
              {movie.checked && movie.details && (
                <div className="subtask-panel">
                  <label>Director:</label>
                  <input
                    type="text"
                    value={movie.details.director}
                    onChange={(e) =>
                      handleDetailsChange(movie.id, "director", e.target.value)
                    }
                  />
                  <label>Release Year:</label>
                  <input
                    type="number"
                    value={movie.details.releaseYear}
                    onChange={(e) =>
                      handleDetailsChange(
                        movie.id,
                        "releaseYear",
                        e.target.value
                      )
                    }
                  />
                  <label>Notable Actors:</label>
                  <input
                    type="text"
                    value={movie.details.notableActors}
                    onChange={(e) =>
                      handleDetailsChange(
                        movie.id,
                        "notableActors",
                        e.target.value
                      )
                    }
                  />
                  <label>Genre:</label>
                  <input
                    type="text"
                    value={movie.details.genre}
                    onChange={(e) =>
                      handleDetailsChange(movie.id, "genre", e.target.value)
                    }
                  />
                  <button
                    onClick={() => {
                      const updatedMovies = movies.map((show) =>
                        show.id === movie.id
                          ? { ...show, editing: !show.editing }
                          : show
                      );
                      setMovies(updatedMovies);
                    }}
                  >
                    {movie.editing ? "Save" : "Edit"}
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default MTodoList;
