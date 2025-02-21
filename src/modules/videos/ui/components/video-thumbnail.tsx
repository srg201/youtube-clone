import { formatDuration } from "@/lib/utils";
import Image from "next/image";
import { THUMBNAIL_FALLBACK } from "../../constants";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoThumbnailProps {
  imageUrl?: string | null;
  previewUrl?: string | null;
  title: string;
  duration: number;
}

export const VideoThumbnailSkeleton = () => (
  <div className="relative w-full overflow-hidden rounded-xl aspect-video">
    <Skeleton className="size-full" />
  </div>
);

const VideoThumbnail = ({
  imageUrl,
  previewUrl,
  title,
  duration,
}: VideoThumbnailProps) => {
  return (
    <div className="relative group">
      {/* Thumbnail Wrapper  */}

      <div className="relative w-full overflow-hidden transition-all rounded-xl aspect-video">
        <Image
          src={imageUrl ?? THUMBNAIL_FALLBACK}
          alt={title}
          fill
          className="size-full object-cover group-hover:opacity-0"
        />
        <Image
          unoptimized={!!previewUrl}
          src={previewUrl ?? (imageUrl || THUMBNAIL_FALLBACK)}
          alt={title}
          fill
          className="opacity-0 size-full object-cover group-hover:opacity-100"
        />
      </div>

      {/* Video Duration Box  */}
      {/* TODO: Add video duration box  */}

      <div className="absolute bottom-2 right-2 px-1 py-0.5 rounded bg-background/50 text-foreground text-xs font-medium">
        {formatDuration(duration)}
      </div>
    </div>
  );
};
export default VideoThumbnail;
