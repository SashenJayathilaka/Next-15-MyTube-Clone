import { DEFAULT_LIMIT } from "@/constants";
import SubscriptionsView from "@/modules/subscription/ui/views/subscriptions-view";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

const Page: React.FC = async () => {
  void trpc.subscriptions.getMany.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });

  return (
    <HydrateClient>
      <SubscriptionsView />
    </HydrateClient>
  );
};
export default Page;
