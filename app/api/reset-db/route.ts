import { NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

export async function POST() {
  try {
    const db = await getDatabase()
    const usersCollection = db.collection('users')

    // Delete all documents in the users collection
    const result = await usersCollection.deleteMany({})

    console.log(`Deleted ${result.deletedCount} documents from users collection`)

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${result.deletedCount} documents. Database is now empty.`,
      deletedCount: result.deletedCount
    }, { status: 200 })
  } catch (error) {
    console.error('Error resetting database:', error)
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Use POST to reset the database (this will delete all data!)' },
    { status: 405 }
  )
}
