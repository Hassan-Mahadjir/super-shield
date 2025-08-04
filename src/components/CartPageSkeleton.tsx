import React from "react";
import { Skeleton } from "./ui/skeleton";
import { Card } from "./ui/card";

const CartPageSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="h-[15vh]" />

      {/* Header skeleton */}
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-48" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items List skeleton */}
        <div className="lg:col-span-2 space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Card key={idx} className="p-4">
              <div className="flex gap-4">
                {/* Image skeleton */}
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Skeleton className="w-20 h-20 rounded" />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  {/* Product info skeleton */}
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        {/* Product name skeleton */}
                        <Skeleton className="h-6 w-32 mb-2" />
                        {/* Description skeleton */}
                        <div className="space-y-1">
                          <Skeleton className="h-3 w-48" />
                          <Skeleton className="h-3 w-40" />
                          <Skeleton className="h-3 w-36" />
                        </div>
                      </div>
                      {/* Price skeleton */}
                      <div className="flex items-center gap-1">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  {/* Quantity controls skeleton */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded" />
                      <Skeleton className="h-6 w-8" />
                      <Skeleton className="h-8 w-8 rounded" />
                    </div>
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary skeleton */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            {/* Summary title */}
            <Skeleton className="h-6 w-32 mb-4" />

            <div className="space-y-4">
              {/* Items count skeleton */}
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <div className="flex items-center gap-1">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-4" />
                </div>
              </div>

              {/* Discount skeleton */}
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <div className="flex items-center gap-1">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-4" />
                </div>
              </div>

              {/* Coupon input skeleton */}
              <div className="flex flex-col gap-2 mb-2">
                <div className="flex gap-2">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-20" />
                </div>
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-gray-200" />

              {/* Total skeleton */}
              <div className="flex justify-between font-semibold">
                <Skeleton className="h-5 w-12" />
                <div className="flex items-center gap-1">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-4" />
                </div>
              </div>

              {/* Checkout button skeleton */}
              <div className="pt-4">
                <Skeleton className="h-12 w-full rounded" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPageSkeleton;
