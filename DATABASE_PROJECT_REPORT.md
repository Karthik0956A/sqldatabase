# Skill Tracker Application - Database Project Report

**Course:** Database Management Systems  
**Date:** December 16, 2025  
**Project:** Skill Tracker Application  
**Database:** MySQL with Sequelize ORM

---

## Abstract

This report presents a comprehensive database management system for a Skill Tracker Application. The system enables users to manage personal skill development by tracking learning progress, logging time investments, and organizing skills by various criteria. Built using MySQL as the relational database management system with Sequelize ORM, the application implements a three-tier architecture with a React-based frontend, Express.js backend API, and MySQL database. The system demonstrates proper database design principles including normalization, referential integrity, and efficient querying mechanisms.

---

## 1. Introduction

### 1.1 Overview

The Skill Tracker Application is a full-stack web application designed to help individuals manage their personal development journey. The system provides a centralized platform for users to:

- Track multiple skills across different categories
- Monitor learning progress through various organizational views
- Log time invested in skill development
- Set targets and measure progress
- Organize skills by status, category, confidence level, and custom tags

### 1.2 System Architecture

The application follows a modern three-tier architecture:

1. **Presentation Layer**: React-based single-page application with Tailwind CSS
2. **Business Logic Layer**: Node.js with Express.js REST API
3. **Data Layer**: MySQL relational database managed through Sequelize ORM

### 1.3 Key Technologies

- **Backend**: Node.js v16+, Express.js v5.1.0, Sequelize v6.37.5
- **Database**: MySQL v8.0+, MySQL2 driver v3.11.5
- **Frontend**: React, Vite, Tailwind CSS
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing

---

## 2. Background, Motivation and Scope

### 2.1 Background

In the modern knowledge economy, continuous learning and skill development are essential for professional growth. However, individuals often struggle to:

- Track multiple learning objectives simultaneously
- Measure time investment and progress
- Organize skills systematically
- Maintain visibility of their learning portfolio

Traditional methods (spreadsheets, notebooks) lack structure, automation, and accessibility. A dedicated database-driven application addresses these limitations.

### 2.2 Motivation

The motivation for this project stems from:

1. **Need for Structured Learning Management**: Systematic approach to personal development
2. **Data Persistence**: Reliable storage and retrieval of learning data
3. **Progress Analytics**: Quantifiable metrics for skill development
4. **Database Design Practice**: Demonstration of relational database concepts
5. **Real-world Application**: Practical system solving actual user needs

### 2.3 Scope

#### In Scope:
- User registration and authentication
- CRUD operations for skills
- Time tracking and logging
- Multiple organizational views (status, category, confidence, tags)
- Progress metrics and summaries
- Responsive web interface
- RESTful API design

#### Out of Scope:
- Mobile native applications
- Social features (sharing, following)
- AI-powered recommendations
- Third-party integrations
- Advanced analytics and reporting
- Multi-language support

### 2.4 Target Users

- Students managing coursework and self-study
- Professionals developing new competencies
- Career changers tracking skill acquisition
- Lifelong learners organizing knowledge domains

---

## 3. Methodology

### 3.1 Development Approach

The project follows an iterative development methodology:

1. **Requirements Analysis**: Identified user needs and system requirements
2. **Database Design**: Created ER diagram and normalized schema
3. **Backend Development**: Implemented REST API with Express.js
4. **Database Implementation**: Set up MySQL with Sequelize ORM
5. **Frontend Development**: Built React-based user interface
6. **Integration**: Connected all layers with proper error handling
7. **Testing**: Manual testing of all CRUD operations and user flows
8. **Migration**: Successfully migrated from MongoDB to MySQL

### 3.2 Database Migration

The project underwent a complete database migration from MongoDB (NoSQL) to MySQL (SQL):

**Migration Process:**
- Converted Mongoose schemas to Sequelize models
- Changed from document-based to relational structure
- Replaced ObjectId with INTEGER primary keys
- Converted array fields to JSON columns
- Implemented proper foreign key constraints
- Rewrote queries from MongoDB syntax to SQL

**Benefits of Migration:**
- Stronger data consistency through ACID properties
- Better referential integrity with foreign keys
- More efficient querying with indexes
- Improved transaction support
- Better schema validation

### 3.3 Design Patterns

**MVC Architecture:**
- **Models**: Sequelize models defining data structure
- **Controllers**: Business logic and request handling
- **Routes**: API endpoint definitions

**Repository Pattern:**
- Abstraction layer (`queries.js`) for database operations
- Separation of business logic from data access
- Reusable query functions

**Middleware Pattern:**
- Authentication middleware for JWT verification
- Error handling middleware for consistent responses

---

## 4. Requirements

### 4.1 Functional Requirements

#### User Management (FR-UM)
- **FR-UM-01**: Users shall register with name, email, and password
- **FR-UM-02**: Users shall authenticate using email and password
- **FR-UM-03**: System shall issue JWT tokens for authenticated sessions
- **FR-UM-04**: System shall hash passwords using bcrypt

#### Skill Management (FR-SM)
- **FR-SM-01**: Users shall create skills with title, category, and description
- **FR-SM-02**: Users shall update existing skills
- **FR-SM-03**: Users shall delete skills (cascade delete time entries)
- **FR-SM-04**: Users shall assign status to skills (To Start, In Progress, Completed)
- **FR-SM-05**: Users shall rate confidence level (1-5 scale)
- **FR-SM-06**: Users shall add multiple tags to skills
- **FR-SM-07**: Users shall set time targets for skills
- **FR-SM-08**: Users shall view skills grouped by status, category, or confidence

#### Time Tracking (FR-TT)
- **FR-TT-01**: Users shall log time entries for specific skills
- **FR-TT-02**: Time entries shall include minutes and optional notes
- **FR-TT-03**: System shall update skill's total minutes automatically
- **FR-TT-04**: Users shall view time summaries by skill
- **FR-TT-05**: System shall display progress toward time targets

