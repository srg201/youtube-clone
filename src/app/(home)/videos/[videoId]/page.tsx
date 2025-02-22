import { DEFAULT_LIMIT } from "@/constants";
import VideoView from "@/modules/videos/ui/views/video-view";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

const Page = async ({ params }: { params: Promise<{ videoId: string }> }) => {
  void trpc.videos.getOne.prefetchInfinite({ id: (await params).videoId });
  void trpc.comments.getMany.prefetchInfinite({
    videoId: (await params).videoId,
    limit: DEFAULT_LIMIT,
  });
  void trpc.suggestions.getMany.prefetchInfinite({
    videoId: (await params).videoId,
    limit: DEFAULT_LIMIT,
  });
  return (
    <HydrateClient>
      <VideoView videoId={(await params).videoId} />
    </HydrateClient>
  );
};

export default Page;
