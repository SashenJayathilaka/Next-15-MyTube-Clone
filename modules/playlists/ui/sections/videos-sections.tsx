"use client";

import InfiniteScroll from "@/components/infinite-scroll";
import { DEFAULT_LIMIT } from "@/constants";
import VideoGridCard, {
  VideoGridCardSkeletons,
} from "@/modules/videos/ui/components/video-grid-card";
import VideoRowCard, {
  VideoRowCardSkeleton,
} from "@/modules/videos/ui/components/video-row-card";
import { trpc } from "@/trpc/client";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "sonner";

type VideoSectionsProps = {
  playlistId: string;
};

export const VideoSections = ({ playlistId }: VideoSectionsProps) => {
  return (
    <Suspense fallback={<VideoSectionsSkeleton />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <VideoSectionsSuspense playlistId={playlistId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const VideoSectionsSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 gap-y-10 md:hidden">
        {Array.from({ length: 18 }).map((_, index) => (
          <VideoGridCardSkeletons key={index} />
        ))}
      </div>
      <div className="hidden flex-col gap-4 md:flex">
        {Array.from({ length: 18 }).map((_, index) => (
          <VideoRowCardSkeleton key={index} size="compact" />
        ))}
      </div>
    </div>
  );
};

const VideoSectionsSuspense: React.FC<VideoSectionsProps> = ({
  playlistId,
}) => {
  const utils = trpc.useUtils();
  const [videos, resultQuery] =
    trpc.playList.getVideos.useSuspenseInfiniteQuery(
      { playlistId, limit: DEFAULT_LIMIT },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const removeVideo = trpc.playList.removeVideo.useMutation({
    onSuccess: (data) => {
      toast.success("Video remove from playlist");
      utils.playList.getMany.invalidate();
      utils.playList.getManyForVideo.invalidate({ videoId: data.videoId });
      utils.playList.getOne.invalidate({ id: data.playLitsId });
      utils.playList.getVideos.invalidate({
        playlistId: data.playLitsId,
      });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <div>
      <div className="flex flex-col gap-4 gap-y-10 md:hidden">
        {videos.pages
          .flatMap((page) => page.items)
          .map((video) => (
            <VideoGridCard
              key={video.id}
              data={video}
              onRemove={() =>
                removeVideo.mutate({
                  playlistId,
                  videoId: video.id,
                })
              }
            />
          ))}
      </div>
      <div className="hidden flex-col gap-4 md:flex">
        {videos.pages
          .flatMap((page) => page.items)
          .map((video) => (
            <VideoRowCard
              key={video.id}
              data={video}
              size="compact"
              onRemove={() =>
                removeVideo.mutate({
                  playlistId,
                  videoId: video.id,
                })
              }
            />
          ))}
      </div>
      <InfiniteScroll
        hasNextPage={resultQuery.hasNextPage}
        isFetchingNextPage={resultQuery.isFetchingNextPage}
        fetchNextPage={resultQuery.fetchNextPage}
      />
    </div>
  );
};
