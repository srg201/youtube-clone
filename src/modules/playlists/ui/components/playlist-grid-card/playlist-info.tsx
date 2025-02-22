import { Skeleton } from "@/components/ui/skeleton";
import { PlaylistsGetManyOutput } from "@/modules/playlists/types";
import React from "react";

export const PlaylistInfoSkeleton = () => (
  <div className="flex gap-3">
    <div className="min-w-0 flex-1 space-y-2">
      <Skeleton className="h-5 w-[90%]" />
      <Skeleton className="h-5 w-[70%]" />
      <Skeleton className="h-5 w-[50%]" />
    </div>
  </div>
);

const PlaylistInfo = ({ name }: PlaylistsGetManyOutput["items"][number]) => {
  return (
    <div className="flex gap-3">
      <div className="flex-1 min-w-0">
        <h3 className="font-medium line-clamp-1 lg:line-clamp-2 text-sm break-words">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground">Paylist</p>
        <p className="text-sm text-muted-foreground font-semibold hover:text-primary">
          View full playlist
        </p>
      </div>
    </div>
  );
};

export default PlaylistInfo;
