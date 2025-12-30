export class ReserveStockRequestDto {
    productId!: string;
    quantity!: number;
}

export class ReserveStockResponseDto {
    reserved!: boolean;
    reason?: string;
}
