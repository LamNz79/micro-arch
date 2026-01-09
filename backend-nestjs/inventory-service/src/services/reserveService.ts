import { ReserveStockRequestDto, ReserveStockResponseDto } from "@/dto/reserve-stock.dto";
import { PrismaService } from "@/prisma/prisma.service";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class ReserveService {
    private readonly logger = new Logger(ReserveService.name);

    constructor(private readonly prisma: PrismaService) { }
    async reserveStock(body: ReserveStockRequestDto): Promise<ReserveStockResponseDto> {
        const { productId, quantity } = body
        try {
            const result = await this.prisma.$transaction(async (tx) => {
                const product = await tx.product.findUnique({
                    where: { id: productId }
                });
                if (!product) {
                    return {
                        reserved: false,
                        reason: 'Product not found'
                    } as ReserveStockResponseDto
                }
                if (product.stock < quantity) {
                    return {
                        reserved: false,
                        reason: 'Insufficient stock'
                    } as ReserveStockResponseDto
                }
                await tx.product.update({
                    where: { id: productId },
                    data: { stock: product.stock - quantity }
                })
                return {
                    reserved: true,
                    reason: ""
                } as ReserveStockResponseDto
            });
            return result
        } catch (error) {
            this.logger.error("ReserveStock transaction error:", error);
            if (error instanceof AggregateError) {
                for (const e of error.errors) {
                    this.logger.error("  Inner error:", e);
                }
            }
            return {
                reserved: false,
                reason: "Internal error: see server logs",
            };

        }
    }
}
