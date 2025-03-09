import React from "react";
import { PlaylistHeaderSections } from "../sections/playlist-header-sections";
import { VideoSections } from "../sections/videos-sections";

type VideoViewsProps = {
  playlistId: string;
};

const VideosView: React.FC<VideoViewsProps> = ({ playlistId }) => {
  return (
    <div className="max-w-screen-md mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
      <PlaylistHeaderSections playlistId={playlistId} />
      <VideoSections playlistId={playlistId} />
    </div>
  );
};
export default VideosView;
