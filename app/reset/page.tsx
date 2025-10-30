"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trash2, RefreshCw, AlertCircle, CheckCircle, Loader2 } from "lucide-react"

export default function ResetPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [step, setStep] = useState<'ready' | 'reset' | 'init'>('ready')

  const resetDatabase = async () => {
    setLoading(true)
    setResult(null)
    setStep('reset')

    try {
      const response = await fetch('/api/reset-db', { method: 'POST' })
      const data = await response.json()
      
      if (data.success) {
        setResult(data)
        // Auto-proceed to initialization
        setTimeout(() => initializeDatabase(), 1000)
      } else {
        setResult(data)
        setLoading(false)
      }
    } catch (error) {
      setResult({ success: false, error: String(error) })
      setLoading(false)
    }
  }

  const initializeDatabase = async () => {
    setStep('init')

    try {
      const response = await fetch('/api/init-db', { method: 'POST' })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ success: false, error: String(error) })
    } finally {
      setLoading(false)
      setStep('ready')
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full p-8 bg-gray-800/90 border-red-500/30">
        <div className="flex items-center gap-3 mb-6">
          <Trash2 className="w-8 h-8 text-red-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">
              Reset & Reinitialize Database
            </h1>
            <p className="text-gray-400 text-sm">
              Delete all data and create fresh accounts
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-red-900/20 border border-red-500/30 rounded p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-400 mb-1">Warning!</h3>
                <p className="text-sm text-gray-300">
                  This will permanently delete ALL data from the database including:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-400 mt-2 space-y-1">
                  <li>All team accounts and their data</li>
                  <li>Admin account</li>
                  <li>All team member information</li>
                  <li>All problem statement selections</li>
                  <li>All submission links (GitHub, Presentations, YouTube videos)</li>
                  <li>All progress tracking</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-emerald-900/20 border border-emerald-500/30 rounded p-4">
            <div className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-emerald-400 mb-1">After Reset</h3>
                <p className="text-sm text-gray-300">
                  The database will be automatically reinitialized with:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-400 mt-2 space-y-1">
                  <li>1 Admin account with credentials from CREDENTIALS.md</li>
                  <li>16 Fresh team accounts (Alpha through Romeo)</li>
                  <li>All accounts with new stage tracking system</li>
                  <li>Empty submission fields ready for new data</li>
                </ul>
              </div>
            </div>
          </div>

          <Button
            onClick={resetDatabase}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 text-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                {step === 'reset' ? 'Deleting all data...' : 'Creating fresh accounts...'}
              </>
            ) : (
              <>
                <Trash2 className="w-6 h-6 mr-2" />
                Reset & Reinitialize Database
              </>
            )}
          </Button>

          {result && (
            <Card className={`p-6 ${result.success ? 'bg-emerald-900/30 border-emerald-500/50' : 'bg-red-900/30 border-red-500/50'}`}>
              <div className="flex items-start gap-3">
                {result.success ? (
                  <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                )}
                <div className="flex-1">
                  <h3 className={`font-bold mb-2 ${result.success ? 'text-emerald-400' : 'text-red-400'}`}>
                    {result.success ? 'Success!' : 'Error'}
                  </h3>
                  <p className="text-gray-300 mb-4">{result.message || result.error}</p>

                  {result.success && result.credentials && (
                    <div className="space-y-4">
                      <div className="bg-gray-800/50 p-4 rounded border border-emerald-500/30">
                        <h4 className="font-bold text-emerald-400 mb-2">Admin Credentials:</h4>
                        <p className="text-sm text-gray-300">
                          Username: <code className="text-emerald-400">{result.credentials.admin.username}</code>
                        </p>
                        <p className="text-sm text-gray-300">
                          Password: <code className="text-emerald-400">{result.credentials.admin.password}</code>
                        </p>
                      </div>

                      <div className="bg-gray-800/50 p-4 rounded border border-violet-500/30">
                        <h4 className="font-bold text-violet-400 mb-2">Team Credentials:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          {result.credentials.teams.map((team: any) => (
                            <div key={team.username} className="text-gray-300">
                              <code className="text-violet-400">{team.username}</code> / <code className="text-yellow-400">{team.password}</code>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-emerald-900/20 border border-emerald-500/30 rounded p-4">
                        <p className="text-sm text-emerald-300 font-semibold">
                          ✅ Database has been successfully reset and reinitialized!
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          You can now login with any team credentials or admin account.
                        </p>
                      </div>

                      <Button
                        onClick={() => window.location.href = '/'}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                      >
                        Go to Login Page
                      </Button>
                    </div>
                  )}

                  {result.deletedCount !== undefined && !result.credentials && (
                    <p className="text-sm text-gray-400 italic">
                      {result.deletedCount} documents deleted. Proceeding to reinitialize...
                    </p>
                  )}
                </div>
              </div>
            </Card>
          )}

          <div className="text-center">
            <a href="/" className="text-sm text-gray-400 hover:text-emerald-400 underline">
              ← Back to Home
            </a>
          </div>
        </div>
      </Card>
    </div>
  )
}
