import React, { useState, useEffect } from "react";
import tarotApi from "../service/myApi";
import { useParams } from "react-router-dom";

function OneReadingPage() {
  const [reading, setReading] = useState(null);
  const [noteContent, setNoteContent] = useState("");
  const { readingId } = useParams();

  useEffect(() => {
    fetchReading(readingId);
  }, [readingId]);

  const fetchReading = async (readingId) => {
    try {
      const response = await tarotApi.get(`/readings/${readingId}`);
      setReading(response.data);
      // Set note content if available
      if (response.data.notes) {
        setNoteContent(response.data.notes);
      }
    } catch (error) {
      console.error("Error fetching reading:", error);
    }
  };

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update note content
      const updatedReading = { ...reading, notes: noteContent };
      await tarotApi.post(`/readings/${readingId}/notes`, {
        notes: noteContent,
      });
      // Update state
      setReading(updatedReading);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDeleteNote = async () => {
    try {
      // Remove note content
      const updatedReading = { ...reading, notes: "" };
      await tarotApi.delete(`/readings/${readingId}/notes`);
      // Update state
      setReading(updatedReading);
      setNoteContent("");
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  if (!reading) return <p>Loading...</p>;

  return (
    <div>
      {/* Displaying reading */}
      <div>
        <div className="flex flex-row gap-5 my-10">
          <h1 className="capitalize text-purple-800 font-bold">
            {reading.spreadType} Reading
          </h1>
          <p className="text-purple-800">
            Pulled on {new Date(reading.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="cards-container">
          {reading.cardsInOrder.map((card) => (
            <div key={card._id} className="card flex flex-row my-5">
              <div className="flex flex-col items-center gap-5 border border-purple-600 p-5 rounded-lg">
                <p className="font-bold text-purple-800">{card.name}</p>
                <div className="w-1/3">
                  <img src={card.image.upright} alt={card.name} />
                </div>
              </div>
              <div className="flex flex-col gap-5 justify-between p-10 w-1/2">
                <div>
                  <p>
                    <span className="text-purple-800 font-bold">
                      Upright interpretation
                    </span>{" "}
                    <br />
                    {card.interpretation.upright}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="text-purple-800 font-bold">
                      Reversed interpretation
                    </span>{" "}
                    <br />
                    {card.interpretation.reversed}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notes section */}
      <div className="mt-10">
        <h1 className="font-bold text-purple-800 mb-5">Notes</h1>
        <form onSubmit={handleNoteSubmit}>
          <textarea
            className="border border-purple-600 rounded-lg p-5"
            value={noteContent}
            cols={60}
            onChange={(e) => setNoteContent(e.target.value)}
          ></textarea>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-purple-200 rounded-lg p-2 text-purple-800 font-bold hover:border hover:border-purple-800"
              type="submit"
            >
              Update Note
            </button>
            <button
              className="bg-purple-200 rounded-lg p-2 text-purple-800 font-bold hover:border hover:border-purple-800"
              type="button"
              onClick={handleDeleteNote}
            >
              Delete Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OneReadingPage;