### 4.2 Non-Functional Requirements

#### Performance (NFR-P)
- **NFR-P-01**: API responses shall complete within 2 seconds
- **NFR-P-02**: Database queries shall use proper indexes
- **NFR-P-03**: System shall support connection pooling (max 5 connections)

#### Security (NFR-S)
- **NFR-S-01**: Passwords shall be hashed with bcrypt (salt rounds: 10)
- **NFR-S-02**: JWT tokens shall expire after 7 days
- **NFR-S-03**: Email addresses shall be stored in lowercase
- **NFR-S-04**: All API endpoints (except auth) shall require JWT authentication

#### Reliability (NFR-R)
- **NFR-R-01**: Database shall enforce referential integrity
- **NFR-R-02**: Cascade deletes shall maintain data consistency
- **NFR-R-03**: System shall handle errors gracefully

#### Usability (NFR-U)
- **NFR-U-01**: Interface shall be responsive (desktop/mobile)
- **NFR-U-02**: Forms shall provide validation feedback
- **NFR-U-03**: Loading states shall be indicated to users

### 4.3 System Requirements

**Server Requirements:**
- Node.js v16 or higher
- MySQL Server v8.0 or higher
- 2GB RAM minimum
- Network connectivity for API access

**Client Requirements:**
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Internet connection

---

## 5. E-R Diagram

### 5.1 Entity-Relationship Diagram

```
┌─────────────────────┐
│       USER          │
├─────────────────────┤
│ PK  id              │
│     name            │
│ UK  email           │
│     passwordHash    │
│     avatarUrl       │
│     createdAt       │
│     updatedAt       │
└─────────────────────┘
          │
          │ 1
          │
          │ has many
          │
          │ N
          ▼
┌─────────────────────┐         N ┌─────────────────────┐
│       SKILL         │◄──────────│    TIME_ENTRY       │
├─────────────────────┤  logs     ├─────────────────────┤
│ PK  id              │           │ PK  id              │
│ FK  userId          │           │ FK  userId          │
│     title           │           │ FK  skillId         │
│     category        │           │     minutes         │
│     status          │           │     note            │
│     confidence      │           │     at              │
│     tags (JSON)     │           │     createdAt       │
│     description     │           │     updatedAt       │
│     startedAt       │           └─────────────────────┘
│     nextReviewAt    │                     ▲
│     minutesTotal    │                     │
│     minutesTarget   │                     │ N
│     createdAt       │                     │
│     updatedAt       │                     │
└─────────────────────┘                     │
          │                                 │
          │ 1                               │
          │                                 │
          └─────────────────────────────────┘
                    has many

```

### 5.2 Entity Descriptions

#### USER Entity
**Description**: Represents registered users of the system  
**Primary Key**: id (INTEGER, AUTO_INCREMENT)  
**Unique Key**: email

**Attributes:**
- `id`: Unique identifier
- `name`: User's display name
- `email`: Login credential (unique, lowercase)
- `passwordHash`: Bcrypt hashed password
- `avatarUrl`: Optional profile image URL
- `createdAt`: Registration timestamp
- `updatedAt`: Last modification timestamp

#### SKILL Entity
**Description**: Represents a skill being tracked by a user  
**Primary Key**: id (INTEGER, AUTO_INCREMENT)  
**Foreign Key**: userId references USER(id)

**Attributes:**
- `id`: Unique identifier
- `userId`: Owner of the skill
- `title`: Skill name
- `category`: Classification (e.g., Programming, Language)
- `status`: Learning stage (To Start, In Progress, Completed)
- `confidence`: Self-rated proficiency (1-5)
- `tags`: JSON array of custom labels
- `description`: Detailed notes
- `startedAt`: When learning began
- `nextReviewAt`: Scheduled review date
- `minutesTotal`: Accumulated time invested
- `minutesTarget`: Goal duration
- `createdAt`, `updatedAt`: Timestamps

#### TIME_ENTRY Entity
**Description**: Represents a time log for skill practice  
**Primary Key**: id (INTEGER, AUTO_INCREMENT)  
**Foreign Keys**: 
- userId references USER(id)
- skillId references SKILL(id)

**Attributes:**
- `id`: Unique identifier
- `userId`: User who logged the time
- `skillId`: Skill being practiced
- `minutes`: Duration of practice session
- `note`: Optional session notes
- `at`: Timestamp of practice session
- `createdAt`, `updatedAt`: Record timestamps

### 5.3 Relationships

**USER - SKILL (1:N)**
- Relationship: "owns" or "tracks"
- Cardinality: One user can track many skills
- Participation: Total (user must exist for skill)
- Deletion: CASCADE (deleting user removes all their skills)

**USER - TIME_ENTRY (1:N)**
- Relationship: "logs"
- Cardinality: One user can log many time entries
- Participation: Total
- Deletion: CASCADE

**SKILL - TIME_ENTRY (1:N)**
- Relationship: "has time logged"
- Cardinality: One skill can have many time entries
- Participation: Total
- Deletion: CASCADE (deleting skill removes all time logs)

### 5.4 Cardinality Summary

```
USER (1) ─────< (N) SKILL
USER (1) ─────< (N) TIME_ENTRY
SKILL (1) ────< (N) TIME_ENTRY
```

---

## 6. Relational Database Design

### 6.1 Relational Schema

#### Table: users
```sql
CREATE TABLE users (
    id              INTEGER         PRIMARY KEY AUTO_INCREMENT,
    name            VARCHAR(255)    NOT NULL,
    email           VARCHAR(255)    NOT NULL UNIQUE,
    passwordHash    VARCHAR(255)    NOT NULL,
    avatarUrl       VARCHAR(255)    NULL,
    createdAt       DATETIME        NOT NULL,
    updatedAt       DATETIME        NOT NULL,
    
    INDEX idx_email (email)
);
```

