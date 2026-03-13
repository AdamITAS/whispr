# 🚀 Whispr — Guida Setup Completa

## Cosa ti serve (tutto gratis)
- VS Code ✅
- Account GitHub → https://github.com
- Account Supabase → https://supabase.com
- Account Vercel → https://vercel.com

---

## STEP 1 — Installa gli strumenti

1. Installa **Node.js** da https://nodejs.org (versione LTS)
2. Installa **Git** da https://git-scm.com
3. Apri il terminale in VS Code → `Terminal > New Terminal`
4. Verifica che funzioni:
   ```
   node -v
   git -v
   ```
   Devono comparire dei numeri di versione.

5. Installa Vercel CLI:
   ```
   npm install -g vercel
   ```

---

## STEP 2 — Crea il database su Supabase

1. Vai su https://supabase.com → **Start your project**
2. Crea un account e un nuovo progetto (nome: `whispr`, password qualsiasi, regione Europe)
3. Aspetta ~2 minuti che il progetto si crei
4. Nel menu a sinistra clicca **SQL Editor**
5. Incolla questo codice e clicca **Run**:

```sql
create table messages (
  id uuid default gen_random_uuid() primary key,
  username text not null,
  text text not null,
  created_at timestamp with time zone default now()
);

-- permette lettura e scrittura pubblica (anonima)
alter table messages enable row level security;

create policy "chiunque può leggere" on messages
  for select using (true);

create policy "chiunque può scrivere" on messages
  for insert with check (true);
```

6. Vai su **Project Settings** (ingranaggio in basso a sinistra) → **API**
7. Copia questi due valori — ti serviranno dopo:
   - `Project URL` → es. https://xxxxx.supabase.co
   - `anon public` key → una stringa lunga

---

## STEP 3 — Carica il progetto su GitHub

1. Vai su https://github.com → **New repository**
2. Nome: `whispr`, visibilità: **Public**, clicca **Create**
3. In VS Code, apri la cartella `whispr` che hai scaricato
4. Nel terminale:
   ```
   git init
   git add .
   git commit -m "primo commit"
   git branch -M main
   git remote add origin https://github.com/TUONOMEUTENTE/whispr.git
   git push -u origin main
   ```
   (sostituisci TUONOMEUTENTE con il tuo username GitHub)

---

## STEP 4 — Deploy su Vercel

1. Vai su https://vercel.com → **Add New Project**
2. Clicca **Import** sul repository `whispr` che hai appena creato
3. Prima di cliccare Deploy, clicca **Environment Variables** e aggiungi:

   | Nome | Valore |
   |------|--------|
   | `SUPABASE_URL` | il Project URL copiato prima |
   | `SUPABASE_ANON_KEY` | la anon key copiata prima |

4. Clicca **Deploy** → aspetta ~1 minuto
5. Vercel ti darà un link tipo `whispr.vercel.app` → **il sito è live!**

---

## STEP 5 — Aggiornamenti futuri

Ogni volta che modifichi il codice in VS Code:
```
git add .
git commit -m "aggiornamento"
git push
```
Vercel fa il deploy automaticamente in ~30 secondi.

---

## Struttura del progetto

```
whispr/
├── api/
│   └── messages.js     ← backend (API)
├── public/
│   └── index.html      ← frontend (il sito)
├── package.json
├── vercel.json
└── README.md
```

---

## Come funziona

- **Inviare un messaggio**: scrivi @username e il testo → completamente anonimo
- **Vedere messaggi**: cerca @username → vedi tutti i messaggi ricevuti
- **Database**: tutto salvato su Supabase, sempre attivo 24/7
- **Hosting**: Vercel, sempre attivo 24/7, deploy automatico da GitHub

---

## Hai problemi?

Scrivi l'errore che vedi e ti aiuto a risolvere!
