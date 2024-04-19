import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../context/UseAuthentication";
function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <nav className="flex flex-row justify-between px-5 bg-purple-400">
      <h1>
        <Link to={"/"}>Rider-A-Waite</Link>
      </h1>
      <ul className="flex flex-row gap-4">
        <li>
          <Link to={"/deck"}>Deck</Link>
        </li>
        <li>
          <Link to={"/readings"}>Get Reading</Link>
        </li>
        {isLoggedIn ? (
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to={"/signup"}>Signup</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
