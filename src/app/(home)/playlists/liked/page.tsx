import { DEFAULT_LIMIT } from "@/constants";
import LikedView from "@/modules/playlists/ui/views/liked-view";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

const Page = async () => {
  void trpc.playlists.getLikedVideos.prefetchInfinite({ limit: DEFAULT_LIMIT });
  return (
    <HydrateClient>
      <LikedView />
    </HydrateClient>
  );
};

export default Page;
