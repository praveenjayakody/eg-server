# nest-server
* Run using Node 20 LTS

## Setup
* Copy `.env.sample` and rename it as `.env`. Populate the `MONGODB_URI`

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Production
* Modify CORS configuration in `main.ts`