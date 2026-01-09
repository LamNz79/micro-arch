import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prisma: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.checkDatabase(),
    ]);
  }

  async checkDatabase(): Promise<HealthIndicatorResult> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        database: {
          status: 'up',
        },
      };
    } catch (e: any) {
      throw new HealthCheckError(
        'Database check failed',
        { database: { status: 'down', message: e.message } },
      );
    }
  }
}
