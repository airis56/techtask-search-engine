# techtask-search-engine
Homework assignment for an internship - a game search engine.

## Available at
You can find the hosted application [https://enebatask.skalskis.me](https://enebatask.skalskis.me).
The [https://enebatask.skalskis.me](https://api.enebatask.skalskis.me) is also available for fetching JSON. There are two public API endpoints:
- GET `/list` - returns a list of all games
- GET `/list?search=query` - returns a list of games matching the search query

## Features

### Fuzzy searching
Database-level fuzzy search, powered by PostgreSQL [pg_trgm](https://www.postgresql.org/docs/current/static/pgtrgm.html).
- Finds games that are similar to the search query, 
including typos, e.g. "red ded" will return "Red Dead Redemption 2", "ffa" will return "FIFA", etc.
- Supports short aliases and abbreviations, assigned in the database, so queries like "rdr" will return "Red Dead Redemption 2",
"football" will return "FIFA", "sf" will return "Split Fiction".

### Public game catalog API
A public, read-only REST API for fetching game data.
- GET `/list` - returns a list of all games
- GET `/list?search=` - returns a list of games matching the search query
- Designed to be consumed by any frontend or external services

### Rate limiting
- Rate limiter is implemented using `express-rate-limit` middleware.
- Requests are limited to 100 requests per minute.

### UI
- Card-based responsive layout
- Uses hover states for additional information
- Closely resembles the target design of Eneba

### Pricing & Discounts
- Automatic discount percentage calculation
- Cashback eligible items are marked with an icon and highlighted border

## Setup for local development
- Clone the repository `git clone https://github.com/airis56/techtask-search-engine`

### Prerequisites
- Docker

### Frontend
1. Navigate to the `client` directory `cd client`
2. Install dependencies with `npm install`
3. Copy `.env.example` to `.env` and fill in the required variables
4. Run the development server with `npm run dev`

### Backend & Database
1. Launch database with `docker-compose up -d` from root directory
2. Generate Prisma client with `npx prisma generate`
3. Run migrations with `npx prisma migrate dev`
4. Seed the database with `npx prisma db seed`
5. Navigate to the `server` directory `cd server`
6. Install dependencies with `npm install`
7. Copy `.env.example` to `.env` and fill in the required variables
8. Run the development server with `npm run dev`

## Technologies used

### Frontend
- React (19.2.0)
- Tailwind CSS (4.1.18)

### Backend
- Express (5.2.1)
- PostgreSQL (18)
- Prisma ORM (7.2)

### Database
- PostgreSQL (18)
- `pg_tgrm` extension

### Deployment
- Railway
- Cloudflare for DNS
- Docker

## Tests
Basic backend tests are included to validate the public API endpoints and the
core fuzzy search functionality.
Tests are written with Jest and Supertest.

To run the tests, copy `.env.example` to `.env.test` and fill in the required variables.
Then run `npm test` from the `server` directory.

## AI usage
AI tools (ChatGPT) were used for debugging, architectural discussions,
and improving code clarity. All final code and decisions were my own.