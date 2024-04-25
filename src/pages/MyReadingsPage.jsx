import React, { useState, useEffect } from "react";
import tarotApi from "../service/myApi";
import { Link } from "react-router-dom";

function ReadingsPage() {
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    fetchReadings();
  }, []);

  const fetchReadings = async () => {
    try {
      const response = await tarotApi.get("/readings");
      setReadings(response.data);
    } catch (error) {
      console.error("Error fetching readings:", error);
    }
  };

  const deleteReading = async (readingId) => {
    try {
      await tarotApi.delete(`/readings/${readingId}`);
      // After successful deletion, fetch readings again to update the list
      fetchReadings();
    } catch (error) {
      console.error("Error deleting reading:", error);
    }
  };

  const renderReadings = () => {
    return readings.map((reading) => (
      <div
        className="border border-purple-400 rounded-md p-3 my-5"
        key={reading._id}
      >
        <div className="flex flex-row gap-5 my-2 justify-center">
          <h2 className=" capitalize text-purple-800 font-bold">
            {reading.spreadType} reading
          </h2>
          <p className=" text-purple-800">
            Pull on: {new Date(reading.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex my-2">
            {reading.cardsInOrder.map((card) => (
              <img
                key={card._id}
                src={card.image.upright}
                alt={card.name}
                style={{
                  width: "100px",
                  height: "150px",
                  marginRight: "10px",
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-center gap-5">
          <button
            className="bg-purple-200 rounded-full p-2 text-purple-800 font-bold hover:border hover:border-purple-800 h-10 my-2"
            onClick={() => deleteReading(reading._id)}
          >
            Delete
          </button>
          <Link to={`/myreadings/${reading._id}`}>
            <button className="bg-purple-200 rounded-full p-2 text-purple-800 font-bold hover:border hover:border-purple-800 h-10 my-2">
              Click for more info
            </button>
          </Link>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <h1 className="text-purple-800 text-2xl font-bold my-10">
        Your Readings
      </h1>
      {readings.length === 0 ? <p>No readings available</p> : renderReadings()}
    </div>
  );
}

export default ReadingsPage;
