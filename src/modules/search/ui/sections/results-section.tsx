"use client";
import InfiniteScroll from "@/components/infinite-scroll";
import { DEFAULT_LIMIT } from "@/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import VideoGridCard from "@/modules/videos/ui/components/video-grid-card";
import VideoRowCard from "@/modules/videos/ui/components/video-row-card";
import { trpc } from "@/trpc/client";
import React from "react";

interface ResultsSectionProps {
  categoryId: string | undefined;
  query: string | undefined;
}

const ResultsSection = ({ categoryId, query }: ResultsSectionProps) => {
  const isMobile = useIsMobile();
  const [results, resultQuery] = trpc.search.getMany.useSuspenseInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
      query,
      categoryId,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  return (
    <>
      {isMobile ? (
        <div className="flex flex-col gap-4 gap-y-10">
          {results.pages
            .flatMap((page) => page.items)
            .map((item) => (
              <VideoGridCard key={item.id} data={item} />
            ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {results.pages
            .flatMap((page) => page.items)
            .map((item) => (
              <VideoRowCard key={item.id} data={item} />
            ))}
        </div>
      )}
      <InfiniteScroll
        fetchNextPage={resultQuery.fetchNextPage}
        hasNextpage={resultQuery.hasNextPage}
        isFetchingNextPage={resultQuery.isFetchingNextPage}
      />
    </>
  );
};

export default ResultsSection;
