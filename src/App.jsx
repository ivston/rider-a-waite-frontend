import { Routes, Route } from "react-router-dom";
/* Pages */
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DeckPage from "./pages/DeckPage";
import OneCardPage from "./pages/OneCardPage";
/* Re-Routing */
import IsLoggedOut from "./routing/IsLoggedOut";
/* Components */
import Navbar from "./components/Navbar";

// import { createContext, useState } from "react";
// import useAuth from "./context/UseAuthentication";

// export const SimpleContext = createContext();

function App() {
  // const [state, setState] = useState("Some data right there!");
  // const add = (a, b) => a + b;
  // const { user } = useAuth();
  return (
    <>
      {/* <SimpleContext.Provider> */}
      {/* value={
        {
          data: "toto",
          state,
          setState,
          add,
          someClass: "beautiful",
        }
      } */}
      {/* > */}
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<IsLoggedOut />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route path="/deck" element={<DeckPage />} />
        <Route path="/deck/:cardId" element={<OneCardPage />} />
      </Routes>
      {/* </SimpleContext.Provider> */}
    </>
  );
}

export default App;
