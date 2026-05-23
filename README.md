# AI Native Studio Frontend

Modernes Angular-Frontend für eine AI-Tech-Agentur/SaaS-Website rund um Vibe Coding, KI-Agenten und Fine-Tuning.

## Start

```bash
npm install
npm start
```

Die App läuft standardmäßig unter `http://localhost:4200/`.

## Backend

```bash
cd backend
npm install
cp .env.example .env
npm run db:setup
npm run dev
```

Die API läuft unter `http://localhost:3000/api` und erlaubt CORS für
`http://localhost:4200`.

## Geschützter KI Workspace

Route: `http://localhost:4200/ki-workspace`

Initialer Account aus `backend/.env`:

```text
E-Mail: demo@ai.local
Passwort: siehe INITIAL_USER_PASSWORD
```

Die Authentifizierung nutzt echte PostgreSQL-Accounts im Express-Backend unter `environment.authEndpoint`. Der KI Workspace ruft `environment.aiEndpoint` mit dem gespeicherten Bearer Token auf.

## Build

```bash
npm run build
```

Der Produktionsbuild wird nach `dist/website-vibecoding/browser` geschrieben.

## Struktur

```text
src/app/
  core/
    models/
    services/
    guards/
    interceptors/
  data/
    content.ts
  features/
    ai-agents/
    contact/
    fine-tuning/
    home/
    vibe-coding/
    visuals/
  layout/
    footer/
    navbar/
    page-shell/
  shared/
    components/
    directives/
    pipes/
```

Content liegt in `src/app/data/content.ts`. Auth, Kontakt und KI Workspace nutzen REST-Endpunkte aus `src/environments/environment.ts`.
