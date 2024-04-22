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
    <div className="flex flex-wrap gap-5 justify-between m-5">
      {deck.map((card) => {
        return (
          <div
            key={card._id}
            className="flex flex-col text-center border border-purple-400 rounded-md p-3"
          >
            <h2 className=" font-bold">
              {" "}
              <Link to={`/deck/${card._id}`}>{card.name}</Link>
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
