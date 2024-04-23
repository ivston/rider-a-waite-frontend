import React from "react";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center gap-10 mt-10">
      <p>
        Welcome to Rider-A-Waite, a website developed by Ivan Stoyanov. Here,
        you will be able to learn about the Rider Waite Tarot Deck and get
        readings!
      </p>
      <img src="tarot.png" alt="tarot cards icon" />
    </div>
  );
};

export default LandingPage;
