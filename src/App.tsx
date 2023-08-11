import MovieList from "./components/ShowingTodoLists/MovieToDoList";
import "./App.css";
import TTodoList from "./components/ToDo/TToDoList";
import MTodoList from "./components/ToDo/MToDoList";
import TvShowList from "./components/ShowingTodoLists/TvShowToDoList";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <div className="side-todo">
          <TTodoList />
          <MTodoList />
        </div>
        <div className="side-showing-db">
          <TvShowList />
          <MovieList />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
