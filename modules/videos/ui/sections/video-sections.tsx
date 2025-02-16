"use client";

import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import VideoBanner from "../components/video-banner";
import VideoPlayer from "../components/video-player";
import VideoTopRow from "../components/video-top-row";
import { useAuth } from "@clerk/nextjs";

type VideoSections = {
  videoId: string;
};

const VideoSections: React.FC<VideoSections> = ({ videoId }) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<div>Failed to load video sections</div>}>
        <VideoSectionsSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
};
export default VideoSections;

const VideoSectionsSuspense = ({ videoId }: VideoSections) => {
  const { isSignedIn } = useAuth();
  const utils = trpc.useUtils();
  const [video] = trpc.videos.getOne.useSuspenseQuery({ id: videoId });
  const createView = trpc.videoViews.create.useMutation({
    onSuccess: () => {
      utils.videos.getOne.invalidate({ id: videoId });
    },
  });

  const handlePlay = () => {
    if (!isSignedIn) return;

    createView.mutate({ videoId });
  };

  return (
    <>
      <div
        className={cn(
          "aspect-video bg-black rounded-xl overflow-hidden relative",
          video.muxStatus !== "ready" && "rounded-b-none"
        )}
      >
        <VideoPlayer
          autoPlay
          onPlay={handlePlay}
          playbackId={video.muxPlaybackId}
          thumbnailUrl={video.thumbnailUrl}
        />
      </div>
      <VideoBanner status={video.muxStatus} />
      <VideoTopRow video={video} />
    </>
  );
};
