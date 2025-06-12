// app/search/page.tsx
import { Suspense } from "react";
import SearchPage from "@/components/pages/SearchPage";

export default function SearchPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center">Loading search results...</div>
      }
    >
      <SearchPage />
    </Suspense>
  );
}
