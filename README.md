# Back-end API

This project is a RESTful API built with Express, TypeScript, and Sequelize, designed for the mobile app as my final project.

## Features

- User authentication with JWT
- RESTful API structure
- More later...

## Project Structure

```

├── src
│   ├── config
│   ├── controllers
│   ├── database
│   │    ├── migrations
│   │    └── seeders
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── types
│   ├── utils
│   ├── app.ts
│   └── server.ts
├── .env.example
├── .gitignore
├── package.json
├── sequelizerc
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/depelapi/backend-api.git
   ```

2. Navigate to the project directory:

   ```
   cd backend-api
   ```

3. Install the dependencies:

   ```
   npm i
   ```

4. Create a `.env` file based on the `.env.example` file and configure the environment variables.

## Usage

1. Start the server:

   ```
   npm run start
   ```

2. The API will be running on `http://localhost:3000` (or the port specified in the environment variables).