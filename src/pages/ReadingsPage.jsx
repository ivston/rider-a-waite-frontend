import React, { useState, useEffect } from "react";
import tarotApi from "../service/myApi";

function ReadingsPage() {
  const [reading, setReading] = useState(null);

  const generateReading = async (spreadType) => {
    try {
      const response = await tarotApi.post(`/readings/${spreadType}`);
      setReading(response.data);
      //console.log(reading);
    } catch (error) {
      console.error("Error generating reading:", error);
    }
  };

  const renderCard = (cards) => {
    return cards.map((card) => {
      // Check if card.image and card.interpretation are defined
      if (!card.image || !card.interpretation) {
        return null; // Skip rendering if necessary properties are missing
      }

      // Generate one random number to determine if both image and interpretation should be reversed
      const isReversed = Math.random() < 0.5;

      // Select the image and interpretation based on the isReversed flag
      const imageUrl = isReversed ? card.image.reversed : card.image.upright;
      const interpretation = isReversed
        ? card.interpretation.reversed
        : card.interpretation.upright;

      console.log("Current Card:", card);

      return (
        <div key={card._id}>
          <img src={imageUrl} alt={card.name} />
          <p>{interpretation}</p>
          <p>{card.description}</p>
        </div>
      );
    });
  };

  return (
    <div>
      <h1>Select a spread:</h1>
      <button onClick={() => generateReading("one-card")}>
        1 Card Reading
      </button>
      <button onClick={() => generateReading("three-card")}>
        3 Card Reading
      </button>
      <button onClick={() => generateReading("celtic-cross")}>
        Celtic Cross
      </button>

      {reading && (
        <div>
          <h2>Reading Result:</h2>
          {Array.isArray(reading) ? renderCard(reading) : renderCard([reading])}
        </div>
      )}
    </div>
  );
}

export default ReadingsPage;
