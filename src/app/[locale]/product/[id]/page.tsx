import CustomizedProducts from "@/components/CustomizedProducts";
import ProductImages from "@/components/ProductImages";
import React from "react";

const page = () => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* photo gallary */}
        <div className="lg:col-span-1 space-y-4">
          <div className="lg:sticky top-24">
            <ProductImages />
          </div>
        </div>
        {/* product discription */}
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-4xl font-medium">Product name</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            voluptatem est illo doloribus eveniet cupiditate obcaecati? Qui
            dignissimos reprehenderit nulla deleniti laborum quos optio placeat,
            fuga excepturi eligendi minima ratione!
          </p>
          <div className="h-[2px] bg-gray-200" />
          <div className="flex items-center gap-4">
            <h3 className="text-xl line-through">$50</h3>
            <h2 className="font-medium text-2xl">$20</h2>
          </div>
          <div className="h-[2px] bg-gray-200" />
          <CustomizedProducts />
          <div className="h-[2px] bg-gray-200" />
          {/* prduct specificaion(s) */}
          <div className="text-sm">
            <h4 className="font-medium mb-4">Title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
              consectetur nulla, sapiente neque accusamus quidem nostrum
              doloremque consequatur assumenda, minima impedit ducimus sequi
              eligendi. Quidem recusandae incidunt officia reiciendis modi.
            </p>
          </div>
          <div className="text-sm">
            <h4 className="font-medium mb-4">Title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
              consectetur nulla, sapiente neque accusamus quidem nostrum
              doloremque consequatur assumenda, minima impedit ducimus sequi
              eligendi. Quidem recusandae incidunt officia reiciendis modi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
