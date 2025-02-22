"use client";
import InfiniteScroll from "@/components/infinite-scroll";
import { DEFAULT_LIMIT } from "@/constants";
import VideoGridCard, {
  VideoGridCardSkeleton,
} from "@/modules/videos/ui/components/video-grid-card";
import { trpc } from "@/trpc/client";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface UserVideosSectionProps {
  userId: string;
}

const UserVideosSection = ({ userId }: UserVideosSectionProps) => {
  return (
    <Suspense key={userId} fallback={<UserVideosSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <UserVideosSectionSuspense userId={userId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const UserVideosSectionSkeleton = () => {
  return (
    <div>
      <div className="grid gap-4 gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <VideoGridCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

const UserVideosSectionSuspense = ({ userId }: UserVideosSectionProps) => {
  const [videos, query] = trpc.videos.getUserMany.useSuspenseInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
      userId,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  return (
    <div>
      <div className="grid gap-4 gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
        {videos.pages
          .flatMap((page) => page.items)
          .map((item) => (
            <VideoGridCard key={item.id} data={item} />
          ))}
      </div>
      <InfiniteScroll
        fetchNextPage={query.fetchNextPage}
        hasNextpage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
      />
    </div>
  );
};

export default UserVideosSection;
