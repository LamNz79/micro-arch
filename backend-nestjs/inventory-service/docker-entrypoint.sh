#!/bin/sh
set -e

echo "=== Debug Info ==="
echo "Current directory: $(pwd)"
echo "Environment variables:"
env | grep -i database || echo "No DATABASE_URL found"
echo "==================="

if [ -z "$DATABASE_URL" ]; then
    echo "ERROR: DATABASE_URL is not set!"
    echo "Please check docker-compose.yml environment configuration"
    exit 1
fi

echo "Waiting for database..."
sleep 10

echo "Running database migrations..."
npx prisma migrate deploy --schema=/app/prisma/schema.prisma


echo "Starting application..."
exec node -r module-alias/register dist/main.js
