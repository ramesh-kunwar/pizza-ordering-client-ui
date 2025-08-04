"use client";
import React, { useEffect, useState } from "react";
import ToppingCard from "./topping-card";
import { Topping } from "@/lib/types";

const ToppingList = () => {
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
          throw new Error(
            "Backend URL is not configured. Please set NEXT_PUBLIC_BACKEND_URL in your .env.local file"
          );
        }

        const toppingResponse = await fetch(
          // todo: make tenantId dynamic
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=2`
        );

        if (!toppingResponse.ok) {
          throw new Error(
            `Failed to fetch toppings: ${toppingResponse.status} ${toppingResponse.statusText}`
          );
        }

        const toppings = await toppingResponse.json();

        setToppings(toppings);
      } catch (err) {
        console.error("Error fetching toppings:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch toppings"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [selectedToppings, setSelectedToppings] = React.useState<Topping[]>([]);

  const handleCheckBoxCheck = (topping: Topping) => {
    const isAlreadyExists = selectedToppings.some(
      (element: Topping) => element.id === topping.id
    );

    if (isAlreadyExists) {
      setSelectedToppings((prev) =>
        prev.filter((elm: Topping) => elm.id !== topping.id)
      );
      return;
    }

    setSelectedToppings((prev: Topping[]) => [...prev, topping]);
  };

  if (loading) {
    return (
      <section className="mt-6">
        <h3>Extra toppings</h3>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <p>Loading toppings...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-6">
        <h3>Extra toppings</h3>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-6">
      <h3>Extra toppings</h3>
      <div className="grid grid-cols-3 gap-4 mt-2">
        {toppings.map((topping) => {
          return (
            <ToppingCard
              topping={topping}
              key={topping.id}
              selectedToppings={selectedToppings}
              handleCheckBoxCheck={handleCheckBoxCheck}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ToppingList;
