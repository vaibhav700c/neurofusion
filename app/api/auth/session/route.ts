import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { getDatabase } from '@/lib/mongodb'

const secret = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'your-secret-key-change-this'
)

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    const { payload } = await jwtVerify(token, secret)

    // Fetch complete user data from database
    const db = await getDatabase()
    const usersCollection = db.collection('users')
    
    const userData = await usersCollection.findOne(
      { username: payload.username },
      { projection: { password: 0 } } // Exclude password from response
    )

    if (!userData) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    return NextResponse.json({
      user: {
        username: userData.username,
        role: userData.role,
        teamName: userData.teamName,
        teamMembers: userData.teamMembers || [],
        problemStatement: userData.problemStatement || "",
        documentationLink: userData.documentationLink || "",
        githubLink: userData.githubLink || "",
        presentationLink: userData.presentationLink || "",
        youtubeLink: userData.youtubeLink || "",
        currentStage: userData.currentStage || 'initial',
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt
      },
    })
  } catch (error) {
    console.error('Session API error:', error)
    return NextResponse.json({ user: null }, { status: 200 })
  }
}
