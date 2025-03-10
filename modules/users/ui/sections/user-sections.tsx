"use client";

import { Separator } from "@/components/ui/separator";
import { trpc } from "@/trpc/client";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import UserPageBanner, {
  UserPageBannerSkeletons,
} from "../components/user-page-banner";
import UserPageInfo, {
  UserPageInfoSkeleton,
} from "../components/user-page-Info";

type UserSectionsProps = {
  userId: string;
};

export const UserSections: React.FC<UserSectionsProps> = ({ userId }) => {
  return (
    <Suspense fallback={<UserSectionsSkeleton />}>
      <ErrorBoundary fallback={<p>error...</p>}>
        <UserSectionsSuspense userId={userId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const UserSectionsSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col">
      <UserPageBannerSkeletons />
      <UserPageInfoSkeleton />
    </div>
  );
};

const UserSectionsSuspense: React.FC<UserSectionsProps> = ({ userId }) => {
  const [users] = trpc.users.getOne.useSuspenseQuery({ id: userId });

  return (
    <div className="flex flex-col">
      <UserPageBanner users={users} />
      <UserPageInfo users={users} />
      <Separator />
    </div>
  );
};