#### Table: skills
```sql
CREATE TABLE skills (
    id              INTEGER         PRIMARY KEY AUTO_INCREMENT,
    userId          INTEGER         NOT NULL,
    title           VARCHAR(255)    NOT NULL,
    category        VARCHAR(255)    NOT NULL,
    status          VARCHAR(255)    NOT NULL DEFAULT 'To Start',
    confidence      INTEGER         DEFAULT 1 CHECK (confidence BETWEEN 1 AND 5),
    tags            JSON            DEFAULT '[]',
    description     TEXT            NULL,
    startedAt       DATETIME        NULL,
    nextReviewAt    DATETIME        NULL,
    minutesTotal    INTEGER         DEFAULT 0,
    minutesTarget   INTEGER         DEFAULT 0,
    createdAt       DATETIME        NOT NULL,
    updatedAt       DATETIME        NOT NULL,
    
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    
    INDEX idx_userId (userId),
    INDEX idx_userId_category (userId, category),
    INDEX idx_userId_status (userId, status),
    INDEX idx_userId_confidence (userId, confidence),
    INDEX idx_status (status),
    INDEX idx_confidence (confidence)
);
```

#### Table: time_entries
```sql
CREATE TABLE time_entries (
    id              INTEGER         PRIMARY KEY AUTO_INCREMENT,
    userId          INTEGER         NOT NULL,
    skillId         INTEGER         NOT NULL,
    minutes         INTEGER         NOT NULL CHECK (minutes >= 1),
    note            TEXT            NULL,
    at              DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    createdAt       DATETIME        NOT NULL,
    updatedAt       DATETIME        NOT NULL,
    
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (skillId) REFERENCES skills(id) ON DELETE CASCADE,
    
    INDEX idx_userId (userId),
    INDEX idx_skillId (skillId),
    INDEX idx_at (at),
    INDEX idx_userId_skillId_at (userId, skillId, at)
);
```

### 6.2 Data Types Rationale

| Data Type | Usage | Justification |
|-----------|-------|---------------|
| INTEGER | Primary keys, foreign keys | Efficient indexing, auto-increment support |
| VARCHAR(255) | Text fields (name, email, title) | Sufficient length, indexed efficiently |
| TEXT | Long content (description, note) | Variable length, not indexed |
| JSON | Tags array | Flexible structure, MySQL native support |
| DATETIME | Timestamps | Precision for time tracking |

### 6.3 Constraints

#### Primary Key Constraints
- Each table has an AUTO_INCREMENT INTEGER primary key
- Guarantees uniqueness and efficient joins

#### Foreign Key Constraints
- `skills.userId` → `users.id` (ON DELETE CASCADE)
- `time_entries.userId` → `users.id` (ON DELETE CASCADE)
- `time_entries.skillId` → `skills.id` (ON DELETE CASCADE)

**CASCADE Behavior:**
- Deleting a user removes all their skills and time entries
- Deleting a skill removes all its time entries
- Maintains referential integrity automatically

#### Unique Constraints
- `users.email`: Prevents duplicate registrations

#### Check Constraints
- `skills.confidence` BETWEEN 1 AND 5: Validates rating scale
- `time_entries.minutes` >= 1: Ensures positive time values

#### NOT NULL Constraints
- Applied to essential fields (name, email, passwordHash, title, etc.)
- Ensures data completeness

### 6.4 Indexes

**Single Column Indexes:**
- `users.email`: Fast login lookups
- `skills.userId`: User's skills retrieval
- `skills.status`: Filter by learning stage
- `skills.confidence`: Filter by proficiency level
- `time_entries.userId`: User's time logs
- `time_entries.skillId`: Skill's time history
- `time_entries.at`: Time-based queries

**Composite Indexes:**
- `skills(userId, category)`: Grouped by category view
- `skills(userId, status)`: Grouped by status view
- `skills(userId, confidence)`: Grouped by confidence view
- `time_entries(userId, skillId, at)`: Time summary queries

**Index Strategy:**
- Cover frequent query patterns
- Support GROUP BY and ORDER BY operations
- Balance query performance vs write overhead

---

## 7. Database Normalization

### 7.1 Normalization Process

The database schema follows normalization principles to eliminate redundancy and ensure data integrity.

#### First Normal Form (1NF)
**Definition**: All attributes contain atomic values, no repeating groups.

**Compliance:**
- ✅ All fields contain single values
- ✅ `tags` stored as JSON (atomic from SQL perspective)
- ✅ No multi-valued attributes
- ✅ Each row uniquely identified by primary key

#### Second Normal Form (2NF)
**Definition**: In 1NF and all non-key attributes fully depend on the entire primary key.

**Compliance:**
- ✅ All tables have single-column primary keys (id)
- ✅ No partial dependencies possible
- ✅ Each attribute depends on the full key

**Example:**
- In `skills` table: `title`, `category`, `status` all depend on `skills.id`
- No attribute depends on only part of the key

#### Third Normal Form (3NF)
**Definition**: In 2NF and no transitive dependencies (non-key attributes depend only on primary key).

**Compliance:**
- ✅ No transitive dependencies present
- ✅ User information not duplicated in skills/time_entries
- ✅ Skill information not duplicated in time_entries

**Analysis:**
```
skills.userId → users.name  [OK - stored only in users table]
skills.id → skills.userId   [OK - direct dependency]
skills.minutesTotal         [OK - derived but stored for performance]
```

**Performance Consideration:**
- `minutesTotal` is technically derivable by SUM(time_entries.minutes)
- Stored in skills table as calculated field for performance
- Updated via application logic when time entries added
- Trade-off: slight denormalization for query efficiency

### 7.2 Denormalization Decisions

**Calculated Field: minutesTotal**
- **Location**: `skills.minutesTotal`
- **Rationale**: Avoid expensive JOIN and SUM on every query
- **Maintenance**: Updated automatically when time entries created
- **Trade-off**: Write complexity vs read performance

