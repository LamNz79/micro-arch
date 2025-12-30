// contracts/inventory.contract.ts

export interface InventoryReserveRequest {
    productId: string;
    quantity: number;
    orderRequestId: string;
}

export interface InventoryReserveResponse {
    success: boolean;
    reason?: 'OUT_OF_STOCK' | 'UNKNOWN_ERROR';
}
