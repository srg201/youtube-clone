import React from "react";
import LikedVideosSection from "../sections/liked-videos-section";

const LikedView = () => {
  return (
    <div className="max-w-[150rem] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
      <div>
        <h1 className="text-2xl font-bold">Liked Videos ❤️</h1>
        <p className="text-xs text-muted-foreground mt-2">
          Videos you have liked
        </p>
      </div>
      <LikedVideosSection />
    </div>
  );
};

export default LikedView;
