import React from "react";
import useAuthentication from "../context/UseAuthentication";
import { Navigate, Outlet } from "react-router-dom";

function IsLoggedOut() {
  const { isLoggedIn, isLoading } = useAuthentication();

  if (isLoading) {
    return <p>Loadingggg</p>;
  }

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
}

export default IsLoggedOut;
