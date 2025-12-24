const KONG_BASE_URL = "http://localhost:8000/api";

export async function healthCheck() {
    const res = await fetch(`${KONG_BASE_URL}/orders/health`);
    console.log(res);

    if (!res.ok) {
        throw new Error("Health check failed");
    }
    return res.json();
}

export async function createOrder() {
    const res = await fetch(`${KONG_BASE_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            productId: "demo-product",
            quantity: 1,
        }),
    });

    if (!res.ok) {
        throw new Error("Create order failed");
    }

    return res.json();
}
