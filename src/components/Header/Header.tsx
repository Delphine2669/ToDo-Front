import "./Header.css";
import { useEffect, useState } from "react";
import lightLogo from "../../assets/lightLogo.svg";
import darkLogo from "../../assets/darkLogo.svg";

const Header = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false); // State to track theme

  // Check user's color scheme preference and set the theme accordingly
  useEffect(() => {
    const prefersDarkTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkTheme(prefersDarkTheme);
  }, []);
  return (
    <header>
      <div className="logo-container">
        <img
          src={isDarkTheme ? darkLogo : lightLogo}
          alt="logo to-do list"
          className="logo-header"
        />
      </div>
    </header>
  );
};
export default Header;
