import "./Header.css";
import logo from "/logo-light.svg";
const Header = () => {
  return (
    <header>
      <div className="logo-container">
        <img src={logo} alt="logo to-do list" className="logo-header" />
        <h2 className="header-title">Keep track of your watchlist</h2>
      </div>
    </header>
  );
};
export default Header;
