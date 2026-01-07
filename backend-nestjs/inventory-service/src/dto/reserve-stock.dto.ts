import { IsString, IsNotEmpty, IsNumber, IsBoolean } from "class-validator";

export class ReserveStockRequestDto {
    @IsString()
    @IsNotEmpty()
    readonly productId: string = '';
    @IsNumber()
    @IsNotEmpty()
    readonly quantity: number = 0;
}

export class ReserveStockResponseDto {
    @IsBoolean()
    @IsNotEmpty()
    reserved!: boolean;
    @IsString()
    reason?: string;
}
