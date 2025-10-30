# NeuroFusion'25 - Functional Website Guide

## ✅ What's Now Functional:

### 1. **Real Authentication System**
- JWT-based authentication with secure cookies
- Session management with automatic session checking
- Secure password hashing with bcrypt

### 2. **Database Integration**
- MongoDB Atlas connection
- 16 team accounts + 1 admin account
- All credentials stored securely in database

### 3. **Login System**
- Teams and admin can log in with real credentials
- Invalid credentials show error messages
- Automatic redirect to dashboard after login

### 4. **Team Dashboard**
- Teams can:
  - Add team member names (up to 5 members)
  - Select their problem statement from dropdown
  - Submit their project link (GitHub/Drive)
  - Save information to database
  - See success confirmation

### 5. **Admin Dashboard**
- Admin can view:
  - Total number of teams (16)
  - Number of teams that submitted
  - Number of pending submissions
  - Complete table with all team data:
    - Team names
    - Team members
    - Selected problem statement
    - Submission links with clickable URLs

## 🚀 How to Use:

### Step 1: Initialize Database
1. Visit: http://localhost:3000/initialize
2. Click "Initialize Database" button
3. Wait for success message
4. All 16 teams + admin account will be created

### Step 2: Login as Team
1. Go to homepage: http://localhost:3000
2. Click "Enter Portal" button
3. Login with team credentials:
   - Username: `alpha` (or any team name)
   - Password: `A1ph@2025!Nx#Q7z` (see CREDENTIALS.md for all passwords)
4. You'll be redirected to team dashboard

### Step 3: Fill Team Information
1. Enter team member names (up to 5)
2. Select a problem statement from dropdown
3. Enter submission link (GitHub or Google Drive)
4. Click "Save Information"
5. See success message

### Step 4: Login as Admin
1. Logout from team account
2. Login with admin credentials:
   - Username: `admin`
   - Password: `Adm1n@NF2025!#M9xQ7z`
3. View admin dashboard with all team data

## 📋 API Endpoints Created:

### Authentication
- `POST /api/auth/login` - Login with username/password
- `POST /api/auth/logout` - Logout and clear session
- `GET /api/auth/session` - Check current session

### Team Operations
- `POST /api/team/update` - Update team information

### Admin Operations  
- `GET /api/admin/teams` - Get all teams (admin only)

### Database
- `POST /api/init-db` - Initialize database with all accounts

## 🔐 Security Features:
- Passwords hashed with bcrypt (10 rounds)
- JWT tokens with 24-hour expiration
- HTTP-only cookies for token storage
- Role-based access control (team vs admin)
- Server-side session validation

## 📊 Database Schema:

```typescript
User {
  username: string        // Team name or "admin"
  password: string        // Hashed password
  role: "admin" | "team"
  teamName: string        // Display name
  teamMembers: string[]   // Array of member names
  problemStatement: string // Selected problem
  submissionLink: string  // GitHub/Drive URL
  createdAt: Date
  updatedAt: Date
}
```

## 🎯 Team Credentials (16 Teams):
See `CREDENTIALS.md` for complete list with strong passwords.

Teams: Alpha, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hunter, Juliet, Kilo, Lima, Mike, November, Oscar, Quebec, Romeo

## 🔧 Tech Stack:
- Next.js 16 with App Router
- MongoDB with official driver
- JWT authentication (jose library)
- bcryptjs for password hashing
- TypeScript for type safety
- Tailwind CSS for styling

## ⚡ Next Steps:
1. Initialize the database
2. Test login with different team accounts
3. Fill in team information
4. Login as admin to view all submissions
5. Teams can update their information anytime

Everything is now fully functional! 🎉
