import { DEFAULT_LIMIT } from "@/constants";
import UserView from "@/modules/users/ui/views/user-view";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: userId } = await params;
  void trpc.users.getOne.prefetch({ userId });
  void trpc.videos.getUserMany.prefetchInfinite({
    userId,
    limit: DEFAULT_LIMIT,
  });
  return (
    <HydrateClient>
      <UserView userId={userId} />
    </HydrateClient>
  );
};

export default Page;
