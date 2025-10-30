import { NextResponse } from 'next/server'
import { initializeDatabase } from '@/lib/db'

export async function POST() {
  try {
    const result = await initializeDatabase()
    
    if (result.success) {
      return NextResponse.json(result, { status: 200 })
    } else {
      return NextResponse.json(result, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Use POST to initialize the database' },
    { status: 405 }
  )
}
