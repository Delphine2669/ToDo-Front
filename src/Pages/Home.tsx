import "../App.css";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import MTodoList from "../components/ToDo/MToDoList";
import TTodoList from "../components/ToDo/TToDoList";
function Home() {
  return (
    <>
      <div className="app-container">
        <Header />
        <div className="navbar">
          <Link to="/movies" className="movie-link">
            movies
          </Link>
          <Link to="/tv-shows" className="tv-show-link">
            tv-shows
          </Link>
        </div>
        <div className="to-do-display">
          <MTodoList />
          <TTodoList />
        </div>
        <Footer />
      </div>
    </>
  );
}
export default Home;
