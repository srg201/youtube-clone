import React from "react";

import MuxPlayer from "@mux/mux-player-react";
import { THUMBNAIL_FALLBACK } from "../../constants";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoPlayerProps {
  playbackId?: string | null;
  thumbnailUrl?: string | null;
  autoPlay?: boolean;
  onPlay: () => void;
}

export const VideoPlayerSkeleton = () => {
  return <Skeleton className="aspect-video rounded-xl" />;
};

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
