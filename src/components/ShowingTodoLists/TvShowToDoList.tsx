import React, { useEffect, useState } from "react";
import axios from "axios";

const TvShowList: React.FC = () => {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/tv-shows").then((response) => {
      setTvShows(response.data);
    });
  }, []);
  return (
    <div>
      <h2>Tv Shows to Watch</h2>
      <ul>
        {tvShows.map((tvShows) => (
          <li key={tvShows.id}>
            <h3>{tvShows.title}</h3>
            <p>{tvShows.seasons}</p>
            <p>{tvShows.genre}</p>
            <p>{tvShows.releaseYear}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TvShowList;
