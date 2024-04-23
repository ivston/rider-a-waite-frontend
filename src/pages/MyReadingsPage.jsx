import React, { useState, useEffect } from "react";
import tarotApi from "../service/myApi";

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
      <div key={reading._id}>
        <h2>{reading.spreadType}</h2>
        <div style={{ display: "flex" }}>
          {reading.cardsInOrder.map((card) => (
            <img
              key={card._id}
              src={card.image.upright} // Use appropriate image field
              alt={card.name}
              style={{ width: "100px", height: "150px", marginRight: "10px" }}
            />
          ))}
        </div>
        {/* Add a delete button for each reading */}
        <button onClick={() => deleteReading(reading._id)}>Delete</button>
      </div>
    ));
  };

  return (
    <div>
      <h1>Your Readings</h1>
      {readings.length === 0 ? <p>No readings available</p> : renderReadings()}
    </div>
  );
}

export default ReadingsPage;
