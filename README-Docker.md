# 🐳 Запуск SK приложения в Docker

## Быстрый старт

### 1. Подготовка переменных окружения

Скопируйте файл с примером переменных окружения:
```bash
cp .env.docker .env
```

Отредактируйте `.env` файл и заполните необходимые значения:
- `OPENAI_API_KEY` - ваш API ключ OpenAI
- `VND_VECTOR_STORE_ID` - ID вашего VND vector store
- `LEGAL_VECTOR_STORE_ID` - ID вашего Legal vector store
- `NEXTAUTH_SECRET` - секретный ключ для NextAuth (сгенерируйте случайную строку)

### 2. Запуск приложения

```bash
# Сборка и запуск всех сервисов
docker-compose up --build

# Или в фоновом режиме
docker-compose up -d --build
```

### 3. Доступ к приложению

- **Приложение**: http://localhost:3000
- **pgAdmin**: http://localhost:5050 (admin@admin.com / admin)

## Управление контейнерами

```bash
# Остановка всех сервисов
docker-compose down

# Остановка с удалением volumes (ВНИМАНИЕ: удалит все данные БД!)
docker-compose down -v

# Просмотр логов
docker-compose logs -f

# Просмотр логов конкретного сервиса
docker-compose logs -f app
docker-compose logs -f postgres

# Перезапуск конкретного сервиса
docker-compose restart app
```

## Структура сервисов

### PostgreSQL Database
- **Порт**: 5432
- **База данных**: sk_database
- **Пользователь**: sk_user
- **Пароль**: sk_password

### Next.js Application
- **Порт**: 3000
- **Автоматические миграции**: Да
- **Healthcheck**: Встроен

### pgAdmin (опционально)
- **Порт**: 5050
- **Email**: admin@admin.com
- **Пароль**: admin

## Troubleshooting

### Проблемы с подключением к базе данных
```bash
# Проверьте статус контейнеров
docker-compose ps

# Проверьте логи PostgreSQL
docker-compose logs postgres

# Перезапустите сервисы
docker-compose restart
```

### Проблемы с миграциями
```bash
# Выполните миграции вручную
docker-compose exec app npx prisma migrate deploy

# Сгенерируйте Prisma клиент
docker-compose exec app npx prisma generate
```

### Очистка и пересборка
```bash
# Остановите все контейнеры
docker-compose down

# Удалите образы
docker-compose down --rmi all

# Пересоберите с нуля
docker-compose up --build --force-recreate
```

## Интеграция с существующими контейнерами

Ваши существующие контейнеры PostgreSQL не будут затронуты, так как:
- Используются разные порты (5432 для нового, ваши на других портах)
- Используется отдельная Docker сеть `sk-network`
- Разные имена контейнеров

Если хотите использовать существующий PostgreSQL контейнер:
1. Измените `DATABASE_URL` в `.env` файле
2. Удалите секцию `postgres` из `docker-compose.yml`
3. Убедитесь, что ваш PostgreSQL доступен из Docker сети

## Переменные окружения

| Переменная | Описание | Обязательная |
|------------|----------|--------------|
| `OPENAI_API_KEY` | API ключ OpenAI | ✅ |
| `VND_VECTOR_STORE_ID` | ID VND vector store | ✅ |
| `LEGAL_VECTOR_STORE_ID` | ID Legal vector store | ✅ |
| `NEXTAUTH_SECRET` | Секрет для NextAuth | ✅ |
| `NEXTAUTH_URL` | URL приложения | ✅ |
| `DATABASE_URL` | URL подключения к БД | ✅ |