**JSON Storage: tags**
- **Location**: `skills.tags`
- **Rationale**: Variable number of tags per skill
- **Alternative**: Separate `tags` and `skill_tags` junction table
- **Justification**: Tags are leaf data, rarely queried independently

### 7.3 Functional Dependencies

**users table:**
```
id → name, email, passwordHash, avatarUrl, createdAt, updatedAt
email → id (unique constraint)
```

**skills table:**
```
id → userId, title, category, status, confidence, tags, description,
     startedAt, nextReviewAt, minutesTotal, minutesTarget, createdAt, updatedAt
```

**time_entries table:**
```
id → userId, skillId, minutes, note, at, createdAt, updatedAt
```

### 7.4 Normalization Benefits

1. **Data Integrity**: User information updated in one place
2. **Reduced Redundancy**: No duplicate user/skill data
3. **Update Anomalies Eliminated**: Changes propagate correctly
4. **Deletion Anomalies Prevented**: CASCADE rules handle dependencies
5. **Insertion Anomalies Avoided**: Foreign keys enforce existence

---

## 8. Data Dictionary

### 8.1 Table: users

| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| id | INTEGER | PK, AUTO_INCREMENT | Unique user identifier |
| name | VARCHAR(255) | NOT NULL | User's display name |
| email | VARCHAR(255) | NOT NULL, UNIQUE | Login email (lowercase) |
| passwordHash | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| avatarUrl | VARCHAR(255) | NULL | Profile image URL |
| createdAt | DATETIME | NOT NULL | Registration timestamp |
| updatedAt | DATETIME | NOT NULL | Last modification timestamp |

**Sample Data:**
| id | name | email | createdAt |
|----|------|-------|-----------|
| 1 | John Doe | john@example.com | 2025-01-15 10:30:00 |
| 2 | Jane Smith | jane@example.com | 2025-02-20 14:15:00 |

### 8.2 Table: skills

| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| id | INTEGER | PK, AUTO_INCREMENT | Unique skill identifier |
| userId | INTEGER | FK → users(id), NOT NULL | Owner user ID |
| title | VARCHAR(255) | NOT NULL | Skill name |
| category | VARCHAR(255) | NOT NULL | Classification category |
| status | VARCHAR(255) | NOT NULL, DEFAULT 'To Start' | Learning stage |
| confidence | INTEGER | DEFAULT 1, CHECK (1-5) | Self-rated proficiency |
| tags | JSON | DEFAULT '[]' | Array of custom labels |
| description | TEXT | NULL | Detailed notes |
| startedAt | DATETIME | NULL | Learning start date |
| nextReviewAt | DATETIME | NULL | Scheduled review date |
| minutesTotal | INTEGER | DEFAULT 0 | Total time invested (calculated) |
| minutesTarget | INTEGER | DEFAULT 0 | Target time goal |
| createdAt | DATETIME | NOT NULL | Creation timestamp |
| updatedAt | DATETIME | NOT NULL | Last update timestamp |

**Status Values:**
- "To Start": Planned but not begun
- "In Progress": Currently learning
- "Completed": Achieved proficiency

**Confidence Scale:**
- 1: Novice
- 2: Beginner
- 3: Intermediate
- 4: Advanced
- 5: Expert

**Sample Data:**
| id | userId | title | category | status | confidence | tags | minutesTotal |
|----|--------|-------|----------|--------|------------|------|--------------|
| 1 | 1 | React Hooks | Web Development | In Progress | 3 | ["frontend","javascript"] | 480 |
| 2 | 1 | SQL Queries | Database | To Start | 2 | ["backend","mysql"] | 0 |

### 8.3 Table: time_entries

| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| id | INTEGER | PK, AUTO_INCREMENT | Unique entry identifier |
| userId | INTEGER | FK → users(id), NOT NULL | User who logged time |
| skillId | INTEGER | FK → skills(id), NOT NULL | Skill practiced |
| minutes | INTEGER | NOT NULL, CHECK (>= 1) | Session duration |
| note | TEXT | NULL | Optional session notes |
| at | DATETIME | NOT NULL, DEFAULT NOW | Session timestamp |
| createdAt | DATETIME | NOT NULL | Record creation timestamp |
| updatedAt | DATETIME | NOT NULL | Last update timestamp |

**Sample Data:**
| id | userId | skillId | minutes | note | at |
|----|--------|---------|---------|------|-----|
| 1 | 1 | 1 | 60 | "Completed tutorial on useEffect" | 2025-03-01 14:00:00 |
| 2 | 1 | 1 | 120 | "Built practice project" | 2025-03-02 16:30:00 |

### 8.4 Relationships Reference

**Foreign Keys:**

| Child Table | Child Column | Parent Table | Parent Column | On Delete |
|-------------|--------------|--------------|---------------|-----------|
| skills | userId | users | id | CASCADE |
| time_entries | userId | users | id | CASCADE |
| time_entries | skillId | skills | id | CASCADE |

**Indexes:**

| Table | Index Name | Columns | Type |
|-------|------------|---------|------|
| users | PRIMARY | id | Clustered |
| users | idx_email | email | Unique |
| skills | PRIMARY | id | Clustered |
| skills | idx_userId | userId | Non-Clustered |
| skills | idx_userId_category | userId, category | Composite |
| skills | idx_userId_status | userId, status | Composite |
| time_entries | PRIMARY | id | Clustered |
| time_entries | idx_skillId | skillId | Non-Clustered |
| time_entries | idx_userId_skillId_at | userId, skillId, at | Composite |

---

## 9. Graphical User Interface

### 9.1 User Interface Overview

The Skill Tracker application features a responsive, modern web interface built with React and Tailwind CSS. The UI follows a single-page application (SPA) architecture with multiple views accessible through tab navigation.

### 9.2 Screen Descriptions

#### 9.2.1 Login Screen
**Purpose**: User authentication  
**URL**: `/login`  
**Components**:
- Email input field (validated)
- Password input field (masked)
- Login button
- Link to registration page
- Error message display

