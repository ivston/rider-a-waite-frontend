import useAuth from "../context/UseAuthentication";
import tarotApi from "../service/myApi";
import Loader from "./../components/Loader";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function OneCardPage() {
  const [card, setCard] = useState(null);
  //const [notes, setNotes] = useState(null);
  const { cardId } = useParams();
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    fetchCard();
  }, []);

  //   async function handleNoteSubmit(e) {
  //     e.preventDefault();
  //     try {
  //       const noteToSend = { notes };
  //       const response = await tarotApi.post(`/notes/${cardId}`, noteToSend);
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  async function fetchCard() {
    try {
      const { data } = await tarotApi.get("/cards/" + cardId);
      setCard(data.oneCard);
      //   setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  }

  //   function handleDeleteNote(id) {
  //     return async () => {
  //       try {
  //         const response = await tarotApi.delete("/notes/" + id);
  //         console.log(response);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //   }

  if (!card) return <Loader />;
  return (
    <>
      <div>
        <h2>{card.name}</h2>
        <img src={card.image.upright} alt="card image" />
        <div>
          <div>
            <div>
              <p>Description: {card.description}</p>
            </div>
            <div>
              <p>Upright interpretation: {card.interpretation.uprigth}</p>
              <p>Upright interpretation: {card.interpretation.reversed}</p>
            </div>
          </div>
        </div>
      </div>

      <h2>Comments</h2>
      {isLoggedIn && (
        <>
          {/* <form onSubmit={handleNoteSubmit}>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
            <button>Save note</button>
          </form> */}
          {/* </>
      )}
      {notes.length === 0 ? (
        <p>No notes yet</p>
      ) : (
        <>
          {notes.map((note) => {
            console.log(note);
            const canDelete =
              user && (note.user._id === user._id || user.role === "admin");
            return (
              <div className="comment" key={note._id}>
                <div className="author">
                  <p>{note.user?.email}</p>
                </div>
                <div
                  className="content"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <p>{note.content}</p>
                  {canDelete && (
                    <p onClick={handleDeleteComment(comment._id)}>🗑️</p>
                  )}
                </div> */}
          {/* </div> */}
          {/* ); */}
          {/* })} */}
        </>
      )}
    </>
  );
}

export default OneCardPage;
