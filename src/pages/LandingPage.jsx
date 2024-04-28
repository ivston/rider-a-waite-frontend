import React from "react";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center gap-10 mt-10 text-purple-800">
      <h1 className=" font-bold">
        Welcome to Rider-A-Waite, a website developed by Ivan Stoyanov.
      </h1>
      <h1 className=" text-center font-bold">
        Here, you will be able to learn more about each card of the Rider Waite
        Tarot Deck.
      </h1>
      <p className="mb-10">
        Sign up and log in for personalised card notes and readings that you can
        reccord on your profile.
      </p>
      <img src="tarot.png" alt="tarot cards icon" />
    </div>
  );
};

export default LandingPage;
