import useAuth from "../context/UseAuthentication";
import tarotApi from "../service/myApi";
import Loader from "./../components/Loader";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function OneCardPage() {
  const [card, setCard] = useState(null);
  const [note, setNote] = useState(null);
  const { cardId } = useParams();
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    fetchCard();
  }, []);

  async function fetchCard() {
    try {
      const { data } = await tarotApi.get("/cards/" + cardId);
      setCard(data.oneCard);
      if (isLoggedIn) {
        const userNote = user.notes.find((note) => note.card_id === cardId);
        setNote(userNote);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleNoteSubmit(e) {
    e.preventDefault();
    try {
      const noteToSend = { card_id: cardId, content: note };
      if (note) {
        // Edit note if already exists
        await tarotApi.post(`authentication/notes/`, noteToSend);
      } else {
        // Add new note if doesn't exist
        await tarotApi.post(`authentication/notes/`, noteToSend);
      }
      // Refetch card and notes after adding/editing note
      fetchCard();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteNote() {
    try {
      if (note) {
        await tarotApi.delete(`authentication/notes/${cardId}`);
        // Refetch card and notes after deleting note
        fetchCard();
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!card) return <Loader />;
  return (
    <>
      <div className="flex flex-col pt-10 w-full">
        <div className="flex flex-row mb-10 gap-10 justify-around items-center border-purple-400 rounded-lg p-5">
          <div className="w-1/2">
            <h1 className="font-bold text-purple-800 text-2xl mb-10">
              {card.name}
            </h1>
            <p className="text-md leading-8">{card.description}</p>
          </div>
          <div className="w-1/3">
            <img
              className=" border-2 border-purple-400 rounded-lg p-5"
              src={card.image.upright}
              alt="card image"
            />
          </div>
        </div>
        <div className="interpretations flex gap-10 justify-between mb-10 mx-10">
          <div className="w-1/2 border border-purple-400 rounded-lg p-5">
            <h1 className="font-bold text-purple-800 mb-3">
              Upright interpretation
            </h1>
            <p className="text-justify">{card.interpretation.upright}</p>
          </div>
          <div className="w-1/2 border border-purple-400 rounded-lg p-5">
            <h1 className="font-bold text-purple-800 mb-3">
              Reversed interpretation
            </h1>
            <p className="text-justify">{card.interpretation.reversed}</p>
          </div>
        </div>
      </div>

      {isLoggedIn && (
        <div className="mt-10">
          <h1 className="font-bold text-purple-800">Notes</h1>
          <form onSubmit={handleNoteSubmit}>
            <textarea
              name="note"
              id="note"
              cols="30"
              rows="10"
              value={note ? note.content : ""}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
            <button type="submit">{note ? "Edit Note" : "Add Note"}</button>
            {note && (
              <button type="button" onClick={handleDeleteNote}>
                Delete Note
              </button>
            )}
          </form>
        </div>
      )}
    </>
  );
}

export default OneCardPage;
