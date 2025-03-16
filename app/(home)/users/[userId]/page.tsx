import FramerClient from "@/components/framer-client";
import { DEFAULT_LIMIT } from "@/constants";
import UserView from "@/modules/users/ui/views/user-view";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

type PageProps = {
  params: Promise<{
    userId: string;
  }>;
};

const Page: React.FC<PageProps> = async ({ params }) => {
  const { userId } = await params;
  void trpc.users.getOne.prefetch({
    id: userId,
  });
  void trpc.videos.getMany.prefetchInfinite({ userId, limit: DEFAULT_LIMIT });

  return (
    <HydrateClient>
      <FramerClient>
        <UserView userId={userId} />
      </FramerClient>
    </HydrateClient>
  );
};
export default Page;
