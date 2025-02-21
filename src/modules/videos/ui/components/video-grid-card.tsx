import React from "react";
import { VideoGetManyOutput } from "../../types";
import Link from "next/link";
import VideoThumbnail from "./video-thumbnail";
import VideoInfo from "./video-info";

interface VideoGridCardProps {
  data: VideoGetManyOutput["items"][number];
  onRemove?: () => void;
}

const VideoGridCard = ({ data, onRemove }: VideoGridCardProps) => {
  return (
    <div className="flex flex-col gap-2 w-full group">
      <Link href={`/videos/${data.id}`}>
        <VideoThumbnail
          duration={data.duration}
          title={data.title}
          imageUrl={data.thumbnailUrl}
          previewUrl={data.previewUrl}
        />
      </Link>

      <VideoInfo data={data} onRemove={onRemove} />
    </div>
  );
};

export default VideoGridCard;
