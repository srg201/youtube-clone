import VideoView from "@/modules/videos/ui/views/video-view";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

const Page = async ({ params }: { params: Promise<{ videoId: string }> }) => {
  void trpc.videos.getOne.prefetch({ id: (await params).videoId });
  // TODO: dont forget to change to prefetchInfinite
  void trpc.comments.getMany.prefetch({ videoId: (await params).videoId });
  return (
    <HydrateClient>
      <VideoView videoId={(await params).videoId} />
    </HydrateClient>
  );
};

export default Page;
