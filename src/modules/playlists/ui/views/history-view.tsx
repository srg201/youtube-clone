import React from "react";
import HistoryVideosSection from "../sections/history-videos-section";

const HistoryView = () => {
  return (
    <div className="max-w-[150rem] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
      <div>
        <h1 className="text-2xl font-bold">History 📚</h1>
        <p className="text-xs text-muted-foreground mt-2">
          Videos you have watched
        </p>
      </div>
      <HistoryVideosSection />
    </div>
  );
};

export default HistoryView;
