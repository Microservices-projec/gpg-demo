# Project Setup Guide - Google Play Games Style Demo

I'll guide you through the complete setup process step-by-step.

## 1. Prerequisites Installation

First, make sure you have these installed on your system:

### For Windows:
1. **Node.js** (Download from [nodejs.org](https://nodejs.org/))
2. **MySQL** (Download MySQL Installer from [mysql.com](https://dev.mysql.com/downloads/installer/))
3. **Git** (Download from [git-scm.com](https://git-scm.com/))

### For macOS:
```bash
# Install Homebrew first (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js and MySQL
brew install node
brew install mysql
```

### For Ubuntu/Linux:
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MySQL
sudo apt-get install mysql-server
```

## 2. Verify Installations

Open your terminal/command prompt and check:

```bash
node --version
npm --version
mysql --version
git --version
```

All commands should show version numbers without errors.

## 3. Create Project Structure

```bash
# Create main project directory
mkdir gpg-demo
cd gpg-demo

# Create backend and frontend folders
mkdir server client

# Initialize backend
cd server
npm init -y

# Initialize frontend
cd ../client
npm init -y
```

## 4. Install Backend Dependencies

```bash
cd server

# Install production dependencies
npm install express cors dotenv cookie-parser jsonwebtoken google-auth-library @prisma/client

# Install development dependencies
npm install -D prisma

# Initialize Prisma
npx prisma init
```

## 5. Install Frontend Dependencies

```bash
cd ../client

# Install React with Vite
npm install react react-dom
npm install -D @vitejs/plugin-react vite

# Create basic frontend structure
mkdir src
mkdir src/components
```

## 6. Setup MySQL Database

```bash
# Login to MySQL (you'll be prompted for password)
mysql -u root -p

# Run these commands in MySQL prompt
CREATE DATABASE gpg_demo;
EXIT;
```

## 7. Configure Environment Files

### Server (.env) - Create this file in `server/.env`
```
PORT=4000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
DATABASE_URL="mysql://root:your_mysql_password@localhost:3306/gpg_demo"
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
GOOGLE_CLIENT_ID=your_google_oauth_client_id_here
```

### Client (.env) - Create this file in `client/.env`
```
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id_here
VITE_API_BASE=http://localhost:4000/api
```

## 8. Create the Required Files

Now create all the files I mentioned in the previous response. Here's the quick way to create the directory structure:

```bash
# In server directory
cd server
mkdir -p src/lib src/services src/controllers src/routes src/middleware
```

Create all the files with the content I provided:
- `server/prisma/schema.prisma`
- `server/src/lib/prisma.js`
- `server/src/lib/jwt.js`
- `server/src/services/auth.service.js`
- `server/src/services/userData.service.js`
- `server/src/controllers/auth.controller.js`
- `server/src/controllers/userData.controller.js`
- `server/src/middleware/auth.middleware.js`
- `server/src/routes/auth.routes.js`
- `server/src/routes/userData.routes.js`
- `server/src/app.js`

```bash
# In client directory
cd ../client
mkdir -p src/components
```

Create client files:
- `client/index.html`
- `client/src/styles.css`
- `client/src/api.js`
- `client/src/GoogleLoginButton.jsx`
- `client/src/Dashboard.jsx`
- `client/src/App.jsx`
- `client/src/main.jsx`
- `client/vite.config.js`

## 9. Setup Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Google+ API" 
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Choose "Web application"
6. Add authorized JavaScript origins: `http://localhost:5173`
7. Add authorized redirect URIs: `http://localhost:4000/api/auth/google`
8. Copy the Client ID and update both `.env` files

## 10. Run Database Migrations

```bash
cd server

# Generate Prisma client
npx prisma generate

# Run migrations to create tables
npx prisma migrate dev --name init
```

## 11. Update Package.json Files

### Server (`server/package.json`):
```json
{
  "name": "gpg-server",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node src/app.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev --name init"
  },
  "dependencies": {
    "@prisma/client": "^5.18.0",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "google-auth-library": "^9.14.2",
    "jsonwebtoken": "^9.0.2"
  },
  "devDependencies": {
    "prisma": "^5.18.0"
  }
}
```

### Client (`client/package.json`):
```json
{
  "name": "gpg-client",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --port 5173"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.2"
  }
}
```

## 12. Start the Application

### Terminal 1 - Start Backend:
```bash
cd server
npm run dev
```

### Terminal 2 - Start Frontend:
```bash
cd client
npm run dev
```

## 13. Test the Application

1. Open `http://localhost:5173` in your browser
2. Click "Sign in with Google"
3. Complete the Google login process
4. You should see the dashboard with game features

## Troubleshooting Tips

1. **MySQL Connection Error**: Make sure MySQL is running
2. **Port Already in Use**: Change ports in `.env` files
3. **Google Login Error**: Verify OAuth credentials and redirect URIs
4. **Module Not Found**: Run `npm install` in both directories

This setup will give you a complete Google Play Games-style demo with authentication, progress tracking, and a game-like interface!
