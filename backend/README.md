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
DATABASE_SSL=false
JWT_SECRET=<mindestens 32 Zeichen>
CORS_ORIGIN=https://websitevibecoding-1.onrender.com
HOST=0.0.0.0
OPENAI_API_KEY=<dein OpenAI API-Key>
OPENAI_MODEL=gpt-5.5
OPENAI_VECTOR_STORE_ID=<optional vorhandene Vector Store ID>
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
- `POST /api/ai/vector-store/create` mit `Authorization: Bearer <token>`, optional Body `{ "name": "..." }`
- `POST /api/ai/files/upload` mit `Authorization: Bearer <token>`, Multipart-Feld `file`, erlaubt PDF/TXT/MD/DOCX
- `POST /api/ai/chat` mit `Authorization: Bearer <token>`, Body `{ "message": "..." }`, Response `{ "reply": "..." }`
- `POST /api/contact`
- `POST /api/ai/generate` mit `Authorization: Bearer <token>`

## RAG Upload und Chat

Vector Store anlegen:

```bash
curl -X POST http://localhost:3000/api/ai/vector-store/create \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Website Wissen"}'
```

Dokument hochladen:

```bash
curl -X POST http://localhost:3000/api/ai/files/upload \
  -H "Authorization: Bearer <token>" \
  -F "file=@/pfad/zur/datei.pdf"
```

RAG-Chat testen:

```bash
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"message":"Was steht in meinen Dokumenten zu ...?"}'
```

`/api/ai/chat` ist rate-limited und nutzt `file_search` mit dem aktiven Vector Store. Wenn keine passende Information gefunden wird, antwortet die KI entsprechend ehrlich.
