import { DEFAULT_LIMIT } from "@/constants";
import SearchView from "@/modules/search/ui/views/search-views";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{
    query: string | undefined;
    categoryId: string | undefined;
  }>;
};

const Page: React.FC<PageProps> = async ({ searchParams }) => {
  const { query, categoryId } = await searchParams;

  void trpc.categories.getMany.prefetch();
  void trpc.search.getMany.prefetchInfinite({
    query,
    categoryId: categoryId,
    limit: DEFAULT_LIMIT,
  });

  return (
    <HydrateClient>
      <SearchView query={query} categoryId={categoryId} />
    </HydrateClient>
  );
};
export default Page;
