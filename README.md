# Skill Tracker Application

A full-stack web application for tracking skills, learning progress, and time invested in personal development. Built with React (frontend) and Node.js + Express + MySQL (backend).

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Skill Management**: Create, update, delete, and organize skills
- **Multiple Views**: 
  - Learning board (Kanban-style by status)
  - Category grouping
  - Confidence level grouping
  - Tag-based organization
  - Time summary dashboard
- **Time Tracking**: Log time spent on each skill with notes
- **Progress Tracking**: Monitor minutes invested and confidence levels
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MySQL** - Relational database
- **Sequelize** - ORM for MySQL
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

## 📋 Prerequisites

- Node.js (v16 or higher)
- MySQL Server (v8.0 or higher)
- npm or yarn

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Karthik0956A/sqldatabase.git
cd sqldatabase
```

### 2. Setup Backend

```bash
# Install backend dependencies
npm install

# Create MySQL database
mysql -u root -p
```

In MySQL prompt:
```sql
CREATE DATABASE skill_tracker CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

Configure environment variables:
```bash
# Copy the example env file
cp .env.example .env
```

Edit `.env` with your MySQL credentials:
```env
PORT=4000

# MySQL Configuration
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=skill_tracker
DB_USER=root
DB_PASSWORD=your_mysql_password

# JWT Configuration
JWT_SECRET=your_secure_secret_key_here
JWT_EXPIRES=7d

# Development Mode
NODE_ENV=development
```

### 3. Setup Frontend

```bash
cd skill-tracker-frontend
npm install

# Create .env file for frontend
echo "VITE_API_BASE_URL=http://localhost:4000/api" > .env
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
# From project root
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd skill-tracker-frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:4000

## 📁 Project Structure

```
.
├── src/                          # Backend source code
│   ├── config/
│   │   └── db.js                # Database configuration
│   ├── controllers/
│   │   ├── auth.controller.js   # Authentication logic
│   │   ├── skills.controller.js # Skills CRUD operations
│   │   └── time.controller.js   # Time tracking logic
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication middleware
│   │   └── error.js             # Error handling middleware
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── Skill.js             # Skill model
│   │   └── TimeEntry.js         # Time entry model
│   ├── routes/
│   │   ├── auth.routes.js       # Auth endpoints
│   │   ├── skills.routes.js     # Skills endpoints
│   │   └── time.routes.js       # Time tracking endpoints
│   ├── utils/
│   │   └── jwt.js               # JWT utilities
│   └── server.js                # Express server setup
│
├── skill-tracker-frontend/      # React frontend
│   ├── src/
│   │   ├── api/                 # API client functions
│   │   ├── components/          # React components
│   │   ├── context/             # React context (Auth)
│   │   ├── pages/               # Page components
│   │   └── main.jsx            # Entry point
│   └── package.json
│
├── .env                         # Backend environment variables
├── .env.example                 # Environment template
├── package.json                 # Backend dependencies
└── README.md                    # This file
```

## 🗄️ Database Schema

### Users Table
- `id` (INTEGER, PRIMARY KEY)
- `name` (STRING)
- `email` (STRING, UNIQUE)
- `passwordHash` (STRING)
- `avatarUrl` (STRING, nullable)
- `createdAt`, `updatedAt` (TIMESTAMPS)

### Skills Table
- `id` (INTEGER, PRIMARY KEY)
- `userId` (INTEGER, FOREIGN KEY → users.id)
- `title` (STRING)
- `category` (STRING)
- `status` (STRING) - "To Start", "In Progress", "Mastered", etc.
- `confidence` (INTEGER, 1-5)
- `tags` (JSON)
- `description` (TEXT, nullable)
- `startedAt`, `nextReviewAt` (DATE, nullable)
- `minutesTotal`, `minutesTarget` (INTEGER)
- `createdAt`, `updatedAt` (TIMESTAMPS)

### TimeEntries Table
- `id` (INTEGER, PRIMARY KEY)
- `userId` (INTEGER, FOREIGN KEY → users.id)
- `skillId` (INTEGER, FOREIGN KEY → skills.id)
- `minutes` (INTEGER)
- `note` (TEXT, nullable)
- `at` (DATE)
- `createdAt`, `updatedAt` (TIMESTAMPS)

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Skills
- `GET /api/skills` - List all skills (protected)
- `POST /api/skills` - Create new skill (protected)
- `PUT /api/skills/:id` - Update skill (protected)
- `DELETE /api/skills/:id` - Delete skill (protected)
- `GET /api/skills/group/status` - Group by status (protected)
- `GET /api/skills/group/category` - Group by category (protected)
- `GET /api/skills/group/confidence` - Group by confidence (protected)

### Time Tracking
- `POST /api/time/:skillId` - Add time entry (protected)
- `GET /api/time` - List time entries (protected)
- `GET /api/time/summary` - Get time summary per skill (protected)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 🧪 Testing the API

You can use tools like Postman, Thunder Client, or curl to test the API:

```bash
# Register a new user
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Set environment variables in your hosting platform
2. Ensure `NODE_ENV=production`
3. Update CORS settings in `server.js` if needed
4. Deploy the root directory

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
   ```bash
   cd skill-tracker-frontend
   npm run build
   ```
2. Deploy the `dist` folder
3. Set `VITE_API_BASE_URL` environment variable to your backend URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Karthik**
- GitHub: [@Karthik0956A](https://github.com/Karthik0956A)

## 🙏 Acknowledgments

- Built with ❤️ using modern web technologies
- Inspired by the need for effective skill tracking and learning management

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Happy Learning! 📚✨**
