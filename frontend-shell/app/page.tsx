"use client";

import { createOrder, healthCheck } from "@/src/lib/api";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function checkHealth() {
    setError(null);
    try {
      const data = await healthCheck();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleCreateOrder() {
    setError(null);
    try {
      const data = await createOrder();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Orders System Test</h1>

      <button onClick={checkHealth}>
        Check Health
      </button>

      <button onClick={handleCreateOrder} style={{ marginLeft: 12 }}>
        Create Order
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </main>
  );
}
