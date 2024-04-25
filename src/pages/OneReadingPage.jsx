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
      <div className="flex flex-row gap-5 my-10">
        <h1 className=" capitalize text-purple-800 font-bold">
          {reading.spreadType} Reading
        </h1>
        <p className=" text-purple-800">
          Pull on: {new Date(reading.createdAt).toLocaleDateString()}
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
  );
}

export default OneReadingPage;
