import React from "react";

import MuxPlayer from "@mux/mux-player-react";
import { THUMBNAIL_FALLBACK } from "../../constants";

interface VideoPlayerProps {
  playbackId?: string | null;
  thumbnailUrl?: string | null;
  autoPlay?: boolean;
  onPlay: () => void;
}

const VideoPlayer = ({
  onPlay,
  autoPlay,
  playbackId,
  thumbnailUrl,
}: VideoPlayerProps) => {
  if (!playbackId) return null;
  return (
    <MuxPlayer
      playbackId={playbackId}
      poster={thumbnailUrl ?? THUMBNAIL_FALLBACK}
      playerInitTime={0}
      autoPlay={autoPlay}
      thumbnailTime={0}
      className="w-full h-full object-contain"
      accentColor="#ff2056"
      onPlay={onPlay}
    />
  );
};

export default VideoPlayer;
