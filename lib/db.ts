import { getDatabase } from './mongodb'
import bcrypt from 'bcryptjs'

export interface User {
  _id?: string
  username: string
  password: string
  role: 'admin' | 'team'
  teamName?: string
  teamMembers?: string[]
  problemStatement?: string
  documentationLink?: string // Optional - Initial stage
  githubLink?: string // Required before Review 2
  presentationLink?: string // Required before Review 2
  youtubeLink?: string // Required before Final Review
  currentStage?: 'initial' | 'review2' | 'final' | 'completed' // Track progress
  createdAt?: Date
  updatedAt?: Date
}

export interface Team {
  username: string
  password: string
  teamName: string
}

// Team credentials with strong passwords
export const TEAMS: Team[] = [
  { username: 'alpha', password: 'A1ph@2025!Nx#Q7z', teamName: 'Alpha' },
  { username: 'bravo', password: 'Br@v0$2025#K9mP', teamName: 'Bravo' },
  { username: 'charlie', password: 'Ch@rl1e#2025!W8v', teamName: 'Charlie' },
  { username: 'delta', password: 'D3lt@$2025#R5nX', teamName: 'Delta' },
  { username: 'echo', password: 'Ech0!2025@M4pT', teamName: 'Echo' },
  { username: 'foxtrot', password: 'F0xtr0t#2025$L6q', teamName: 'Foxtrot' },
  { username: 'golf', password: 'G0lf@2025!H3bZ', teamName: 'Golf' },
  { username: 'hunter', password: 'Hunt3r$2025#V9kY', teamName: 'Hunter' },
  { username: 'juliet', password: 'Jul1et!2025@C7xN', teamName: 'Juliet' },
  { username: 'kilo', password: 'K1l0#2025$P8wM', teamName: 'Kilo' },
  { username: 'lima', password: 'L1m@$2025!D4jR', teamName: 'Lima' },
  { username: 'mike', password: 'M1ke@2025#T6nG', teamName: 'Mike' },
  { username: 'november', password: 'N0v3mb3r!2025@S9pL', teamName: 'November' },
  { username: 'oscar', password: '0sc@r$2025#F5qW', teamName: 'Oscar' },
  { username: 'quebec', password: 'Qu3b3c!2025@K8vX', teamName: 'Quebec' },
  { username: 'romeo', password: 'R0m3o#2025$J7mZ', teamName: 'Romeo' },
]

// Admin credentials with strong password
export const ADMIN = {
  username: 'admin',
  password: 'Adm1n@NF2025!#M9xQ7z',
  role: 'admin' as const
}

export async function initializeDatabase() {
  try {
    const db = await getDatabase()
    const usersCollection = db.collection<User>('users')

    // Check if users already exist
    const existingUsersCount = await usersCollection.countDocuments()
    if (existingUsersCount > 0) {
      console.log('Database already initialized')
      return { success: true, message: 'Database already initialized' }
    }

    // Create admin user
    const hashedAdminPassword = await bcrypt.hash(ADMIN.password, 10)
    await usersCollection.insertOne({
      username: ADMIN.username,
      password: hashedAdminPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Create team users
    const teamUsers = await Promise.all(
      TEAMS.map(async (team) => ({
        username: team.username,
        password: await bcrypt.hash(team.password, 10),
        role: 'team' as const,
        teamName: team.teamName,
        teamMembers: [],
        problemStatement: '',
        documentationLink: '',
        githubLink: '',
        presentationLink: '',
        youtubeLink: '',
        currentStage: 'initial' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    )

    await usersCollection.insertMany(teamUsers)

    console.log('Database initialized successfully!')
    console.log(`Created 1 admin and ${TEAMS.length} team accounts`)

    return {
      success: true,
      message: `Database initialized with 1 admin and ${TEAMS.length} teams`,
      credentials: {
        admin: { username: ADMIN.username, password: ADMIN.password },
        teams: TEAMS,
      },
    }
  } catch (error) {
    console.error('Error initializing database:', error)
    return { success: false, error: String(error) }
  }
}

export async function authenticateUser(username: string, password: string): Promise<User | null> {
  try {
    const db = await getDatabase()
    const usersCollection = db.collection<User>('users')

    const user = await usersCollection.findOne({ username })
    if (!user) return null

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) return null

    // Don't return the password
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword as User
  } catch (error) {
    console.error('Error authenticating user:', error)
    return null
  }
}

export async function updateTeamInfo(
  username: string,
  data: {
    teamMembers?: string[]
    problemStatement?: string
    documentationLink?: string
    githubLink?: string
    presentationLink?: string
    youtubeLink?: string
    currentStage?: 'initial' | 'review2' | 'final' | 'completed'
  }
): Promise<boolean> {
  try {
    const db = await getDatabase()
    const usersCollection = db.collection<User>('users')

    const result = await usersCollection.updateOne(
      { username },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      }
    )

    return result.modifiedCount > 0
  } catch (error) {
    console.error('Error updating team info:', error)
    return false
  }
}

export async function getAllTeams(): Promise<User[]> {
  try {
    const db = await getDatabase()
    const usersCollection = db.collection<User>('users')

    const teams = await usersCollection
      .find({ role: 'team' })
      .project({ password: 0 })
      .toArray()

    return teams as User[]
  } catch (error) {
    console.error('Error fetching teams:', error)
    return []
  }
}
