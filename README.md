# Goods

A small full-stack application for showcasing your favorite products.

## Getting Started

### Prerequisites

-   A MySQL Database. Preferably [PlanetScale](https://planetscale.com/).
-   S3-compatible storage

### Installation

1. Clone the repo

```sh
git clone git@github.com:superhooman/goods.git
cd goods
```

2. Install dependencies

```sh
pnpm install
```

3. Create a `.env` file in the root of the project and fill it with the following:

```
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
S3_ENDPOINT=
S3_PUBLIC_URL=
S3_BUCKET=
S3_ACCESS_KEY=
S3_SECRET_KEY=
ADMIN_SECRET=
```
