import MovieList from "./components/MovieToDoList";
import "./App.css";
import TodoList from "./components/ToDoList";
import TvShowList from "./components/TvShowToDoList";

function App() {
  return (
    <>
      <div>
        <MovieList />
        <TvShowList />
        <TodoList />
      </div>
    </>
  );
}

export default App;
