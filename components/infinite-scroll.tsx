import { useIntersectionsObserver } from "@/hooks/use-intersetions-observer";
import { useEffect } from "react";
import { Button } from "./ui/button";

type Props = {
  isManual?: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

function InfiniteScroll({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isManual,
}: Props) {
  const { targetRef, isIntersection } = useIntersectionsObserver({
    threshold: 0.5,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (isIntersection && hasNextPage && !isFetchingNextPage && !isManual) {
      fetchNextPage();
    }
  }, [
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isIntersection,
    isManual,
  ]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div ref={targetRef} className="h-1" />
      {hasNextPage ? (
        <Button
          variant="secondary"
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          Load More
        </Button>
      ) : (
        <p className="text-xs text-muted-foreground">
          You have reached the end of the list
        </p>
      )}
    </div>
  );
}

export default InfiniteScroll;
