import React, { useState } from "react";
import "./Navbar.css";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notification_icon from "../../assets/notification.png";
import profile_icon from "../../assets/jack.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = ({ setSidebar }) => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (searchQuery.trim()) {
        navigate(`/search/${searchQuery}`);
      }
    }
  };

  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img
          className="menu-icon"
          onClick={() => setSidebar((prev) => !prev)}
          src={menu_icon}
          alt="Menu Icon"
        />
        <Link to="/">
          <img className="logo" src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <img src={search_icon} alt="Search Icon" onClick={handleSearch} />
        </div>
      </div>

      <div className="nav-right flex-div">
        <img src={upload_icon} alt="Upload Icon" />
        <img src={more_icon} alt="More Icon" />
        <img src={notification_icon} alt="Notification Icon" />
        <img src={profile_icon} className="user-icon" alt="User Icon" />

        <Link to="/contact">Contact Us</Link>

        {isAuthenticated ? (
          <button
            className="auth-button"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
        ) : (
          <button className="auth-button" onClick={() => loginWithRedirect()}>
            Log In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
