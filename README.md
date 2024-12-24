# Tech Blog

A full-stack tech blog application built with Node.js, Express, Sequelize, and PostgreSQL. This platform allows developers to publish blog posts, comment on posts, and manage their content through a personalized dashboard.

## Features

- User authentication with session management.
- CRUD operations for blog posts.
- Ability to comment on posts.
- A dashboard for managing posts.
- Responsive UI with Bootstrap.
- Uses PostgreSQL database for storing posts, comments, and user data.

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL (Sequelize ORM)
- **Session Management**: Express-session
- **Authentication**: Passport.js or custom JWT (if implemented)
- **Styling**: Bootstrap or custom CSS

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/tech-blog.git
    cd tech-blog
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:

    ```env
    DATABASE_URL=your-database-url
    SESSION_SECRET=your-secret-key
    ```

4. Run database migrations to set up your PostgreSQL database:
    ```bash
    npx sequelize-cli db:migrate
    ```

5. Seed the database (optional, but useful for testing):
    ```bash
    npx sequelize-cli db:seed:all
    ```

6. Start the server:
    ```bash
    npm start
    ```

    The app will be running at `http://localhost:3001`.

## Deployment

### Deploying to Render

1. Push your project to GitHub.
2. Create a new Web Service on [Render](https://render.com).
3. Connect the GitHub repository to Render.
4. Set up environment variables in Render:

    - `DATABASE_URL=your-database-url`
    - `SESSION_SECRET=your-secret-key`

5. Set the build command to `npm install` and the start command to `npm start`.
6. Deploy your app.

Your live app will be available at `https://your-app-name.onrender.com`.

## Usage

- Users can create an account or log in to access their dashboard.
- In the dashboard, users can create, edit, and delete blog posts.
- Each blog post can have comments, and users can add comments to posts.
