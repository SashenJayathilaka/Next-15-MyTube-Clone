import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/user-avatar";
import React from "react";
import SubscriptionButton from "./subscription-button";

type SubscriptionsItemsProps = {
  name: string;
  imageUrl: string;
  subscriptionCount: number;
  onUnSubscribe: () => void;
  disabled: boolean;
};

export const SubscriptionsItemsSkeleton = () => {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="size-10 rounded-full" />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-1 h-3 w-20" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </div>
  );
};

const SubscriptionsItems: React.FC<SubscriptionsItemsProps> = ({
  disabled,
  imageUrl,
  name,
  onUnSubscribe,
  subscriptionCount,
}) => {
  return (
    <div className="flex items-center gap-4">
      <UserAvatar size="lg" imageUrl={imageUrl} name={name} />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm">{name}</h3>
            <p className="text-xs text-muted-foreground">
              {subscriptionCount.toLocaleString()} subscribers
            </p>
          </div>
          <SubscriptionButton
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onUnSubscribe();
            }}
            disabled={disabled}
            isSubscribed
          />
        </div>
      </div>
    </div>
  );
};
export default SubscriptionsItems;
