import React from "react";
import { LikedVideoSections } from "../sections/liked-video-section";

const LikedView: React.FC = () => {
  return (
    <div className="max-w-screen-md mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
      <div>
        <h1 className="text-2xl font-bold">Liked</h1>
        <p className="text-xs text-muted-foreground">Video You have Liked</p>
      </div>
      <LikedVideoSections />
    </div>
  );
};
export default LikedView;
