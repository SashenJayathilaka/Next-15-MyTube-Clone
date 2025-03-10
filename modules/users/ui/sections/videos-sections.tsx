"use client";

import InfiniteScroll from "@/components/infinite-scroll";
import { DEFAULT_LIMIT } from "@/constants";
import VideoGridCard, {
  VideoGridCardSkeletons,
} from "@/modules/videos/ui/components/video-grid-card";
import { trpc } from "@/trpc/client";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type VideosSectionsProps = {
  userId?: string;
};

export const VideosSections: React.FC<VideosSectionsProps> = ({ userId }) => {
  return (
    <Suspense fallback={<VideosSectionsSkeleton />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <VideosSectionsSuspense userId={userId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const VideosSectionsSkeleton = () => {
  return (
    <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 18 }).map((_, index) => (
        <VideoGridCardSkeletons key={index} />
      ))}
    </div>
  );
};

const VideosSectionsSuspense = ({ userId }: VideosSectionsProps) => {
  const [videos, query] = trpc.videos.getMany.useSuspenseInfiniteQuery(
    { userId: userId, limit: DEFAULT_LIMIT },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <div>
      <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
        {videos.pages
          .flatMap((page) => page.items)
          .map((video) => (
            <VideoGridCard key={video.id} data={video} />
          ))}
      </div>
      <InfiniteScroll
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
      />
    </div>
  );
};
