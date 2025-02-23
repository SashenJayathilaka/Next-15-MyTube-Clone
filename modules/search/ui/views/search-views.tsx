import React from "react";
import { CategoriesSection } from "../sections/category-sections";
import ResultSections from "../sections/result-sections";

type SearchViewProps = {
  query: string | undefined;
  categoryId: string | undefined;
};

const SearchView: React.FC<SearchViewProps> = ({ categoryId, query }) => {
  return (
    <div className="max-w-[1300px] mx-auto mb-10 flex flex-col gap-y-6 px-4 pt-2.5">
      <CategoriesSection categoryId={categoryId} />
      <ResultSections query={query} categoryId={categoryId} />
    </div>
  );
};
export default SearchView;
