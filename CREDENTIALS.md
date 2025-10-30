# NeuroFusion'25 Database Credentials

## MongoDB Connection
- **URI**: `mongodb+srv://vaibhavjangid128_db_user:G1g8RVditHUMCiET@users.nqgua0j.mongodb.net/?appName=users`
- **Database**: `neurofusion`

## Admin Account
- **Username**: `admin`
- **Password**: `Adm1n@NF2025!#M9xQ7z`
- **Role**: Admin (can view all teams and submissions)

## Team Accounts (16 Teams)

| Team Name | Username | Password              | 
|-----------|----------|-----------------------|
| Alpha     | alpha    | A1ph@2025!Nx#Q7z     |
| Bravo     | bravo    | Br@v0$2025#K9mP      |
| Charlie   | charlie  | Ch@rl1e#2025!W8v     |
| Delta     | delta    | D3lt@$2025#R5nX      |
| Echo      | echo     | Ech0!2025@M4pT       |
| Foxtrot   | foxtrot  | F0xtr0t#2025$L6q     |
| Golf      | golf     | G0lf@2025!H3bZ       |
| Hunter    | hunter   | Hunt3r$2025#V9kY     |
| Juliet    | juliet   | Jul1et!2025@C7xN     |
| Kilo      | kilo     | K1l0#2025$P8wM       |
| Lima      | lima     | L1m@$2025!D4jR       |
| Mike      | mike     | M1ke@2025#T6nG       |
| November  | november | N0v3mb3r!2025@S9pL   |
| Oscar     | oscar    | 0sc@r$2025#F5qW      |
| Quebec    | quebec   | Qu3b3c!2025@K8vX     |
| Romeo     | romeo    | R0m3o#2025$J7mZ      |

## How to Initialize Database

### Option 1: Using API Route (Recommended)
1. Start the development server: `npm run dev`
2. Open your browser and go to: `http://localhost:3000/api/init-db`
3. Send a POST request (you can use browser console):
   ```javascript
   fetch('/api/init-db', { method: 'POST' })
     .then(res => res.json())
     .then(data => console.log(data))
   ```

### Option 2: Using curl
```bash
curl -X POST http://localhost:3000/api/init-db
```

### Option 3: Create a test page
Navigate to `http://localhost:3000` and use the admin button to initialize.

## Team Workflow
1. Teams log in with their credentials (e.g., username: `alpha`, password: `alpha2025`)
2. They can:
   - Fill in team member names
   - Select their problem statement
   - Submit their project link
3. All information is saved to MongoDB

## Admin Workflow
1. Admin logs in with admin credentials
2. Can view:
   - All registered teams
   - Team members
   - Selected problem statements
   - Submission links
   - Submission status

## Security Notes
- All passwords are hashed using bcrypt before storing in database
- Change the NEXTAUTH_SECRET in .env.local for production
- Consider changing default passwords after first login in production
