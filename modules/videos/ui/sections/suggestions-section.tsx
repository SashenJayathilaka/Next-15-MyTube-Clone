"use client";

import InfiniteScroll from "@/components/infinite-scroll";
import { DEFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";
import React from "react";
import VideoGridCard from "../components/video-grid-card";
import VideoRowCard from "../components/video-row-card";

type SuggestionsSectionProps = {
  videoId: string;
  isManual?: boolean;
};

const SuggestionsSection: React.FC<SuggestionsSectionProps> = ({
  videoId,
  isManual,
}) => {
  const [suggesting, query] = trpc.suggestions.getMany.useSuspenseInfiniteQuery(
    {
      videoId,
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <>
      <div className="hidden md:block space-y-3">
        {suggesting.pages.flatMap((page) =>
          page.items.map((video) => (
            <VideoRowCard key={video.id} data={video} size="compact" />
          ))
        )}
      </div>
      <div className="block md:hidden space-y-10">
        {suggesting.pages.flatMap((page) =>
          page.items.map((video) => (
            <VideoGridCard key={video.id} data={video} />
          ))
        )}
      </div>
      <InfiniteScroll
        isManual={isManual}
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
      />
    </>
  );
};
export default SuggestionsSection;
