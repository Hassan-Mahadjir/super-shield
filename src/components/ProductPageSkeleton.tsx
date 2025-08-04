import React from "react";
import { Skeleton } from "./ui/skeleton";

const ProductPageSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Photo gallery skeleton */}
        <div className="lg:col-span-1 space-y-4">
          <div className="lg:sticky top-24">
            {/* Main image skeleton */}
            <Skeleton className="w-full h-96 rounded-lg mb-4" />
            {/* Thumbnail images skeleton */}
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} className="w-full h-20 rounded" />
              ))}
            </div>
          </div>
        </div>

        {/* Product description skeleton */}
        <div className="lg:col-span-2 space-y-4">
          {/* Product title skeleton */}
          <Skeleton className="h-10 w-3/4" />

          {/* Product description skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          {/* Divider */}
          <div className="h-[2px] bg-gray-200" />

          {/* Price skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-6 w-6" />
          </div>

          {/* Divider */}
          <div className="h-[2px] bg-gray-200" />

          {/* Customization form skeleton */}
          <div className="space-y-6">
            {/* Form title */}
            <Skeleton className="h-6 w-48" />

            {/* Form fields */}
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>

            {/* Submit button skeleton */}
            <Skeleton className="h-12 w-full rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
