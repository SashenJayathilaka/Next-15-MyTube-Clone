"use client";

import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import VideoBanner from "../components/video-banner";
import VideoPlayer from "../components/video-player";
import VideoTopRow from "../components/video-top-row";

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
  const [video] = trpc.videos.getOne.useSuspenseQuery({ id: videoId });

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
          onPlay={() => {}}
          playbackId={video.muxPlaybackId}
          thumbnailUrl={video.thumbnailUrl}
        />
      </div>
      <VideoBanner status={video.muxStatus} />
      <VideoTopRow video={video} />
    </>
  );
};