**User Flow**:
1. User enters email and password
2. Client sends POST request to `/api/auth/login`
3. Server validates credentials
4. Returns JWT token on success
5. Token stored in localStorage
6. User redirected to Dashboard

#### 9.2.2 Registration Screen
**Purpose**: New user account creation  
**URL**: `/register`  
**Components**:
- Name input field
- Email input field (validated)
- Password input field (strength indicator)
- Register button
- Link to login page

**User Flow**:
1. User enters name, email, password
2. Client validates input format
3. POST request to `/api/auth/register`
4. Server creates user account
5. Auto-login and redirect to Dashboard

#### 9.2.3 Dashboard - Learning Board View
**Purpose**: Kanban-style skill organization by status  
**Layout**: Three-column board  
**Columns**:
- **To Start**: Planned skills
- **In Progress**: Currently learning
- **Completed**: Mastered skills

**Features**:
- Drag-and-drop card movement (visual)
- Add new skill button (floating action)
- Skill cards display:
  - Title
  - Category badge
  - Confidence level (star rating)
  - Progress bar (time invested vs target)
  - Tags
  - Action buttons (edit, delete, log time)

#### 9.2.4 Dashboard - Category View
**Purpose**: Skills grouped by category  
**Layout**: Accordion or card grid  
**Groups**: Programming, Languages, Design, Business, etc.  
**Features**:
- Collapsible category sections
- Skill count per category
- Total time per category
- Average confidence per category

#### 9.2.5 Dashboard - Confidence View
**Purpose**: Skills organized by proficiency level  
**Layout**: Five sections (1-5 stars)  
**Features**:
- Visual confidence scale
- Skills sorted within each level
- Encourages progression to higher levels

#### 9.2.6 Dashboard - Tags View
**Purpose**: Skills filtered by custom tags  
**Layout**: Tag cloud + filtered list  
**Features**:
- Clickable tags
- Multi-tag filtering
- Popular tags highlighted
- Create new tags inline

#### 9.2.7 Dashboard - Time Summary View
**Purpose**: Time tracking analytics  
**Layout**: Data table with metrics  
**Columns**:
- Skill name
- Category
- Total minutes invested
- Target minutes
- Progress percentage
- Recent activity

**Features**:
- Sortable columns
- Visual progress bars
- Export capability
- Filter by date range

### 9.3 Modal Dialogs

#### 9.3.1 Skill Form Modal
**Purpose**: Create or edit skill  
**Fields**:
- Title (text, required)
- Category (dropdown, required)
- Status (radio buttons)
- Confidence (star rating)
- Tags (multi-select)
- Description (textarea)
- Minutes Target (number)
- Started At (date picker)
- Next Review (date picker)

**Actions**:
- Save
- Cancel
- Delete (edit mode only)

#### 9.3.2 Time Entry Modal
**Purpose**: Log time spent on skill  
**Fields**:
- Minutes (number input, required, min: 1)
- Note (textarea, optional)
- Session Date/Time (datetime picker, default: now)

