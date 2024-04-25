import React, { useState, useEffect } from "react";
import tarotApi from "../service/myApi";
import { useParams } from "react-router-dom";

function OneReadingPage() {
  const [reading, setReading] = useState(null);
  const { readingId } = useParams();

  useEffect(() => {
    fetchReading(readingId);
  }, [readingId]);

  const fetchReading = async (readingId) => {
    try {
      const response = await tarotApi.get(`/readings/${readingId}`);
      setReading(response.data);
    } catch (error) {
      console.error("Error fetching reading:", error);
    }
  };

  if (!reading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{reading.spreadType} Reading</h1>
      <p>Created on: {new Date(reading.createdAt).toLocaleDateString()}</p>
      <div className="cards-container">
        {reading.cardsInOrder.map((card) => (
          <div key={card._id} className="card">
            <img src={card.image.upright} alt={card.name} />
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OneReadingPage;
