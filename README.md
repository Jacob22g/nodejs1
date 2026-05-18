# nodejs1

A REST API built with Express, TypeScript, Prisma, and PostgreSQL. Features JWT authentication and protected item management.

## Stack

- **Runtime**: Node.js 20+
- **Framework**: Express 5
- **Language**: TypeScript
- **ORM**: Prisma 7 with PostgreSQL
- **Auth**: JWT (jsonwebtoken)

## Getting Started

### Prerequisites

- Node.js >= 20.19.0
- PostgreSQL (or use the provided Docker Compose)

### 1. Install dependencies

```bash
npm install
```

### 2. Start the database

```bash
docker-compose up -d
```

### 3. Set environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://admin:admin123@localhost:5432/nodejs1
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=7d
PORT=3000
```

### 4. Run migrations and generate Prisma client

```bash
npx prisma migrate deploy
npx prisma generate
```

### 5. Start the dev server

```bash
npm run dev
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled app from `dist/` |

## API

### Health (public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Returns service status |
| GET | `/` | Same as `/health` |

Response:
```json
{ "status": "ok" }
```

### Auth (public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive a JWT |

#### Register

```json
POST /auth/register
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login

```json
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{ "token": "<jwt>" }
```

### Items (protected)

All `/items` routes require the header:
```
Authorization: Bearer <token>
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/items` | Get all items |
| GET | `/items/:id` | Get item by ID |
| POST | `/items` | Create an item |
| PUT | `/items/:id` | Update an item |
| DELETE | `/items/:id` | Delete an item |

#### Create Item

```json
POST /items
{
  "name": "Item name",
  "description": "Item description",
  "score": 90
}
```

## Deployment (Railway)

The app is configured for Railway via `railway.toml`. Set the following environment variables in the Railway dashboard:

- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `PORT` (Railway sets this automatically)
