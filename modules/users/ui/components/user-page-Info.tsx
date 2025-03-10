import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { useSubscriptions } from "@/modules/subscription/hooks/use-subscriptions";
import SubscriptionButton from "@/modules/subscription/ui/components/subscription-button";
import { useAuth, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { UserGetOneOutput } from "../../type";

type UserPageInfoProps = {
  users: UserGetOneOutput;
};

export const UserPageInfoSkeleton = () => {
  return (
    <div className="py-6">
      <div className="flex flex-col md:hidden">
        <div className="flex items-center gap-3">
          <Skeleton className="h-[60px] w-[60px] rounded-full" />
          <div className="flex-1 min-w-0">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48 mt-1" />
          </div>
        </div>
        <Skeleton className="h-10 w-full mt-3 rounded-full" />
      </div>
      <div className="hidden md:flex items-start gap-4">
        <Skeleton className="h-[160px] w-[160px] rounded-full" />
        <div className="flex-1 min-w-0">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-48 mt-4" />
          <Skeleton className="h-10 w-32 mt-3 rounded-full" />
        </div>
      </div>
    </div>
  );
};

const UserPageInfo: React.FC<UserPageInfoProps> = ({ users }) => {
  const { userId, isLoaded } = useAuth();
  const clerk = useClerk();

  const { isPending, onClick } = useSubscriptions({
    userId: users.id,
    isSubscribed: users.viewerSubscribed,
  });

  return (
    <div className="py-6">
      <div className="flex flex-col md:hidden">
        <div className="flex items-center gap-3">
          <UserAvatar
            size="lg"
            imageUrl={users.imageUrl}
            name={users.name}
            className="h-[60px] w-[60px]"
            onClick={() => {
              if (users.clerkId === userId) {
                clerk.openUserProfile();
              }
            }}
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold">{users.name}</h1>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <span>{users.subscriberCount} Subscribers</span>
              <span>&bull;</span>
              <span>{users.videoCount} Videos</span>
            </div>
          </div>
        </div>
        {userId === users.clerkId ? (
          <Button
            variant="secondary"
            asChild
            className="w-full mt-3 rounded-full"
          >
            <Link href="/studio">Go to studio</Link>
          </Button>
        ) : (
          <SubscriptionButton
            onClick={onClick}
            disabled={isPending || !isLoaded}
            isSubscribed={users.viewerSubscribed}
            className="w-full mt-3"
          />
        )}
      </div>
      <div className="hidden md:flex items-start gap-4">
        <UserAvatar
          size="xl"
          imageUrl={users.imageUrl}
          name={users.name}
          className={cn(
            userId === users.clerkId &&
              "cursor-pointer hover:opacity-80 transition-opacity duration-300"
          )}
          onClick={() => {
            if (users.clerkId === userId) {
              clerk.openUserProfile();
            }
          }}
        />
        <div className="flex-1 min-w-0">
          <h1 className="text-4xl font-bold">{users.name}</h1>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-3">
            <span>{users.subscriberCount} Subscribers</span>
            <span>&bull;</span>
            <span>{users.videoCount} Videos</span>
          </div>
          {userId === users.clerkId ? (
            <Button variant="secondary" asChild className="mt-3 rounded-full">
              <Link href="/studio">Go to studio</Link>
            </Button>
          ) : (
            <SubscriptionButton
              onClick={onClick}
              disabled={isPending || !isLoaded}
              isSubscribed={users.viewerSubscribed}
              className="mt-3"
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default UserPageInfo;
