"use client";

import MuxPlayer from "@mux/mux-player-react";
import React from "react";
import { THUMBNAIL_FALLBACK } from "../../constants";

type VideoPlayer = {
  playbackId?: string | null | undefined;
  thumbnailUrl?: string | null | undefined;
  autoPlay?: boolean;
  onPlay?: () => void;
};

export const VideoPlayerSkeleton = () => {
  return <div className="aspect-video bg-black rounded-xl" />;
};

const VideoPlayer: React.FC<VideoPlayer> = ({
  autoPlay,
  onPlay,
  playbackId,
  thumbnailUrl,
}) => {
  /*   if (!playbackId) return null; */

  return (
    <MuxPlayer
      playbackId={playbackId || ""}
      poster={thumbnailUrl || THUMBNAIL_FALLBACK}
      playerInitTime={0}
      autoPlay={autoPlay}
      thumbnailTime={0}
      className="w-full h-full object-contain"
      accentColor="#FF2056"
      onPlay={onPlay}
    />
  );
};
export default VideoPlayer;
