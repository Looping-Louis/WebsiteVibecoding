# Website Vibecoding Backend

Simple Express-TypeScript-API für das Angular-Frontend.

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Die API läuft standardmäßig unter `http://127.0.0.1:3000/api` und ist über
`http://localhost:3000/api` erreichbar.

## Scripts

```bash
npm run dev
npm run build
npm start
```

## Demo Login

```text
E-Mail: demo@ai.local
Passwort: demo1234
```

## Endpoints

- `GET /api/health`
- `POST /api/auth/login`
- `POST /api/contact`
- `POST /api/ai/generate` mit `Authorization: Bearer <token>`
