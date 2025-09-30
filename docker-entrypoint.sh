#!/bin/sh
set -e

echo "🚀 Запуск SK приложения..."

# Ждем готовности базы данных
echo "⏳ Ожидание готовности PostgreSQL..."
until pg_isready -h postgres -p 5432 -U sk_user; do
  echo "PostgreSQL еще не готов - ждем..."
  sleep 2
done

echo "✅ PostgreSQL готов!"

# Запускаем миграции Prisma
echo "🔄 Запуск миграций базы данных..."
npx prisma migrate deploy

# Prisma клиент уже сгенерирован во время сборки
echo "🔧 Prisma клиент готов..."

echo "🎉 Инициализация завершена! Запуск приложения..."

# Запускаем приложение
exec "$@"