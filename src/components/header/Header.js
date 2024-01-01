import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header({user}) {

  function handlelogout() {
    window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, "_self");
    // window.open("http://localhost:4000/auth/logout", "_self");
  }

  return (
    <div className="header">
      <div className="headerLogoContainer">
        <Link to={"/todo"} className="removeLinkCss headerIcon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </Link>

        <Link to={"/todo"} className="removeLinkCss headerIconText">
          Todo
        </Link>
      </div>
      {user ? (
        <button className="headerbutton" onClick={handlelogout}>
          Logout
        </button>
      ) : (
        <Link to={"/login"} className="removeLinkCss headerText">
          Login | SignUp
        </Link>
      )}
    </div>
  );
}

export default Header;
