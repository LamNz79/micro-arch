import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck, HttpHealthIndicator } from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private config: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    const inventoryBaseUrl = this.config.get<string>(
      'INVENTORY_BASE_URL',
      'http://backend-inventory:3002',
    );
    return this.health.check([
      () => this.http.pingCheck('inventory-service', `${inventoryBaseUrl}/health`),
    ]);
  }
}
