import React from "react";
import VideoSection from "../sections/video-section";
import SuggestionsSection from "../sections/suggestions-sections";
import CommentsSection from "../sections/comments-section";

interface VideoViewProps {
  videoId: string;
}

const VideoView = ({ videoId }: VideoViewProps) => {
  return (
    <div className="flex flex-col max-w-screen-2xl mx-auto pt-2.5 px-4 mb-10">
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <VideoSection videoId={videoId} />
          <div className="xl:hidden block mt-4">
            <SuggestionsSection />
          </div>
          <CommentsSection />
        </div>
        <div className="hidden xl:block w-full xl:w-96 2xl:w-[460px] shrink-1">
          <SuggestionsSection />
        </div>
      </div>
    </div>
  );
};

export default VideoView;