**Actions**:
- Save (updates skill's minutesTotal)
- Cancel

**Behavior**:
- Auto-updates skill progress bar
- Refreshes time summary view
- Shows success notification

### 9.4 Navigation Components

#### 9.4.1 Top Navigation Bar
**Elements**:
- App logo/title (left)
- Search bar (center) - future feature
- User avatar/menu (right)
  - Profile settings
  - Logout button

#### 9.4.2 Tab Navigation
**Tabs**:
- Learning (Kanban board)
- Category
- Confidence
- Tags
- Time

**Behavior**:
- Active tab highlighted
- Persists on refresh
- Lazy loads view data

### 9.5 Responsive Design

**Breakpoints**:
- Mobile: < 640px (single column)
- Tablet: 640px - 1024px (two columns)
- Desktop: > 1024px (three columns)

**Mobile Optimizations**:
- Hamburger menu for navigation
- Stack skill cards vertically
- Full-width modals
- Touch-friendly button sizes
- Swipe gestures for cards

### 9.6 Visual Design Principles

**Color Scheme**:
- Primary: Blue (#3B82F6) - action buttons
- Success: Green (#10B981) - completed status
- Warning: Yellow (#F59E0B) - in progress
- Neutral: Gray (#6B7280) - text/borders

**Typography**:
- Headings: Inter, Bold
- Body: Inter, Regular
- Code: Fira Code

**Components**:
- Rounded corners (border-radius: 0.5rem)
- Drop shadows for elevation
- Smooth transitions (300ms)
- Loading spinners for async operations

### 9.7 User Experience Features

**Feedback Mechanisms**:
- Toast notifications (success/error messages)
- Loading states (spinners, skeleton screens)
- Form validation with inline errors
- Confirmation dialogs for destructive actions

**Accessibility**:
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Semantic HTML structure

**Performance**:
- Lazy loading of views
- Debounced search inputs
- Optimistic UI updates
- Cached API responses

---

## 10. Source Code

### 10.1 Project Structure

```
database/
├── src/
│   ├── server.js                 # Express app entry point
│   ├── config/
│   │   └── db.js                 # Sequelize configuration
│   ├── models/
│   │   ├── User.js               # User model
│   │   ├── Skill.js              # Skill model
│   │   └── TimeEntry.js          # TimeEntry model
│   ├── controllers/
│   │   ├── auth.controller.js    # Authentication logic
│   │   ├── skills.controller.js  # Skill CRUD logic
│   │   └── time.controller.js    # Time tracking logic
│   ├── routes/
│   │   ├── auth.routes.js        # Auth endpoints
│   │   ├── skills.routes.js      # Skill endpoints
│   │   └── time.routes.js        # Time endpoints
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   └── error.js              # Error handling
│   ├── db/
│   │   └── queries.js            # Query abstraction layer
│   └── utils/
│       └── jwt.js                # JWT token utilities
├── skill-tracker-frontend/
│   └── src/
│       ├── main.jsx              # React entry point
│       ├── App.jsx               # Main app component
│       ├── pages/
│       │   ├── Login.jsx         # Login page
│       │   ├── Register.jsx      # Registration page
│       │   └── Dashboard.jsx     # Main dashboard
│       ├── components/
│       │   ├── SkillCard.jsx     # Skill display card
│       │   ├── SkillForm.jsx     # Skill create/edit form
│       │   ├── TimeEntryForm.jsx # Time logging form
│       │   ├── TopNav.jsx        # Top navigation bar
│       │   ├── TabNav.jsx        # Tab navigation
│       │   └── EmptyState.jsx    # Empty state placeholder
│       ├── api/
│       │   ├── client.js         # Axios configuration
│       │   ├── auth.js           # Auth API calls
│       │   ├── skills.js         # Skill API calls
│       │   └── time.js           # Time API calls
│       └── context/
│           └── AuthContext.jsx   # Authentication context
├── package.json
└── README.md
```

### 10.2 Key Source Files

#### 10.2.1 Database Configuration (`src/config/db.js`)

```javascript
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "skill_tracker",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected");
    await sequelize.sync({ alter: process.env.NODE_ENV === "development" });
    console.log("✅ Database synced");
  } catch (err) {
    console.error("MySQL error:", err.message);
    process.exit(1);
  }
};

export default sequelize;
```

**Features**:
- Connection pooling (max 5 concurrent connections)
- Environment-based configuration
- Automatic schema synchronization in development
- Error handling with graceful shutdown

#### 10.2.2 User Model (`src/models/User.js`)

```javascript
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true, notEmpty: true },
    set(value) {
      this.setDataValue("email", value.toLowerCase());
    }
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatarUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: "users",
  indexes: [{ unique: true, fields: ["email"] }]
});

export default User;
```

**Key Features**:
- Email validation and lowercase normalization
- Password stored as hash (never plain text)
- Automatic timestamps
- Unique email constraint

#### 10.2.3 Skill Model (`src/models/Skill.js`)

```javascript
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const Skill = sequelize.define("Skill", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "users", key: "id" },
    onDelete: "CASCADE"
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "To Start",
    validate: { notEmpty: true }
  },
  confidence: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: { min: 1, max: 5 }
  },
  tags: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  minutesTotal: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  minutesTarget: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true,
  tableName: "skills",
  indexes: [
    { fields: ["userId"] },
    { fields: ["userId", "category"] },
    { fields: ["userId", "status"] }
  ]
});

Skill.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Skill, { foreignKey: "userId", as: "skills" });

export default Skill;
```

**Key Features**:
- Foreign key relationship with User
- Confidence validation (1-5 range)
- JSON storage for flexible tags
- Composite indexes for common queries
- CASCADE delete on user removal

#### 10.2.4 Query Abstraction Layer (`src/db/queries.js`)

```javascript
import sequelize from "../config/db.js";

export const findUserByEmail = async (email) => {
  console.log(`[SQL] SELECT * FROM users WHERE email = '${email}'`);
  const [results] = await sequelize.query(
    "SELECT * FROM users WHERE email = ?",
    { 
      replacements: [email], 
      type: sequelize.QueryTypes.SELECT, 
      raw: true 
    }
  );
  return results;
};

export const findAllSkills = async (userId, filters = {}) => {
  let query = "SELECT * FROM skills WHERE userId = ?";
  const replacements = [userId];
  
  if (filters.category) {
    query += " AND category = ?";
    replacements.push(filters.category);
  }
  if (filters.status) {
    query += " AND status = ?";
    replacements.push(filters.status);
  }
  
  query += " ORDER BY createdAt DESC";
  
  console.log(`[SQL] ${query}`);
  const results = await sequelize.query(query, {
    replacements,
    type: sequelize.QueryTypes.SELECT,
    raw: true
  });
  return results;
};
```

**Purpose**:
- Abstracts raw SQL queries from business logic
- Provides reusable query functions
- Logs SQL for debugging
- Uses parameterized queries (prevents SQL injection)

#### 10.2.5 Authentication Controller (`src/controllers/auth.controller.js`)

```javascript
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import { findUserByEmail, createUser, findUserById } from "../db/queries.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await createUser({ name, email, passwordHash });
    
    // Generate token
    const token = generateToken(user.id);
    
    res.status(201).json({ token, user: { id: user.id, name, email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    // Verify password
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    // Generate token
    const token = generateToken(user.id);
    
    res.json({ 
      token, 
      user: { id: user.id, name: user.name, email: user.email } 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

**Security Features**:
- bcrypt password hashing (10 salt rounds)
- JWT token generation
- No password returned in responses
- Generic error messages (prevents enumeration)

#### 10.2.6 API Routes (`src/routes/skills.routes.js`)

```javascript
import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  groupByStatus,
  groupByCategory
} from "../controllers/skills.controller.js";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// CRUD operations
router.get("/", getSkills);
router.post("/", createSkill);
router.put("/:id", updateSkill);
router.delete("/:id", deleteSkill);

// Grouping endpoints
router.get("/group/status", groupByStatus);
router.get("/group/category", groupByCategory);

export default router;
```

**Design**:
- RESTful endpoint structure
- Authentication middleware applied to all routes
- Logical grouping of related operations
- Clear HTTP method semantics

### 10.3 API Endpoints

#### Authentication Endpoints

**POST /api/auth/register**
- Body: `{ name, email, password }`
- Response: `{ token, user }`
- Status: 201 Created

**POST /api/auth/login**
- Body: `{ email, password }`
- Response: `{ token, user }`
- Status: 200 OK

#### Skill Endpoints (Requires JWT)

**GET /api/skills**
- Query: `?category=Programming&status=In Progress`
- Response: `[{ id, title, category, ... }]`
- Status: 200 OK

**POST /api/skills**
- Body: `{ title, category, status, confidence, tags, ... }`
- Response: `{ id, title, ... }`
- Status: 201 Created

**PUT /api/skills/:id**
- Body: `{ title, status, confidence, ... }`
- Response: `{ id, title, ... }`
- Status: 200 OK

**DELETE /api/skills/:id**
- Response: `{ message: "Skill deleted" }`
- Status: 200 OK

**GET /api/skills/group/status**
- Response: `{ "To Start": [...], "In Progress": [...], "Completed": [...] }`
- Status: 200 OK

**GET /api/skills/group/category**
- Response: `{ "Programming": [...], "Languages": [...] }`
- Status: 200 OK

#### Time Tracking Endpoints (Requires JWT)

**POST /api/time/:skillId**
- Body: `{ minutes, note, at }`
- Response: `{ id, skillId, minutes, ... }`
- Status: 201 Created
- Side Effect: Updates skill.minutesTotal

**GET /api/time/summary**
- Response: `[{ skillId, title, category, totalMinutes, targetMinutes, ... }]`
- Status: 200 OK

### 10.4 Technologies & Dependencies

**Backend Dependencies:**
```json
{
  "express": "^5.1.0",
  "sequelize": "^6.37.5",
  "mysql2": "^3.11.5",
  "bcryptjs": "^3.0.3",
  "jsonwebtoken": "^9.0.2",
  "dotenv": "^17.2.3",
  "cors": "^2.8.5",
  "morgan": "^1.10.1"
}
```

**Frontend Dependencies:**
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "axios": "^1.6.0",
  "react-router-dom": "^6.20.0"
}
```

### 10.5 Code Quality Practices

**Error Handling:**
- Try-catch blocks in all async functions
- Centralized error middleware
- Proper HTTP status codes
- User-friendly error messages

**Security:**
- JWT authentication on protected routes
- Password hashing with bcrypt
- SQL injection prevention (parameterized queries)
- CORS configuration
- Environment variable usage for secrets

**Code Organization:**
- Separation of concerns (MVC pattern)
- Modular file structure
- Reusable utility functions
- DRY (Don't Repeat Yourself) principle

**Performance:**
- Database connection pooling
- Indexed queries
- Efficient JOIN operations
- Lazy loading in frontend

---

## 11. Conclusion

### 11.1 Project Summary

The Skill Tracker Application successfully demonstrates a complete database management system built on MySQL with modern web technologies. The project encompasses all phases of database development:

- **Conceptual Design**: Entity-Relationship modeling
- **Logical Design**: Normalized relational schema
- **Physical Implementation**: MySQL database with Sequelize ORM
- **Application Development**: Full-stack web application
- **API Design**: RESTful backend services

### 11.2 Key Achievements

**Database Design:**
- Properly normalized schema (3NF) with justified denormalization
- Comprehensive referential integrity through foreign keys
- Efficient indexing strategy for common query patterns
- Flexible JSON storage for variable-length data (tags)

**System Architecture:**
- Clean three-tier architecture (presentation, business, data)
- RESTful API design with clear endpoint semantics
- JWT-based authentication for security
- Responsive React-based user interface

**Technical Implementation:**
- Successful migration from MongoDB to MySQL
- Sequelize ORM for database abstraction
- Raw SQL queries for performance-critical operations
- Comprehensive error handling and validation

**Functional Capabilities:**
- User registration and authentication
- Complete CRUD operations for skills
- Time tracking with automatic aggregation
- Multiple organizational views (status, category, confidence, tags)
- Progress tracking and analytics

### 11.3 Lessons Learned

**Database Design Insights:**
- **Normalization Balance**: While full normalization ensures data integrity, strategic denormalization (e.g., `minutesTotal`) significantly improves read performance
- **Index Strategy**: Composite indexes on frequently queried columns (userId + category) drastically reduce query execution time
- **Foreign Key Constraints**: CASCADE delete rules simplify application logic and prevent orphaned records
- **JSON Columns**: MySQL's native JSON support provides flexibility for variable-length arrays without additional join tables

**Migration Experience:**
- Converting from NoSQL (MongoDB) to SQL (MySQL) required rethinking data relationships
- ObjectId to INTEGER migration simplified joins and indexes
- Replacing aggregation pipelines with SQL GROUP BY improved performance
- Structured schema enforcement caught potential data inconsistencies

**ORM vs Raw SQL:**
- Sequelize provides excellent abstraction for CRUD operations
- Raw SQL queries offer better performance for complex aggregations
- Query logging aids in debugging and optimization
- Parameterized queries prevent SQL injection while maintaining readability

### 11.4 Challenges Encountered

**Technical Challenges:**
1. **Time Aggregation**: Initially used real-time SUM queries, switched to stored total for performance
2. **Tag Filtering**: Implementing tag-based filtering on JSON columns required specific MySQL JSON functions
3. **Cascade Deletes**: Ensuring proper propagation of deletions across three tables
4. **JWT Expiration**: Balancing security (short expiration) with UX (long sessions)

**Design Challenges:**
1. **Status Grouping**: Efficiently grouping skills without N+1 query problem
2. **Timestamp Handling**: Managing timezone consistency between client and server
3. **Validation Logic**: Deciding between database constraints vs application-level validation

### 11.5 Future Enhancements

**Database Enhancements:**
- **Audit Trail**: Add `audit_log` table to track all changes
- **Soft Deletes**: Implement `deletedAt` column instead of hard deletes
- **Full-Text Search**: Add MySQL fulltext indexes for skill descriptions
- **Stored Procedures**: Create procedures for complex time calculations
- **Database Triggers**: Automate `minutesTotal` updates via trigger instead of application logic

**Feature Additions:**
- **Collaborative Learning**: Share skills and progress with other users
- **Skill Dependencies**: Model prerequisite relationships between skills
- **Learning Resources**: Link external tutorials, books, courses
- **Achievements System**: Badges and milestones for motivation
- **Analytics Dashboard**: Charts and graphs for progress visualization
- **Reminders**: Email/push notifications for review schedules
- **Export/Import**: CSV export for data portability
- **API Versioning**: Support multiple API versions

**Performance Optimizations:**
- **Caching Layer**: Redis for frequently accessed data
- **Query Optimization**: Analyze slow query log and add indexes
- **Database Partitioning**: Partition time_entries by date for scalability
- **Read Replicas**: Separate read and write operations

**Security Improvements:**
- **Rate Limiting**: Prevent brute force attacks
- **2FA**: Two-factor authentication option
- **Password Policies**: Enforce strong password requirements
- **HTTPS Enforcement**: Ensure all traffic is encrypted
- **SQL Injection Testing**: Automated security scans

### 11.6 Learning Outcomes

This project provided hands-on experience with:
- Relational database design principles (ER modeling, normalization)
- SQL query optimization and indexing strategies
- ORM usage and limitations
- RESTful API design patterns
- Full-stack application architecture
- Authentication and authorization implementation
- Database migration processes
- Git version control for collaboration

### 11.7 Real-World Applicability

The Skill Tracker database design patterns are applicable to:
- **Project Management Systems**: Tasks, projects, time tracking
- **Learning Management Systems**: Courses, enrollments, progress
- **Portfolio Tracking**: Investments, assets, transactions
- **Fitness Applications**: Exercises, workouts, metrics
- **Habit Trackers**: Goals, activities, streaks

The three-entity model (User → Activity → Event) is a common pattern in many domains.

### 11.8 Final Remarks

The Skill Tracker Application successfully demonstrates a production-ready database system with proper design, implementation, and documentation. The project covers the complete software development lifecycle from requirements analysis to deployment-ready code. The normalized schema ensures data integrity while strategic denormalization maintains performance. The RESTful API provides a clean interface for frontend applications, and the React UI delivers an intuitive user experience.

This project serves as a solid foundation for understanding relational database concepts and their practical application in modern web development.

---

## Appendices

### Appendix A: Environment Configuration

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# MySQL Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=skill_tracker
DB_USER=root
DB_PASSWORD=your_mysql_password

# JWT Configuration
JWT_SECRET=your_secure_secret_key_here_min_32_chars
JWT_EXPIRES=7d

# Frontend Configuration
VITE_API_BASE_URL=http://localhost:4000/api
```

### Appendix B: Database Setup SQL

```sql
-- Create database
CREATE DATABASE skill_tracker 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Use database
USE skill_tracker;

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    avatarUrl VARCHAR(255),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    INDEX idx_email (email)
);

-- Skills table
CREATE TABLE skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL DEFAULT 'To Start',
    confidence INT DEFAULT 1 CHECK (confidence BETWEEN 1 AND 5),
    tags JSON DEFAULT '[]',
    description TEXT,
    startedAt DATETIME,
    nextReviewAt DATETIME,
    minutesTotal INT DEFAULT 0,
    minutesTarget INT DEFAULT 0,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_userId (userId),
    INDEX idx_userId_category (userId, category),
    INDEX idx_userId_status (userId, status)
);

-- Time entries table
CREATE TABLE time_entries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    skillId INT NOT NULL,
    minutes INT NOT NULL CHECK (minutes >= 1),
    note TEXT,
    at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (skillId) REFERENCES skills(id) ON DELETE CASCADE,
    INDEX idx_userId (userId),
    INDEX idx_skillId (skillId),
    INDEX idx_userId_skillId_at (userId, skillId, at)
);
```

### Appendix C: Sample SQL Queries

```sql
-- Find all skills for a user grouped by status
SELECT status, COUNT(*) as count, SUM(minutesTotal) as totalMinutes
FROM skills
WHERE userId = 1
GROUP BY status;

-- Get time summary for all skills
SELECT 
    s.id,
    s.title,
    s.category,
    s.minutesTotal,
    s.minutesTarget,
    COUNT(te.id) as sessionCount,
    MAX(te.at) as lastSession
FROM skills s
LEFT JOIN time_entries te ON s.id = te.skillId
WHERE s.userId = 1
GROUP BY s.id
ORDER BY s.minutesTotal DESC;

-- Find skills by tag
SELECT *
FROM skills
WHERE userId = 1
  AND JSON_CONTAINS(tags, '"javascript"');

-- Top 5 most practiced skills this month
SELECT 
    s.title,
    s.category,
    SUM(te.minutes) as monthlyMinutes
FROM skills s
INNER JOIN time_entries te ON s.id = te.skillId
WHERE te.userId = 1
  AND te.at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
GROUP BY s.id
ORDER BY monthlyMinutes DESC
LIMIT 5;
```

### Appendix D: API Request Examples

```bash
# Register a new user
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"securepass123"}'

# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"securepass123"}'

# Create a skill (requires JWT token)
curl -X POST http://localhost:4000/api/skills \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{
    "title":"React Hooks",
    "category":"Web Development",
    "status":"In Progress",
    "confidence":3,
    "tags":["javascript","frontend"],
    "minutesTarget":600
  }'

# Log time entry
curl -X POST http://localhost:4000/api/time/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{"minutes":60,"note":"Completed useEffect tutorial"}'

# Get grouped skills
curl http://localhost:4000/api/skills/group/status \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

### Appendix E: References

1. **Sequelize Documentation**: https://sequelize.org/docs/v6/
2. **MySQL 8.0 Reference Manual**: https://dev.mysql.com/doc/refman/8.0/en/
3. **Express.js Guide**: https://expressjs.com/en/guide/routing.html
4. **React Documentation**: https://react.dev/
5. **JWT Best Practices**: https://tools.ietf.org/html/rfc7519
6. **Database Normalization**: Date, C.J. "An Introduction to Database Systems" (8th Edition)
7. **RESTful API Design**: Fielding, Roy Thomas. "Architectural Styles and the Design of Network-based Software Architectures"

---

**End of Report**
