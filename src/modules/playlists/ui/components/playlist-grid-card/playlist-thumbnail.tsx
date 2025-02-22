import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { THUMBNAIL_FALLBACK } from "@/modules/videos/constants";
import { ListVideoIcon, PlayIcon } from "lucide-react";
import Image from "next/image";
import React, { useMemo } from "react";

interface PlaylistThumbnailProps {
  imageUrl?: string | null;
  title: string;
  videoCount: number;
  className?: string;
}

export const PlaylistThumbnailSkeleton = () => (
  <div className="relative w-full overflow-hidden rounded-xl aspect-video">
    <Skeleton className="size-full" />
  </div>
);

const PlaylistThumbnail = ({
  title,
  videoCount,
  className,
  imageUrl,
}: PlaylistThumbnailProps) => {
  const compactViews = useMemo(() => {
    return Intl.NumberFormat("en", { notation: "compact" }).format(videoCount);
  }, [videoCount]);
  return (
    <div className={cn("relative pt-3", className)}>
      <div className="relative">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[97%] overflow-hidden rounded-xl bg-foreground/20 aspect-video" />
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-[98.5%] overflow-hidden rounded-xl bg-foreground/25 aspect-video" />

        <div className="relative overflow-hidden w-full rounded-xl aspect-video">
          <Image
            src={imageUrl ?? THUMBNAIL_FALLBACK}
            alt={title}
            fill
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex items-center gap-x-2">
              <PlayIcon className="size-4 text-background fill-background" />
              <span className="text-background font-medium">Play all</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 right-2 px-1 py-0.5 rounded bg-foreground/70 text-xs text-background font-medium flex items-center gap-x-1">
        <ListVideoIcon className="size-4" />
        {compactViews} videos
      </div>
    </div>
  );
};

export default PlaylistThumbnail;
