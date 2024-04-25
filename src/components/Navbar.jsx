import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../context/UseAuthentication";
function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <nav className="flex flex-row justify-between px-5 py-5 bg-purple-400 text-white font-bold">
      <h1>
        <Link className="hover:text-purple-800" to={"/"}>
          Rider-A-Waite
        </Link>
      </h1>
      <ul className="flex flex-row gap-4">
        <li>
          <Link to={"/deck"} className="hover:text-purple-800">
            Deck
          </Link>
        </li>
        <li>
          <Link to={"/readings"} className="hover:text-purple-800">
            Shuffle{" "}
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <div className=" mx-10 flex flex-row gap-5">
              <li>
                <Link to={"/myreadings"} className="hover:text-purple-800">
                  My Readings
                </Link>
              </li>
              <li>
                <button onClick={logout} className="hover:text-purple-800">
                  Logout
                </button>
              </li>
            </div>
          </>
        ) : (
          <>
            <div className="mx-10 flex flex-row gap-5">
              <li>
                <Link to={"/signup"} className="hover:text-purple-800">
                  Signup
                </Link>
              </li>
              <li>
                <Link to={"/login"} className="hover:text-purple-800">
                  Login
                </Link>
              </li>
            </div>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
