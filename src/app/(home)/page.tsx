import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProductCard from "./components/product-card";
import { Category, Product } from "@/lib/types";

const Home = async () => {
  const categoryResponse = await fetch(
    `${process.env.BACKEND_URL}/api/catalog/categories`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!categoryResponse.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories: Category[] = await categoryResponse.json();

  // TODO: add dynamic tenant id
  const productResponse = await fetch(
    `${process.env.BACKEND_URL}/api/catalog/products?perPage=100&tenantId=2`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!productResponse.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: { data: Product[] } = await productResponse.json();
  return (
    <>
      <section className="bg-white">
        <div className="container flex items-center justify-between py-24 mx-auto">
          <div>
            <h1 className="text-7xl font-black font-sans leading-2">
              Super Delicious Pizza in <br />
              <span className="text-primary">Only 45 Minutes!</span>
            </h1>
            <p className="text-2xl mt-8 max-w-lg leading-snug">
              Enjoy a Free Meal if Your Order Takes More Than 45 Minutes!
            </p>
            <Button className="mt-8 text-lg rounded-full py-7 px-6 font-bold">
              Get your pizza now
            </Button>
          </div>
          <div>
            <Image
              alt="pizza-main"
              src={"/pizza-main.png"}
              width={400}
              height={400}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto py-12">
          <section>
            <div className="container py-12">
              <Tabs defaultValue={categories[0]._id}>
                <TabsList>
                  {categories.map((category) => {
                    return (
                      <TabsTrigger
                        key={category._id}
                        value={category._id}
                        className="text-md"
                      >
                        {category.name}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
                {categories.map((category) => {
                  return (
                    <TabsContent key={category._id} value={category._id}>
                      <div className="grid grid-cols-4 gap-6 mt-6">
                        {products.data
                          .filter(
                            (product) => product.category._id === category._id
                          )
                          .map((product) => (
                            <ProductCard product={product} key={product._id} />
                          ))}
                      </div>
                    </TabsContent>
                  );
                })}
              </Tabs>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Home;
