# Website Vibecoding Backend

Express-TypeScript-API für das Angular-Frontend mit PostgreSQL-Accounts, bcrypt-Passwort-Hashing und JWT-Auth.

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run db:setup
npm run dev
```

Die API läuft standardmäßig unter `http://127.0.0.1:3000/api` und ist über
`http://localhost:3000/api` erreichbar.

## Scripts

```bash
npm run db:migrate
npm run db:seed
npm run db:setup
npm run dev
npm run build
npm start
```

## Account Seed

Der erste Account wird über Environment Variables erzeugt:

```bash
INITIAL_USER_EMAIL=demo@ai.local
INITIAL_USER_PASSWORD=demo1234-change-me
INITIAL_USER_DISPLAY_NAME="Demo User"
```

`npm run db:seed` legt diesen Account an oder aktualisiert sein Passwort.

## Render PostgreSQL

Lege bei Render eine PostgreSQL-Datenbank an und setze im Backend Web Service:

```text
DATABASE_URL=<Internal Database URL oder External Database URL>
DATABASE_SSL=true
JWT_SECRET=<mindestens 32 Zeichen>
CORS_ORIGIN=https://websitevibecoding-1.onrender.com
HOST=0.0.0.0
```

Backend Build Command für den ersten Deploy:

```bash
npm ci && npm run db:setup && npm run build
```

Wenn der Initial-User nicht bei jedem Deploy aktualisiert werden soll, nutze danach:

```bash
npm ci && npm run db:migrate && npm run build
```

## Endpoints

- `GET /api/health`
- `POST /api/auth/login`
- `POST /api/auth/register` wenn `ALLOW_REGISTRATION=true`
- `POST /api/contact`
- `POST /api/ai/generate` mit `Authorization: Bearer <token>`
