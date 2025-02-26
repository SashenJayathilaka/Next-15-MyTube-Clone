import React from "react";
import { HistoryVideoSections } from "../sections/history-video-section";

const HistoryView: React.FC = () => {
  return (
    <div className="max-w-screen-md mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
      <div>
        <h1 className="text-2xl font-bold">History</h1>
        <p className="text-xs text-muted-foreground">Video You have watched</p>
      </div>
      <HistoryVideoSections />
    </div>
  );
};
export default HistoryView;
