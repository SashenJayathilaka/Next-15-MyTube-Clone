import React from "react";
import SuggestionsSection from "../sections/suggestions-section";
import VideoSections from "../sections/video-sections";
import CommentsSections from "../sections/comments-sections";

type VideoView = {
  videoId: string;
};

const VideoView: React.FC<VideoView> = ({ videoId }) => {
  return (
    <div className="flex flex-col max-w-[1700px] mx-auto pt-2.5 px-4 mb-10">
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <VideoSections videoId={videoId} />
          <div className="xl:hidden block mt-4">
            <SuggestionsSection />
          </div>
          <CommentsSections videoId={videoId} />
        </div>
        <div className="hidden xl:block w-full xl:w-[380px] 2xl:w-[460px] shrink-1">
          <SuggestionsSection />
        </div>
      </div>
    </div>
  );
};
export default VideoView;
