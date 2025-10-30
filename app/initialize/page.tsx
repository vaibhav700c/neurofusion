"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function InitializePage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const initializeDatabase = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/init-db', { method: 'POST' })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ success: false, error: String(error) })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full p-8 bg-gray-800/90 border-emerald-500/30">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-emerald-400" />
          <h1 className="text-3xl font-bold text-white">
            NeuroFusion'25 Database Setup
          </h1>
        </div>

        <div className="space-y-4">
          <p className="text-gray-300">
            Click the button below to initialize the database with:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>1 Admin account (username: <code className="text-emerald-400">admin</code>)</li>
            <li>16 Team accounts (alpha, bravo, charlie, delta, echo, foxtrot, golf, hunter, juliet, kilo, lima, mike, november, oscar, quebec, romeo)</li>
          </ul>

          <Button
            onClick={initializeDatabase}
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Initializing Database...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5 mr-2" />
                Initialize Database
              </>
            )}
          </Button>

          {result && (
            <Card className={`p-6 ${result.success ? 'bg-emerald-900/30 border-emerald-500/50' : 'bg-red-900/30 border-red-500/50'}`}>
              <div className="flex items-start gap-3">
                {result.success ? (
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
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

                      <p className="text-xs text-gray-400 italic">
                        💡 Credentials are also saved in CREDENTIALS.md file
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded">
            <p className="text-sm text-yellow-300">
              <strong>Note:</strong> This will only work if the database is empty. If users already exist, you'll get a message that the database is already initialized.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
