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
      <div className="flex flex-row">
        <div>
          <div className="border border-purple-400 rounded-md p-3">
            <h2>{card.name}</h2>
            <img className="" src={card.image.upright} alt="card image" />
          </div>

          <div>
            <div>
              <p>Description: {card.description}</p>
            </div>
            <div className="w-1/2">
              <p>Upright interpretation: {card.interpretation.uprigth}</p>
              <p>Reversed interpretation: {card.interpretation.reversed}</p>
            </div>
          </div>
        </div>
      </div>

      {isLoggedIn && (
        <div>
          <h2>Notes</h2>
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
