import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { updateTeamInfo } from '@/lib/db'

const secret = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'your-secret-key-change-this'
)

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { payload } = await jwtVerify(token, secret)

    if (payload.role !== 'team') {
      return NextResponse.json(
        { error: 'Only teams can submit' },
        { status: 403 }
      )
    }

    const data = await request.json()

    const success = await updateTeamInfo(payload.username as string, data)

    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Failed to update team info' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
