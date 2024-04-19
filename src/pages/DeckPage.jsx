import tarotApi from "../service/myApi";
import Loader from "./../components/Loader";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function DeckPage() {
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    fetchDeck();
  }, []);

  async function fetchDeck() {
    try {
      const { data } = await tarotApi.get("/cards");
      setDeck(data);
    } catch (error) {
      console.log(error);
    }
  }

  if (!deck) return <Loader />;
  return (
    <div>
      {deck.map((card) => {
        return (
          <div key={card._id} className="game-card">
            <h2>
              {" "}
              <Link to={`/boardgames/${card._id}`}>{card.name}</Link>
            </h2>
            <div className="img-wrapper">
              <img src={card.image.upright} alt={`${card.name} card upright`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DeckPage;
