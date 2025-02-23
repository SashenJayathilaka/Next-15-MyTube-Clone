import React from "react";
import { TrendingVideoSections } from "../sections/trending-video-sections";

const TrendingView: React.FC = () => {
  return (
    <div className="max-w-[2400px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
      <div>
        <h1 className="text-2xl font-bold">Trending</h1>
        <p className="text-xs text-muted-foreground">
          Most popular videos at the moment
        </p>
      </div>
      <TrendingVideoSections />
    </div>
  );
};
export default TrendingView;
