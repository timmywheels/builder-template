# `tsb` - TypeScript Boilerplate

A modern TypeScript monorepo boilerplate using pnpm workspaces. This project provides a structured starting point for building TypeScript applications with a focus on maintainability and scalability.

## Features

- 📦 pnpm Workspace (Monorepo)
- 🔥 TypeScript support
- 🚀 Fastify API with Zod validation
- 🧩 Modular architecture
- 🔄 Hot reloading for development
- 🛠️ Shared utilities package
- 🌐 Environment variables support via @fastify/env

## Project Structure

```
tsb/
├── apps/                # Application packages
│   └── api/             # Fastify API application
│       ├── src/
│       │   ├── routes/  # API routes
│       │   └── index.ts # API entry point
├── packages/            # Shared packages
│   └── utils/           # Shared utilities
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [pnpm](https://pnpm.io/) (v10.6.1 or later)

### Installation

1. Clone the repository

   ```bash
   git clone <repository-url> tsb
   cd tsb
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

### Environment Setup

Create a `.env` file in the `apps/api` directory with the following variables:

```env
PORT=1028
```

### Development

Start the API development server:

```bash
cd apps/api
pnpm dev
```

The API server will be available at http://localhost:1028 (or the port specified in your .env file).

### Building

To build all packages and applications:

```bash
pnpm build
```

To build just the API:

```bash
cd apps/api
pnpm build
```

#### Important: Known Issue with Routes Directory

When building the API for production, you need to ensure the routes directory exists in the dist folder. The TypeScript compiler only compiles .ts files and doesn't create empty directories.

To fix this issue, you need to:

1. Make sure you have at least one .ts file in every routes subdirectory
2. After building, manually create the directory structure if needed:

```bash
mkdir -p apps/api/dist/routes
```

3. Or modify the build script in package.json to handle this automatically:

```json
"build": "pnpm run clean && tsc -p tsconfig.build.json && mkdir -p dist/routes"
```

### Production

To run the API in production mode:

```bash
cd apps/api
pnpm build
pnpm start
```

## API Documentation

The API is built with Fastify and uses Zod for request/response validation. The server automatically loads routes from the `src/routes` directory using @fastify/autoload.

### Environment Variables

The API uses @fastify/env to manage environment variables:

- `PORT`: The port the server will listen on (default: 1028)

### Available Endpoints

Check the API documentation at runtime by starting the server and viewing the console output for the registered routes.

## Scripts

- `pnpm dev` - Start the development server with hot reloading
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm clean` - Remove build artifacts
- `pnpm format` - Format code using Prettier
- `pnpm format:check` - Check code formatting

## License

ISC
