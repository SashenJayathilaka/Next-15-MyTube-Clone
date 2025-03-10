"use client";

import InfiniteScroll from "@/components/infinite-scroll";
import { DEFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "sonner";
import SubscriptionsItems, {
  SubscriptionsItemsSkeleton,
} from "../components/subscriptions-items";

export const SubscriptionsVideoSections = () => {
  return (
    <Suspense fallback={<SubscriptionsVideosSectionsSkeleton />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <SubscriptionsVideoSectionsSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const SubscriptionsVideosSectionsSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 gap-y">
        {Array.from({ length: 10 }).map((_, index) => (
          <SubscriptionsItemsSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

const SubscriptionsVideoSectionsSuspense: React.FC = () => {
  const utils = trpc.useUtils();
  const [subscriptions, resultQuery] =
    trpc.subscriptions.getMany.useSuspenseInfiniteQuery(
      { limit: DEFAULT_LIMIT },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const unsubscribe = trpc.subscriptions.remove.useMutation({
    onSuccess: (data) => {
      toast.success("Unsubscribed");
      utils.subscriptions.getMany.invalidate();
      utils.videos.getManySubscribe.invalidate();
      utils.users.getOne.invalidate({ id: data.creatorId });
    },
    onError: () => {
      toast.error("An error occurred");
    },
  });

  return (
    <div>
      <div className="flex flex-col gap-4 gap-y">
        {subscriptions.pages
          .flatMap((page) => page.items)
          .map((subscriptions) => (
            <Link
              prefetch
              key={subscriptions.creatorId}
              href={`/users/${subscriptions.user.id}`}
            >
              <SubscriptionsItems
                name={subscriptions.user.name}
                imageUrl={subscriptions.user.imageUrl}
                subscriptionCount={subscriptions.user.subscriberCount}
                onUnSubscribe={() => {
                  unsubscribe.mutate({ userId: subscriptions.creatorId });
                }}
                disabled={unsubscribe.isPending}
              />
            </Link>
          ))}
      </div>
      <InfiniteScroll
        hasNextPage={resultQuery.hasNextPage}
        isFetchingNextPage={resultQuery.isFetchingNextPage}
        fetchNextPage={resultQuery.fetchNextPage}
      />
    </div>
  );
};
