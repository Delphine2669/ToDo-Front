import React, { useState, useEffect } from "react";
import "./ToDoList.css";
import trashImage from "/trash.circle.fill.png";
import plusImage from "/plus.circle.fill.png";
interface Todo {
  id: number;
  title: string;
  checked: boolean;
  details: TVShowDetails | MovieDetails;
}
interface TVShowDetails {
  seasons: number;
  releaseYear: number;
  notableActors: string;
  genre: string;
  streamingService: string;
}
interface MovieDetails {
  releaseYear: number;
  notableActors: string;
  director: string;
  genre: string;
  streamingService: string;
}
const TTodoList: React.FC = () => {
  const [movies, setMovies] = useState<Todo[]>([]);
  const [tvShows, setTvShows] = useState<Todo[]>([]);
  const [newMovie, setNewMovie] = useState<string>("");
  const [newTvShow, setNewTvShow] = useState<string>("");

  const handleAddMovie = () => {
    if (newMovie.trim() !== "") {
      setMovies([
        ...movies,
        {
          id: Date.now(),
          title: newMovie,
          checked: false,
          details: {
            director: "",
            releaseYear: 0,
            notableActors: "",
            genre: "",
            streamingService: "",
          },
        },
      ]);
      setNewMovie("");
    }
  };

  const handleAddTvShow = () => {
    if (newTvShow.trim() !== "") {
      setTvShows([
        ...tvShows,
        {
          id: Date.now(),
          title: newTvShow,
          checked: false,
          details: {
            seasons: 0,
            releaseYear: 0,
            notableActors: "",
            genre: "",
            streamingService: "",
          },
        },
      ]);
      setNewTvShow("");
    }
  };

  const handleDeleteItem = (id: number, isMovie: boolean) => {
    if (isMovie) {
      const updatedMovies = movies.filter((movie) => movie.id !== id);
      setMovies(updatedMovies);
    } else {
      const updatedTvShows = tvShows.filter((tvShow) => tvShow.id !== id);
      setTvShows(updatedTvShows);
    }
  };

  const handleToggleCheck = (id: number, isMovie: boolean) => {
    if (isMovie) {
      const updatedMovies = movies.map((movie) =>
        movie.id === id ? { ...movie, checked: !movie.checked } : movie
      );
      setMovies(updatedMovies);
    } else {
      const updatedTvShows = tvShows.map((tvShow) =>
        tvShow.id === id ? { ...tvShow, checked: !tvShow.checked } : tvShow
      );
      setTvShows(updatedTvShows);
    }
  };
  const handleKeyDownM = (
    event: React.KeyboardEvent<HTMLInputElement>,
    isMovie: boolean
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (isMovie) {
        handleAddMovie();
      }
    }
  };
  const handleKeyDownT = (
    event: React.KeyboardEvent<HTMLInputElement>,
    isTvShow: boolean
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (isTvShow) {
        handleAddTvShow();
      }
    }
  };
  useEffect(() => {
    fetch("/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));

    fetch("/tv-shows")
      .then((response) => response.json())
      .then((data) => setTvShows(data))
      .catch((error) => console.error("Error fetching TV shows:", error));
  }, []);
  const handleDetailsChange = (
    id: number,
    field: keyof TVShowDetails,
    value: string,
    isMovie: boolean
  ) => {
    const updatedItems = isMovie
      ? movies.map((movie) =>
          movie.id === id
            ? { ...movie, details: { ...movie.details, [field]: value } }
            : movie
        )
      : tvShows.map((tvShow) =>
          tvShow.id === id
            ? { ...tvShow, details: { ...tvShow.details, [field]: value } }
            : tvShow
        );

    if (isMovie) {
      setMovies(updatedItems);
    } else {
      setTvShows(updatedItems);
    }
  };

  return (
    <div className="to-do-list-block">
      <div className="tv-shows-list">
        <h3>TV Shows to Watch ({tvShows.length})</h3>
        <input
          type="text"
          value={newTvShow}
          onChange={(e) => setNewTvShow(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTvShow();
            }
          }}
        />
        <button className="add-tv-show-button" onClick={handleAddTvShow}>
          <img src={plusImage} alt="add tv show" style={{ width: "18px" }} />
        </button>
        <ul>
          {tvShows.map((tvShow) => (
            <li key={tvShow.id} className={tvShow.checked ? "checked" : ""}>
              {tvShow.title}
              <input
                className="tvshow-checkbox sub-task-checkbox"
                type="checkbox"
                checked={tvShow.checked}
                onChange={() => handleToggleCheck(tvShow.id, false)}
              />
              <button
                className="delete-tv-show-button"
                onClick={() => handleDeleteItem(tvShow.id, false)}
              >
                <img src={trashImage} alt="delete" style={{ width: "18px" }} />
              </button>
              {tvShow.checked && (
                <div className="subtask-panel">
                  <label>Seasons:</label>
                  <input
                    type="text"
                    value={tvShow.details.seasons}
                    onChange={(e) =>
                      handleDetailsChange(
                        tvShow.id,
                        "seasons",
                        e.target.value,
                        false
                      )
                    }
                  />
                  <label>Release Year:</label>
                  <input
                    type="text"
                    value={tvShow.details.releaseYear}
                    onChange={(e) =>
                      handleDetailsChange(
                        tvShow.id,
                        "releaseYear",
                        e.target.value,
                        false
                      )
                    }
                  />
                  <label>Notable Actors:</label>
                  <input
                    type="text"
                    value={tvShow.details.notableActors}
                    onChange={(e) =>
                      handleDetailsChange(
                        tvShow.id,
                        "notableActors",
                        e.target.value,
                        false
                      )
                    }
                  />
                  <label>Genre:</label>
                  <input
                    type="text"
                    value={tvShow.details.genre}
                    onChange={(e) =>
                      handleDetailsChange(
                        tvShow.id,
                        "genre",
                        e.target.value,
                        false
                      )
                    }
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TTodoList;
