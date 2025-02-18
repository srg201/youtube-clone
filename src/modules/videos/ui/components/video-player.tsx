import React from "react";

import MuxPlayer from "@mux/mux-player-react";

interface VideoPlayerProps {
  playbackId?: string | null;
  thumbnailUrl?: string | null;
  autoplay?: boolean;
  onPlay: () => void;
}

const VideoPlayer = ({
  onPlay,
  autoplay,
  playbackId,
  thumbnailUrl,
}: VideoPlayerProps) => {
  if (!playbackId) return null;
  return (
    <MuxPlayer
      playbackId={playbackId}
      poster={thumbnailUrl ?? "/placeholder.svg"}
      playerInitTime={0}
      autoPlay={autoplay}
      thumbnailTime={0}
      className="w-full h-full object-contain"
      accentColor="#ff2056"
      onPlay={onPlay}
    />
  );
};

export default VideoPlayer;
