import { Routes, Route } from "react-router-dom";
/* Pages */
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DeckPage from "./pages/DeckPage";
import OneCardPage from "./pages/OneCardPage";
import MyReadingsPage from "./pages/MyReadingsPage";
/* Re-Routing */
import IsLoggedOut from "./routing/IsLoggedOut";
/* Components */
import Navbar from "./components/Navbar";
import ReadingsPage from "./pages/ReadingsPage";

function App() {
  return (
    <div className=" font-montserrat">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<IsLoggedOut />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route path="/deck" element={<DeckPage />} />
        <Route path="/deck/:cardId" element={<OneCardPage />} />
        <Route path="/readings" element={<ReadingsPage />} />
        <Route path="/myreadings" element={<MyReadingsPage />} />
      </Routes>
    </div>
  );
}

export default App;
