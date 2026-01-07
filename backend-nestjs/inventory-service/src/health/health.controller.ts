import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck, HealthCheckError } from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prismaService: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () => {
        try {
          await this.prismaService.$queryRaw`SELECT 1`;
          return { database: { status: 'up' } };
        } catch (e) {
          const message = e instanceof Error ? e.message : 'Unknown error';
          throw new HealthCheckError('Database check failed', { database: { status: 'down', message } });
        }
      },
    ]);
  }
}
