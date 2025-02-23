"use client";

import InfiniteScroll from "@/components/infinite-scroll";
import { DEFAULT_LIMIT } from "@/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import VideoGridCard from "@/modules/videos/ui/components/video-grid-card";
import VideoRowCard from "@/modules/videos/ui/components/video-row-card";
import { trpc } from "@/trpc/client";
import React from "react";

type ResultSectionsProps = {
  query: string | undefined;
  categoryId: string | undefined;
};

const ResultSections: React.FC<ResultSectionsProps> = ({
  categoryId,
  query,
}) => {
  const isMobile = useIsMobile();

  const [results, resultQuery] = trpc.search.getMany.useSuspenseInfiniteQuery(
    {
      query: query,
      categoryId: categoryId,
      limit: DEFAULT_LIMIT,
    },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  return (
    <>
      {isMobile ? (
        <div className="flex flex-col gap-4 gap-y-10">
          {results.pages
            .flatMap((page) => page.items)
            .map((video) => (
              <VideoGridCard key={video.id} data={video} />
            ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {results.pages
            .flatMap((page) => page.items)
            .map((video) => (
              <VideoRowCard key={video.id} data={video} />
            ))}
        </div>
      )}
      <InfiniteScroll
        hasNextPage={resultQuery.hasNextPage}
        isFetchingNextPage={resultQuery.isFetchingNextPage}
        fetchNextPage={resultQuery.fetchNextPage}
      />
    </>
  );
};
export default ResultSections;
