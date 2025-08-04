import React from "react";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader } from "./ui/card";

const OffersSkeleton = () => {
  return (
    <div className="mt-5 mx-5">
      {/* Title skeleton */}
      <div className="text-center my-5">
        <Skeleton className="h-8 w-32 mx-auto" />
      </div>

      {/* Products grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-items-center">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Card
            key={idx}
            className="p-0 max-w-xs w-full shadow-none border-none"
          >
            <CardHeader className="border-b border-border p-4 [.border-b]:pb-4 relative">
              {/* Image skeleton */}
              <Skeleton className="w-[300px] h-[300px] mx-auto" />
              {/* Badge skeleton */}
              <Skeleton className="absolute bottom-2 left-2 w-20 h-6 rounded" />
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid gap-2 text-center items-center">
                <div className="grid">
                  {/* Product name skeleton */}
                  <Skeleton className="h-4 w-32 mx-auto mb-2" />
                  {/* Description skeleton */}
                  <Skeleton className="h-3 w-48 mx-auto" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  {/* Price skeletons */}
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-4 w-4" />
                </div>
              </div>
              {/* Button skeleton */}
              <Skeleton className="w-full h-10 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OffersSkeleton;
