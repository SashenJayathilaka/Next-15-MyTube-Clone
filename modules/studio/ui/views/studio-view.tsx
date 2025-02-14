import React from "react";
import VideoSections from "../sections/video-sections";

function StudioView() {
  return (
    <div className="flex flex-col gap-y-6 pt-2.5">
      <div className="px-4">
        <h1 className="text-2xl font-bold">Chanel Content</h1>
        <p className="text-xs text-muted-foreground">
          Manage your channel content and videos
        </p>
      </div>
      <VideoSections />
    </div>
  );
}

export default StudioView;
