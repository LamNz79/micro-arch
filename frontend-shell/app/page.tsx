"use client";

import InventoryLayout from "@/src/feature/inventory/inventoryLayout";
import OrderLayout from "@/src/feature/order/orderLayout";
import { createInventory, createOrder, inventoryHealthCheck, orderHealthCheck } from "@/src/lib/api";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  async function checkOrderHealth() {
    setError(null);
    try {
      const data = await orderHealthCheck();
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    }
  }

  async function handleCreateOrder() {
    setError(null);
    try {
      const data = await createOrder();
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    }
  }
  async function checkInventoryHealth() {
    setError(null);
    try {
      const data = await inventoryHealthCheck();
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    }
  }

  async function handleCreateInventory() {
    setError(null);
    try {
      const data = await createInventory();
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Orders System Test</h1>

      <OrderLayout
        checkOrderHealth={checkOrderHealth}
        handleCreateOrder={handleCreateOrder}
        error={error}
        result={result} />
      <InventoryLayout
        checkInventoryHealth={checkInventoryHealth}
        handleCreateInventory={handleCreateInventory}
        error={error}
        result={result} />
    </main>
  );
}
