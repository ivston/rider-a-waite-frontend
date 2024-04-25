import React, { useState, useEffect } from "react";
import tarotApi from "../service/myApi";

function ReadingsPage() {
  const [reading, setReading] = useState(null);

  const generateReading = async (spreadType) => {
    try {
      const response = await tarotApi.post(`/readings/${spreadType}`);
      setReading(response.data);
      console.log("Reading:", response.data);
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

      // Generate one random number to determine if image and interpretation should be reversed
      const isReversed = Math.random() < 0.5;

      // Select the image and interpretation based on isReversed
      const imageUrl = isReversed ? card.image.reversed : card.image.upright;
      const interpretation = isReversed
        ? card.interpretation.reversed
        : card.interpretation.upright;

      return (
        <div key={card._id} className="flex flex-row">
          <div>
            <div className="flex flex-col items-center gap-5 border border-purple-600 p-5 rounded-lg">
              <p className="font-bold text-purple-800">{card.name}</p>
              <div className="w-1/3 ">
                <img src={imageUrl} alt={card.name} className="" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 justify-between p-10 w-1/2">
            <div>
              <p className="text-purple-800 font-bold">Interpretation</p>
              <p>{interpretation}</p>
            </div>
          </div>
        </div>
      );
    });
  };
  //console.log(reading);
  return (
    <div className="my-10">
      <div className="flex flex-col gap-8 border border-purple-600 rounded-lg p-5">
        <div className="flex flex-row gap-5 justify-evenly text-2xl text-white">
          <h1 className="p-4 text-2xl font-bold text-center text-purple-800">
            Select your spread
          </h1>
          <button
            onClick={() => generateReading("one-card")}
            className="p-4 relative inline-flex items-center justify-center overflow-hidden rounded-full group bg-purple-500 to-purple-800 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200"
          >
            One Card Reading
          </button>
          <button
            onClick={() => generateReading("three-card")}
            className="p-4 relative inline-flex items-center justify-center overflow-hidden rounded-full group bg-purple-500 to-purple-800 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200"
          >
            Three Card Reading
          </button>
          <button
            onClick={() => generateReading("celtic-cross")}
            className="p-4 relative inline-flex items-center justify-center overflow-hidden rounded-full group bg-purple-500 to-purple-800 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200"
          >
            Celtic Cross
          </button>
        </div>
      </div>

      {reading && (
        <div className="mt-10 flex flex-col gap-10">
          <div className="">
            <h2 className="font-bold text-purple-800">Your reading</h2>
          </div>
          <div className="flex flex-col gap-10">
            {Array.isArray(reading.cards)
              ? renderCard(reading.cards)
              : renderCard([reading.cards])}
          </div>
        </div>
      )}
    </div>
  );
}

export default ReadingsPage;
