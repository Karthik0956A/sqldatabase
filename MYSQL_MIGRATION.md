# MySQL Migration Guide

## Changes Made

This project has been successfully migrated from MongoDB to MySQL using Sequelize ORM.

### Package Changes

- **Removed**: `mongoose@^8.19.3`
- **Added**: 
  - `mysql2@^3.11.5` - MySQL driver for Node.js
  - `sequelize@^6.37.5` - Promise-based ORM for MySQL

### Database Configuration Changes

#### Old (MongoDB):
```javascript
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/DBMS
```

#### New (MySQL):
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=skill_tracker
DB_USER=root
DB_PASSWORD=your_mysql_password
NODE_ENV=development
```

### Model Changes

All models have been converted from Mongoose schemas to Sequelize models:

1. **User Model**:
   - ObjectId → INTEGER (auto-increment primary key)
   - Email stored in lowercase with unique constraint
   - Timestamps enabled (createdAt, updatedAt)

2. **Skill Model**:
   - ObjectId → INTEGER references
   - Tags stored as JSON field instead of array
   - All indexes preserved
   - Foreign key to User with CASCADE delete

3. **TimeEntry Model**:
   - ObjectId references → INTEGER foreign keys
   - Relationships properly defined
   - CASCADE delete on user/skill deletion

### Key Differences

1. **ID Fields**: Changed from MongoDB's `_id` (ObjectId) to MySQL's `id` (INTEGER)
2. **Queries**: 
   - `findOne({ email })` → `findOne({ where: { email } })`
   - `findById()` → `findByPk()`
   - `Model.create()` → Same, but uses Sequelize
3. **Aggregation**: MongoDB's `aggregate()` replaced with Sequelize queries and JavaScript grouping
4. **Array Fields**: Tags stored as JSON instead of array type
5. **Increment**: `$inc` operator → `model.increment()`

## Setup Instructions

### 1. Install MySQL

Make sure MySQL is installed and running on your system:
- **Windows**: Download from [MySQL Official Site](https://dev.mysql.com/downloads/installer/)
- **macOS**: `brew install mysql`
- **Linux**: `sudo apt-get install mysql-server`

### 2. Create Database

```sql
CREATE DATABASE skill_tracker CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and update with your MySQL credentials:

```bash
cp .env.example .env
```

Edit `.env` with your actual database credentials.

### 4. Install Dependencies

```bash
npm install
```

This will install the new MySQL packages (`mysql2` and `sequelize`).

### 5. Run the Application

```bash
npm run dev
```

Sequelize will automatically create all tables based on the models on first run (when `NODE_ENV=development`).

### 6. Database Schema

The following tables will be created automatically:

- **users**: id, name, email, passwordHash, avatarUrl, createdAt, updatedAt
- **skills**: id, userId, title, category, status, confidence, tags (JSON), description, startedAt, nextReviewAt, minutesTotal, minutesTarget, createdAt, updatedAt
- **time_entries**: id, userId, skillId, minutes, note, at, createdAt, updatedAt

## Production Deployment

For production:

1. Set `NODE_ENV=production` in `.env`
2. Change `DB_PASSWORD` to a strong password
3. Update `JWT_SECRET` to a secure random string
4. Consider using `sync: false` in production and use migrations instead
5. Set up proper database backups

## Migration from MongoDB (Optional)

If you need to migrate existing data from MongoDB to MySQL:

1. Export data from MongoDB:
```bash
mongoexport --uri="your_mongo_uri" --collection=users --out=users.json
mongoexport --uri="your_mongo_uri" --collection=skills --out=skills.json
mongoexport --uri="your_mongo_uri" --collection=timeentries --out=timeentries.json
```

2. Create a migration script to import the data into MySQL, converting ObjectIds to sequential integers.

## Testing

Test all endpoints to ensure functionality:
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- GET `/api/auth/me` - Get current user
- GET/POST/PUT/DELETE `/api/skills` - Skills CRUD
- POST `/api/time/:skillId` - Add time entry
- GET `/api/time` - List time entries

## Troubleshooting

### Connection Issues
- Verify MySQL is running: `mysql -u root -p`
- Check credentials in `.env`
- Ensure database exists

### Schema Issues
- Delete and recreate database if schema is corrupted
- Check Sequelize logs for detailed errors

### Performance
- Add indexes for frequently queried fields
- Use connection pooling (already configured)
- Monitor slow queries

## Support

For issues, check:
- Sequelize Documentation: https://sequelize.org/
- MySQL Documentation: https://dev.mysql.com/doc/
