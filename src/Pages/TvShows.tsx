import TTodoList from "../components/ToDo/TToDoList";
import TvShowList from "../components/ShowingTodoLists/TvShowToDoList";
function TvShows() {
  return (
    <div className="tv-shows-container">
      <div className="homepage-back-link">
        <a href="/">back to homepage</a>
      </div>
      <TTodoList />
      <TvShowList />
    </div>
  );
}
export default TvShows;
