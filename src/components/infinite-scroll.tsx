import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useEffect } from "react";
import { Button } from "./ui/button";

interface InfiniteScrollProps {
  isManual?: boolean;
  hasNextpage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const InfiniteScroll = ({
  isManual = false,
  hasNextpage,
  isFetchingNextPage,
  fetchNextPage,
}: InfiniteScrollProps) => {
  const { isIntersecting, targetRef } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (isIntersecting && hasNextpage && !isFetchingNextPage && !isManual) {
      fetchNextPage();
    }
  }, [
    isIntersecting,
    hasNextpage,
    isFetchingNextPage,
    isManual,
    fetchNextPage,
  ]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div ref={targetRef} className="h-1"></div>
      {hasNextpage ? (
        <Button
          variant={"secondary"}
          disabled={!hasNextpage || isFetchingNextPage}
          onClick={fetchNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </Button>
      ) : (
        <p className="text-sm text-accent-foreground">
          You have reached the end of the list
        </p>
      )}
    </div>
  );
};
export default InfiniteScroll;
