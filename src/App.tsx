import MovieList from "./components/ShowingTodoLists/MovieToDoList";
import "./App.css";
import TTodoList from "./components/ToDo/TToDoList";
import MTodoList from "./components/ToDo/MToDoList";
import TvShowList from "./components/ShowingTodoLists/TvShowToDoList";

function App() {
  return (
    <>
      <div className="app-container">
        <div className="side-todo">
          <TTodoList />
          <MTodoList />
        </div>
        <div className="side-showing-db">
          <TvShowList />
          <MovieList />
        </div>
      </div>
    </>
  );
}

export default App;
