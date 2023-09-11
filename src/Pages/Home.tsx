import "../App.css";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
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
        <Footer />
      </div>
    </>
  );
}
export default Home;
