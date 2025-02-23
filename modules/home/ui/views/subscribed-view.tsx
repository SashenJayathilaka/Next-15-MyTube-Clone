import React from "react";
import { SubscribedVideoSections } from "../sections/subscribed-video-sections";

const SubscribedView: React.FC = () => {
  return (
    <div className="max-w-[2400px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
      <div>
        <h1 className="text-2xl font-bold">Subscribed</h1>
        <p className="text-xs text-muted-foreground">
          Videos from your favorites creators
        </p>
      </div>
      <SubscribedVideoSections />
    </div>
  );
};
export default SubscribedView;
