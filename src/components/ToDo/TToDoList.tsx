import React, { useState, useEffect } from "react";
import "./ToDoList.css";
import trashImage from "/trash.circle.fill.png";
import plusImage from "/plus.circle.fill.png";

interface Todo {
  id: number;
  title: string;
  checked: boolean;
  details: TVShowDetails;
  editing: boolean;
}

interface TVShowDetails {
  seasons: number;
  releaseYear: number;
  notableActors: string;
  genre: string;
  streamingService: string;
}

const TTodoList: React.FC = () => {
  const [tvShows, setTvShows] = useState<Todo[]>([]);
  const [newTvShow, setNewTvShow] = useState<string>("");
  const backendServerUrl = "http://localhost:5000";

  useEffect(() => {
    fetch(`${backendServerUrl}/tv-shows`)
      .then((response) => response.json())
      .then((fetchedTvShows) => {
        setTvShows(fetchedTvShows);
      })
      .catch((error) => console.error("Error fetching TV shows:", error));
  }, []);

  const handleAddTvShow = () => {
    if (newTvShow.trim() !== "") {
      const newTvShowEntry: Todo = {
        id: Date.now(),
        title: newTvShow,
        checked: false,
        editing: false,
        details: {
          seasons: 0,
          releaseYear: 0,
          notableActors: "",
          genre: "",
          streamingService: "",
        },
      };

      fetch(`${backendServerUrl}/tv-shows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTvShowEntry),
      })
        .then((response) => response.json())
        .then((createdTvShow) => {
          setTvShows([...tvShows, createdTvShow]);
          setNewTvShow("");
          window.location.reload();
        })
        .catch((error) => console.error("Error creating new TV show :", error));
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTvShow();
    }
  };

  const handleDeleteTvShow = (id: number) => {
    fetch(`${backendServerUrl}/tv-shows/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const updatedTvShows = tvShows.filter((tvShow) => tvShow.id !== id);
          setTvShows(updatedTvShows);
        } else {
          console.error("Error deleting TV show:", response.status);
        }
        window.location.reload();
      })
      .catch((error) => console.error("Error deleting TV show:", error));
  };

  const handleToggleCheck = async (id: number) => {
    const updatedTvShows = tvShows.map((tvShow) =>
      tvShow.id === id
        ? { ...tvShow, checked: !tvShow.checked, editing: false }
        : tvShow
    );
    setTvShows(updatedTvShows);
    try {
      const response = await fetch(`${backendServerUrl}/tv-shows/${id}`);
      if (response.ok) {
        const fetchedDetails = await response.json();
        const updatedItems = updatedTvShows.map((tvShow) =>
          tvShow.id === id
            ? { ...tvShow, details: fetchedDetails, editing: false }
            : tvShow
        );
        setTvShows(updatedItems);
      } else {
        console.error("Error fetching TV show details:", response.status);
      }
    } catch (error) {
      console.error("Error fetching TV show details:", error);
    }
  };


  const handleDetailsChange = (
    id: number,
    field: keyof TVShowDetails,
    value: string
  ) => {
    const updatedItems = tvShows.map((tvShow) =>
      tvShow.id === id
        ? { ...tvShow, details: { ...tvShow.details, [field]: value } }
        : tvShow
    );
    setTvShows(updatedItems);

    if (!tvShows.find((tvShow) => tvShow.id === id)?.editing) {
      fetch(`${backendServerUrl}/tv-shows/${id}`, {
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
          setTvShows(updatedItems);
        })
        .catch((error) =>
          console.error("Error updating TV show details:", error)
        );
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
          onKeyDown={handleInputKeyDown}
        />
        <button className="add-tv-show-button" onClick={handleAddTvShow}>
          <img src={plusImage} alt="add tv show" style={{ width: "18px" }} />
        </button>
        <ul>
          {tvShows.map((tvShow) => (
            <li key={tvShow.id} className={tvShow.checked ? "checked" : ""}>
              {tvShow.title}
              <label className="tvshow-checkbox-label">
                <input
                  className="tvshow-checkbox sub-task-checkbox"
                  type="checkbox"
                  checked={tvShow.checked}
                  onChange={() => handleToggleCheck(tvShow.id)}
                />
                <span className="movie-detail-checkmark"></span>
              </label>
              <button
                className="delete-tv-show-button"
                onClick={() => handleDeleteTvShow(tvShow.id)}
              >
                <img src={trashImage} alt="delete" style={{ width: "18px" }} />
              </button>
              {tvShow.checked && tvShow.details && (
                <div className="subtask-panel">
                  <label>Seasons:</label>
                  <input
                    type="number"
                    value={tvShow.details.seasons}
                    onChange={(e) =>
                      handleDetailsChange(tvShow.id, "seasons", e.target.value)
                    }
                  />
                  <label>Release Year:</label>
                  <input
                    type="number"
                    value={tvShow.details.releaseYear}
                    onChange={(e) =>
                      handleDetailsChange(
                        tvShow.id,
                        "releaseYear",
                        e.target.value
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
                        e.target.value
                      )
                    }
                  />
                  <label>Genre:</label>
                  <input
                    type="text"
                    value={tvShow.details.genre}
                    onChange={(e) =>
                      handleDetailsChange(tvShow.id, "genre", e.target.value)
                    }
                  />
                  <label>Streaming service:</label>
                  <input
                    type="text"
                    value={tvShow.details.streamingService}
                    onChange={(e) =>
                      handleDetailsChange(
                        tvShow.id,
                        "streamingService",
                        e.target.value
                      )
                    }
                  />
                  <button
                    onClick={() => {
                      const updatedTvShows = tvShows.map((show) =>
                        show.id === tvShow.id
                          ? { ...show, editing: !show.editing }
                          : show
                      );
                      setTvShows(updatedTvShows);
                    }}
                  >
                    {tvShow.editing ? "Save" : "Edit"}
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

export default TTodoList;
