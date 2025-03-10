import React from "react";
import { SubscriptionsVideoSections } from "../sections/subscriptions-video-section";

const SubscriptionsView: React.FC = () => {
  return (
    <div className="max-w-screen-md mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
      <div>
        <h1 className="text-2xl font-bold">All Subscriptions</h1>
        <p className="text-xs text-muted-foreground">
          View and manage all subscriptions
        </p>
      </div>
      <SubscriptionsVideoSections />
    </div>
  );
};
export default SubscriptionsView;
