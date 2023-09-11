import MTodoList from "../components/ToDo/MToDoList";
import MovieList from "../components/ShowingTodoLists/MovieToDoList";
function Movies() {
  return (
    <div className="movies-container">
      <div className="homepage-back-link">
        <a href="/">back to homepage</a>
      </div>
      <MTodoList />
      <MovieList />
    </div>
  );
}
export default Movies;
