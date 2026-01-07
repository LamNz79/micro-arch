import { HttpService } from '@nestjs/axios';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, timeout, retry } from 'rxjs';

@Injectable()
export class InventoryClient {
    private readonly baseURL: string;
    private readonly timeoutMs: number;
    constructor(
        private readonly http: HttpService,
        private readonly config: ConfigService
    ) {
        this.baseURL = this.config.get<string>(
            'INVENTORY_BASE_URL',
            'http://backend-inventory:3002'
        );
        this.timeoutMs = Number(this.config.get<number>(
            'INVENTORY_TIMEOUT_MS',
            2000
        ))
    }
    async reserveStock(productId: string, quantity: number) {
        try {
            const response = await firstValueFrom(
                this.http.post(`${this.baseURL}/reserve`, { productId, quantity })
                    .pipe(
                        timeout(this.timeoutMs),
                        retry(1),
                    )
            );
            return response.data;
        } catch (err) {
            console.log(err);

            // Infrastructure failure (NOT business failure)
            throw new ServiceUnavailableException(
                'Inventory service unavailable'
            );
        }
    }
}
