import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Showing.css";

const TvShowList: React.FC = () => {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/tv-shows").then((response) => {
      setTvShows(response.data);
    });
  }, []);
  return (
    <div className="showing-tvshow-block">
      <h2 className="showing-title">Tv Shows Watchlist</h2>
      <ul>
        {tvShows.map((tvShows) => (
          <li key={tvShows.id}>
            <h5>{tvShows.title}</h5>
            <p>{tvShows.notableActors}</p>
            <p>{tvShows.seasons}</p>
            <p>{tvShows.genre}</p>
            <p>{tvShows.releaseYear}</p>
            <p>{tvShows.streamingService}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TvShowList;
