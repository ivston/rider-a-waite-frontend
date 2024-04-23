import tarotApi from "../service/myApi";
import { Navigate } from "react-router-dom";
import Loader from "./../components/Loader";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import { useHistory } from "react-router-dom"; // Import useHistory hook

function DeckPage() {
  const [deck, setDeck] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  //const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    fetchDeck();
  }, []);

  async function fetchDeck() {
    try {
      const { data } = await tarotApi.get("/cards", {
        params: { name: searchTerm }, // Pass search term as a query parameter
      });
      setDeck(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term state
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDeck(); // Fetch deck based on the new search term
  };

  if (!deck) return <Loader />;
  return (
    <div>
      {/* Search input */}
      <form onSubmit={handleSearchSubmit} className="mb-5">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search cards..."
          className="rounded-md p-2 border border-purple-400"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-purple-500 text-white rounded-md"
        >
          Search
        </button>
      </form>
      {/* Deck cards */}
      <div className="flex flex-wrap gap-5 justify-between m-5">
        {deck.map((card) => {
          return (
            <div
              key={card._id}
              className="flex flex-col text-center text-purple-800 border-4 border-purple-400 rounded-md p-3 w-60"
              onClick={Navigate}
            >
              <h2 className=" font-bold">
                {" "}
                <Link to={`/deck/${card._id}`}>{card.name}</Link>
              </h2>
              <div className="img-wrapper">
                <img
                  src={card.image.upright}
                  alt={`${card.name} card upright`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DeckPage;
