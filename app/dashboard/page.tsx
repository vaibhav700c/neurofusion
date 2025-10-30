"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  LogOut, Users, Github, Presentation, 
  Youtube, CheckCircle, Loader2, AlertCircle, Trophy, Shield, Edit2, Save, Lock
} from "lucide-react"

interface TeamData {
  teamMembers: string[]
  problemStatement: string
  documentationLink: string
  githubLink: string
  presentationLink: string
  youtubeLink: string
  currentStage: 'initial' | 'review2' | 'final' | 'completed'
}

interface AdminTeam {
  username: string
  teamName: string
  teamMembers: string[]
  problemStatement: string
  documentationLink?: string
  githubLink?: string
  presentationLink?: string
  youtubeLink?: string
  currentStage?: string
}

const PROBLEM_STATEMENTS = [
  "Smart Surveillance for Public Safety",
  "Assistive Technology for Motor Disabilities", 
  "Remote Technical Training",
  "Social Anxiety and Public Speaking",
  "Elderly Care and Emergency Response",
  "Campus Problem Solver",
  "Smart Waste & Recycling Management for Jammu City",
  "Driver Safety & Monitoring",
  "Career Counseling and Skill Mapping",
  "Heritage and Tourism Promotion",
  "Disaster Management and Climate Change",
  "Remote Patient Monitoring",
  "Assistive Technology for the Visually Impaired",
  "Smart Agriculture",
  "Flood Monitoring and River Management",
  "Open Innovation"
]

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ text: "", type: "" })
  const [isEditingStage1, setIsEditingStage1] = useState(false)
  const [hasInitialSubmission, setHasInitialSubmission] = useState(false)
  const [isEditingReview2, setIsEditingReview2] = useState(false)
  const [hasReview2Submission, setHasReview2Submission] = useState(false)
  const [isEditingFinal, setIsEditingFinal] = useState(false)
  const [hasFinalSubmission, setHasFinalSubmission] = useState(false)
  
  const [teamData, setTeamData] = useState<TeamData>({
    teamMembers: ["", "", "", "", ""],
    problemStatement: "",
    documentationLink: "",
    githubLink: "",
    presentationLink: "",
    youtubeLink: "",
    currentStage: 'initial'
  })

  const [teams, setTeams] = useState<AdminTeam[]>([])

  useEffect(() => {
    if (user?.role === 'team') {
      fetchTeamData()
    } else if (user?.role === 'admin') {
      fetchAllTeams()
    }
  }, [user])

  // Reset edit mode when hasInitialSubmission changes
  useEffect(() => {
    if (hasInitialSubmission) {
      setIsEditingStage1(false)
    }
  }, [hasInitialSubmission])

  // Reset Review 2 edit mode when hasReview2Submission changes
  useEffect(() => {
    if (hasReview2Submission) {
      setIsEditingReview2(false)
    }
  }, [hasReview2Submission])

  // Reset Final edit mode when hasFinalSubmission changes
  useEffect(() => {
    if (hasFinalSubmission) {
      setIsEditingFinal(false)
    }
  }, [hasFinalSubmission])

  const fetchTeamData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/session')
      const data = await response.json()
      if (data.user) {
        // Check if user has submitted initial data - either has problem statement OR has team members
        const hasTeamMembers = data.user.teamMembers && data.user.teamMembers.some((member: string) => member && member.trim() !== "")
        const hasProblemStatement = data.user.problemStatement && data.user.problemStatement !== ""
        const hasData = hasTeamMembers || hasProblemStatement
        setHasInitialSubmission(hasData)

        // Check if user has submitted Review 2 data
        const hasGithubLink = data.user.githubLink && data.user.githubLink.trim() !== ""
        const hasPresentationLink = data.user.presentationLink && data.user.presentationLink.trim() !== ""
        const hasReview2Data = hasGithubLink && hasPresentationLink
        setHasReview2Submission(hasReview2Data)

        // Check if user has submitted Final data
        const hasYoutubeLink = data.user.youtubeLink && data.user.youtubeLink.trim() !== ""
        const hasFinalData = hasYoutubeLink
        setHasFinalSubmission(hasFinalData)
        
        // Ensure teamMembers array always has 5 slots
        const existingMembers = data.user.teamMembers || []
        const filledMembers = [...existingMembers]
        while (filledMembers.length < 5) {
          filledMembers.push("")
        }
        
        // Auto-update stage based on completed submissions
        let currentStage = data.user.currentStage || 'initial'
        
        // If user has Final data but stage is still 'final', move to 'completed'
        if (hasFinalData && currentStage === 'final') {
          currentStage = 'completed'
          fetch('/api/team/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentStage: 'completed' })
          }).catch(console.error)
        }
        // If user has Review 2 data but stage is still 'review2', move to 'final'
        else if (hasReview2Data && currentStage === 'review2') {
          currentStage = 'final'
          fetch('/api/team/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentStage: 'final' })
          }).catch(console.error)
        }
        // If user has initial data but stage is still 'initial', move to 'review2'
        else if (hasData && currentStage === 'initial') {
          currentStage = 'review2'
          fetch('/api/team/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentStage: 'review2' })
          }).catch(console.error)
        }

        setTeamData({
          teamMembers: filledMembers,
          problemStatement: data.user.problemStatement || "",
          documentationLink: data.user.documentationLink || "",
          githubLink: data.user.githubLink || "",
          presentationLink: data.user.presentationLink || "",
          youtubeLink: data.user.youtubeLink || "",
          currentStage: currentStage
        })
        
        // Debug log to see what data we're getting
        console.log('📊 Dashboard: Fetched data for', data.user.username, {
          initialSubmission: { hasData, hasTeamMembers, hasProblemStatement },
          review2Submission: { hasReview2Data, hasGithubLink, hasPresentationLink },
          finalSubmission: { hasFinalData, hasYoutubeLink },
          teamMembers: filledMembers,
          problemStatement: data.user.problemStatement,
          githubLink: data.user.githubLink,
          presentationLink: data.user.presentationLink,
          youtubeLink: data.user.youtubeLink,
          originalStage: data.user.currentStage,
          updatedStage: currentStage,
          willShowInitialView: hasData,
          willShowReview2View: hasReview2Data,
          willShowFinalView: hasFinalData
        })
      }
    } catch (error) {
      console.error('Error fetching team data:', error)
      setMessage({ text: "Failed to load team data", type: "error" })
    } finally {
      setLoading(false)
    }
  }

  const fetchAllTeams = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/teams')
      const data = await response.json()
      console.log('Admin teams response:', data)
      
      if (data.success && data.teams) {
        setTeams(data.teams)
        console.log('Teams loaded:', data.teams.length)
      } else {
        console.error('Failed to fetch teams:', data.error || 'No teams data')
        setMessage({ text: "Failed to load teams: " + (data.error || 'No data'), type: "error" })
      }
    } catch (error) {
      console.error('Error fetching teams:', error)
      setMessage({ text: "Error loading teams: " + String(error), type: "error" })
    } finally {
      setLoading(false)
    }
  }

  const saveInitialData = async () => {
    setSaving(true)
    setMessage({ text: "", type: "" })

    const filledMembers = teamData.teamMembers.filter(m => m.trim() !== '')
    if (filledMembers.length === 0) {
      setMessage({ text: "Please add at least one team member", type: "error" })
      setSaving(false)
      return
    }
    if (!teamData.problemStatement) {
      setMessage({ text: "Please select a problem statement", type: "error" })
      setSaving(false)
      return
    }

    try {
      const response = await fetch('/api/team/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamMembers: teamData.teamMembers.filter(m => m.trim() !== ''),
          problemStatement: teamData.problemStatement,
          documentationLink: teamData.documentationLink,
          currentStage: 'review2' // Move to Review 2 stage after initial submission
        })
      })

      const data = await response.json()
      if (data.success) {
        setHasInitialSubmission(true)
        setIsEditingStage1(false)
        setMessage({ 
          text: hasInitialSubmission ? "Updated successfully! You can continue editing until first review." : "Submitted successfully! You can edit this until first review.",
          type: "success"
        })
        await fetchTeamData()
        setTimeout(() => setMessage({ text: "", type: "" }), 5000)
      } else {
        setMessage({ text: "Failed to save: " + (data.error || 'Unknown error'), type: "error" })
      }
    } catch (error) {
      setMessage({ text: "Error: " + String(error), type: "error" })
    } finally {
      setSaving(false)
    }
  }

  const saveReview2Data = async () => {
    setSaving(true)
    setMessage({ text: "", type: "" })

    if (!teamData.githubLink || !teamData.presentationLink) {
      setMessage({ text: "GitHub and Presentation links are required", type: "error" })
      setSaving(false)
      return
    }

    try {
      const response = await fetch('/api/team/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          githubLink: teamData.githubLink,
          presentationLink: teamData.presentationLink,
          currentStage: 'final' // Move to Final stage after Review 2 submission
        })
      })

      const data = await response.json()
      if (data.success) {
        setHasReview2Submission(true)
        setIsEditingReview2(false)
        setMessage({ text: "Review 2 submission saved!", type: "success" })
        await fetchTeamData()
        setTimeout(() => setMessage({ text: "", type: "" }), 5000)
      } else {
        setMessage({ text: "Failed to save: " + (data.error || 'Unknown error'), type: "error" })
      }
    } catch (error) {
      setMessage({ text: "Error: " + String(error), type: "error" })
    } finally {
      setSaving(false)
    }
  }

  const saveFinalData = async () => {
    setSaving(true)
    setMessage({ text: "", type: "" })

    if (!teamData.youtubeLink) {
      setMessage({ text: "YouTube video link is required", type: "error" })
      setSaving(false)
      return
    }

    try {
      const response = await fetch('/api/team/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          youtubeLink: teamData.youtubeLink,
          currentStage: 'completed'
        })
      })

      const data = await response.json()
      if (data.success) {
        setHasFinalSubmission(true)
        setIsEditingFinal(false)
        setMessage({ text: "Final submission completed! 🎉", type: "success" })
        await fetchTeamData()
        setTimeout(() => setMessage({ text: "", type: "" }), 5000)
      } else {
        setMessage({ text: "Failed to save: " + (data.error || 'Unknown error'), type: "error" })
      }
    } catch (error) {
      setMessage({ text: "Error: " + String(error), type: "error" })
    } finally {
      setSaving(false)
    }
  }

  const updateTeamMember = (index: number, value: string) => {
    const newMembers = [...teamData.teamMembers]
    newMembers[index] = value
    setTeamData({ ...teamData, teamMembers: newMembers })
  }

  const canEditInitial = teamData.currentStage === 'initial'

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <Card className="p-8 bg-gray-900 border-emerald-500/30">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Shield className="w-8 h-8 text-emerald-400" />
              <p className="text-white text-lg">Please log in to access the dashboard</p>
            </div>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Go to Home
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  if (user.role === 'admin') {
    const totalTeams = teams.length
    const stageStats = {
      initial: teams.filter(t => t.currentStage === 'initial').length,
      review2: teams.filter(t => t.currentStage === 'review2').length,
      final: teams.filter(t => t.currentStage === 'final').length,
      completed: teams.filter(t => t.currentStage === 'completed').length
    }

    return (
      <div className="min-h-screen bg-gray-950 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Card className="p-6 bg-gray-900 border border-emerald-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Sponsor Logos */}
                <div className="flex items-center gap-2">
                  <img src="/baldmann.png" alt="BaldMann" className="w-10 h-10 object-contain" />
                  <img src="/jammu.png" alt="University of Jammu" className="w-10 h-10 object-contain" />
                </div>
                
                <div className="w-px h-12 bg-gray-700"></div>
                
                <div className="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                  <p className="text-gray-400">Welcome, {user.username}</p>
                </div>
              </div>
              <Button onClick={logout} variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/20">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="p-5 bg-gray-900 border border-emerald-500/30">
              <div className="text-emerald-400 text-sm font-medium mb-2">Total Teams</div>
              <div className="text-3xl font-bold text-white">{totalTeams}</div>
            </Card>
            <Card className="p-5 bg-gray-900 border border-blue-500/30">
              <div className="text-blue-400 text-sm font-medium mb-2">Initial</div>
              <div className="text-3xl font-bold text-white">{stageStats.initial}</div>
            </Card>
            <Card className="p-5 bg-gray-900 border border-violet-500/30">
              <div className="text-violet-400 text-sm font-medium mb-2">Review 2</div>
              <div className="text-3xl font-bold text-white">{stageStats.review2}</div>
            </Card>
            <Card className="p-5 bg-gray-900 border border-yellow-500/30">
              <div className="text-yellow-400 text-sm font-medium mb-2">Final</div>
              <div className="text-3xl font-bold text-white">{stageStats.final}</div>
            </Card>
            <Card className="p-5 bg-gray-900 border border-green-500/30">
              <div className="text-green-400 text-sm font-medium mb-2">Completed</div>
              <div className="text-3xl font-bold text-white">{stageStats.completed}</div>
            </Card>
          </div>

          {message.text && (
            <Card className={`p-4 mb-4 border ${message.type === 'error' ? 'border-red-500/50 bg-red-900/20' : 'border-green-500/50 bg-green-900/20'}`}>
              <p className={`${message.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                {message.text}
              </p>
            </Card>
          )}

          <Card className="p-6 bg-gray-900 border border-emerald-500/30">
            <h2 className="text-xl font-bold text-white mb-4">All Teams</h2>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Team</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Stage</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Members</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Problem</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Links</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 px-4 text-center text-gray-500">
                          <div className="flex flex-col items-center gap-2">
                            <AlertCircle className="w-8 h-8 text-gray-600" />
                            <p>No teams found. Make sure the database is initialized.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      teams.map((team) => (
                        <tr key={team.username} className="border-b border-gray-800 hover:bg-gray-800/50">
                          <td className="py-3 px-4">
                            <div className="font-medium text-white">{team.teamName}</div>
                            <div className="text-sm text-gray-500">@{team.username}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              team.currentStage === 'completed' ? 'bg-green-500/20 text-green-400' :
                              team.currentStage === 'final' ? 'bg-yellow-500/20 text-yellow-400' :
                              team.currentStage === 'review2' ? 'bg-violet-500/20 text-violet-400' :
                              'bg-blue-500/20 text-blue-400'
                            }`}>
                              {team.currentStage === 'completed' ? 'Completed' :
                               team.currentStage === 'final' ? 'Final' :
                               team.currentStage === 'review2' ? 'Review 2' : 'Initial'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-300 text-sm">
                            {team.teamMembers?.filter(m => m).length || 0} / 5
                          </td>
                          <td className="py-3 px-4 text-gray-300 text-sm max-w-xs truncate">
                            {team.problemStatement || <span className="text-gray-600 italic">Not selected</span>}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              {team.githubLink && (
                                <a href={team.githubLink} target="_blank" rel="noopener noreferrer" 
                                   className="text-violet-400 hover:text-violet-300">
                                  <Github className="w-4 h-4" />
                                </a>
                              )}
                              {team.presentationLink && (
                                <a href={team.presentationLink} target="_blank" rel="noopener noreferrer" 
                                   className="text-orange-400 hover:text-orange-300">
                                  <Presentation className="w-4 h-4" />
                                </a>
                              )}
                              {team.youtubeLink && (
                                <a href={team.youtubeLink} target="_blank" rel="noopener noreferrer" 
                                   className="text-red-400 hover:text-red-300">
                                  <Youtube className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-6 bg-gray-900 border border-emerald-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Sponsor Logos */}
              <div className="flex items-center gap-2">
                <img src="/baldmann.png" alt="BaldMann" className="w-10 h-10 object-contain" />
                <img src="/jammu.png" alt="University of Jammu" className="w-10 h-10 object-contain" />
              </div>
              
              <div className="w-px h-12 bg-gray-700"></div>
              
              <div className="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Team {user.teamName || user.username}</h1>
                <p className="text-gray-400">Submission Dashboard</p>
              </div>
            </div>
            <Button onClick={logout} variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/20">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </Card>

        {message.text && (
          <Card className={`p-4 ${message.type === 'success' ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-red-900/20 border-red-500/50'}`}>
            <div className="flex items-center gap-3">
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400" />
              )}
              <p className="text-white">{message.text}</p>
            </div>
          </Card>
        )}

        {loading ? (
          <Card className="p-12 bg-gray-900 border border-emerald-500/30">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
              <p className="text-gray-400">Loading...</p>
            </div>
          </Card>
        ) : (
          <>
            <Card className="p-6 bg-gray-900 border border-emerald-500/30">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Initial Registration</h3>
                    <p className="text-sm text-gray-400">Team details and problem selection</p>
                  </div>
                </div>
                {hasInitialSubmission && !isEditingStage1 && canEditInitial && (
                  <Button
                    onClick={() => setIsEditingStage1(true)}
                    variant="outline"
                    className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
                {hasInitialSubmission && !canEditInitial && (
                  <div className="flex items-center gap-2 text-yellow-400 text-sm">
                    <Lock className="w-4 h-4" />
                    Cannot be edited
                  </div>
                )}
              </div>

              {hasInitialSubmission && !isEditingStage1 ? (
                <div className="space-y-4 bg-gray-800/50 p-5 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Already Submitted</span>
                    {canEditInitial && <span className="text-gray-400 text-sm">(Click Edit to modify)</span>}
                  </div>
                  <div>
                    <Label className="text-gray-400 text-xs uppercase mb-2">Team Members</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {teamData.teamMembers.filter(m => m && m.trim() !== "").map((member, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-700 rounded-full text-white text-sm">
                          {member.trim()}
                        </span>
                      ))}
                      {teamData.teamMembers.filter(m => m && m.trim() !== "").length === 0 && (
                        <span className="text-gray-500 text-sm italic">No team members added</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-xs uppercase mb-2">Problem Statement</Label>
                    <p className="text-white mt-1">{teamData.problemStatement}</p>
                  </div>
                  {teamData.documentationLink && teamData.documentationLink.trim() !== "" && (
                    <div>
                      <Label className="text-gray-400 text-xs uppercase mb-2">Documentation</Label>
                      <a href={teamData.documentationLink.startsWith('http') ? teamData.documentationLink : `https://${teamData.documentationLink}`} 
                         target="_blank" rel="noopener noreferrer" 
                         className="text-blue-400 hover:text-blue-300 mt-1 block break-all">
                        {teamData.documentationLink}
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {hasInitialSubmission && isEditingStage1 && (
                    <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Edit2 className="w-5 h-5 text-blue-400" />
                        <span className="text-blue-400 font-medium">Edit Mode</span>
                        <span className="text-gray-400 text-sm">- Modify your submission below</span>
                      </div>
                    </div>
                  )}
                  <div>
                    <Label className="text-white mb-2 block">Team Members (up to 5)</Label>
                    <div className="space-y-2">
                      {teamData.teamMembers.map((member, index) => (
                        <Input
                          key={index}
                          value={member}
                          onChange={(e) => updateTeamMember(index, e.target.value)}
                          placeholder={`Member ${index + 1} Name`}
                          className="bg-gray-800 border-gray-700 text-white"
                          disabled={!canEditInitial}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-white mb-2 block">Problem Statement</Label>
                    <Select 
                      value={teamData.problemStatement} 
                      onValueChange={(value) => setTeamData({...teamData, problemStatement: value})}
                      disabled={!canEditInitial}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 focus:ring-2 focus:ring-emerald-500">
                        <SelectValue placeholder="Select a problem" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white max-h-[300px] overflow-y-auto z-50">
                        {PROBLEM_STATEMENTS.map((problem) => (
                          <SelectItem 
                            key={problem} 
                            value={problem}
                            className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer px-3 py-2 text-sm"
                          >
                            {problem}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-white mb-2 block">Documentation Link <span className="text-gray-500">(Optional)</span></Label>
                    <Input
                      value={teamData.documentationLink}
                      onChange={(e) => setTeamData({...teamData, documentationLink: e.target.value})}
                      placeholder="https://..."
                      className="bg-gray-800 border-gray-700 text-white"
                      disabled={!canEditInitial}
                    />
                  </div>

                  <div className="flex gap-3">
                    {hasInitialSubmission && isEditingStage1 && (
                      <Button 
                        onClick={() => {
                          setIsEditingStage1(false)
                          fetchTeamData() // Reset form data to original values
                        }}
                        variant="outline"
                        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        Cancel
                      </Button>
                    )}
                    <Button 
                      onClick={saveInitialData}
                      disabled={saving || !canEditInitial}
                      className={`${hasInitialSubmission && isEditingStage1 ? 'flex-1' : 'w-full'} bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5`}
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5 mr-2" />
                          {hasInitialSubmission ? 'Update Submission' : 'Submit Registration'}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            <Card className={`p-6 bg-gray-900 border ${(teamData.currentStage !== 'initial' || hasInitialSubmission) ? 'border-violet-500/30' : 'border-gray-700/30 opacity-60'}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${(teamData.currentStage !== 'initial' || hasInitialSubmission) ? 'bg-violet-600' : 'bg-gray-700'}`}>
                    <Github className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Review 2 Submission</h3>
                    <p className="text-sm text-gray-400">GitHub repository and presentation</p>
                  </div>
                </div>
                {hasReview2Submission && !isEditingReview2 && (
                  <Button
                    onClick={() => setIsEditingReview2(true)}
                    variant="outline"
                    className="border-violet-500/50 text-violet-400 hover:bg-violet-500/20"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>

              {(!hasInitialSubmission && teamData.currentStage === 'initial') ? (
                <div className="flex items-center gap-3 text-yellow-400 bg-yellow-900/20 p-4 rounded">
                  <Lock className="w-5 h-5" />
                  <p className="text-sm">Complete initial registration first</p>
                </div>
              ) : hasReview2Submission && !isEditingReview2 ? (
                <div className="space-y-4 bg-gray-800/50 p-5 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-violet-400" />
                    <span className="text-violet-400 font-medium">Review 2 Submitted</span>
                    <span className="text-gray-400 text-sm">(Click Edit to modify)</span>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-xs uppercase mb-2">GitHub Repository</Label>
                    <a href={teamData.githubLink.startsWith('http') ? teamData.githubLink : `https://${teamData.githubLink}`} 
                       target="_blank" rel="noopener noreferrer" 
                       className="text-violet-400 hover:text-violet-300 mt-1 block break-all">
                      {teamData.githubLink}
                    </a>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-xs uppercase mb-2">Presentation</Label>
                    <a href={teamData.presentationLink.startsWith('http') ? teamData.presentationLink : `https://${teamData.presentationLink}`} 
                       target="_blank" rel="noopener noreferrer" 
                       className="text-orange-400 hover:text-orange-300 mt-1 block break-all">
                      {teamData.presentationLink}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {hasReview2Submission && isEditingReview2 && (
                    <div className="bg-violet-900/20 border border-violet-500/50 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Edit2 className="w-5 h-5 text-violet-400" />
                        <span className="text-violet-400 font-medium">Edit Mode</span>
                        <span className="text-gray-400 text-sm">- Modify your Review 2 submission</span>
                      </div>
                    </div>
                  )}
                  <div>
                    <Label className="text-white mb-2 block">GitHub Repository Link</Label>
                    <Input
                      value={teamData.githubLink}
                      onChange={(e) => setTeamData({...teamData, githubLink: e.target.value})}
                      placeholder="https://github.com/..."
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-white mb-2 block">Presentation Link</Label>
                    <Input
                      value={teamData.presentationLink}
                      onChange={(e) => setTeamData({...teamData, presentationLink: e.target.value})}
                      placeholder="https://drive.google.com/..."
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="flex gap-3">
                    {hasReview2Submission && isEditingReview2 && (
                      <Button 
                        onClick={() => {
                          setIsEditingReview2(false)
                          fetchTeamData() // Reset form data to original values
                        }}
                        variant="outline"
                        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        Cancel
                      </Button>
                    )}
                    <Button 
                      onClick={saveReview2Data}
                      disabled={saving}
                      className={`${hasReview2Submission && isEditingReview2 ? 'flex-1' : 'w-full'} bg-violet-600 hover:bg-violet-700 text-white font-bold py-5`}
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5 mr-2" />
                          {hasReview2Submission ? 'Update Review 2' : 'Submit for Review 2'}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            <Card className={`p-6 bg-gray-900 border ${teamData.currentStage === 'final' || teamData.currentStage === 'completed' ? 'border-yellow-500/30' : 'border-gray-700/30 opacity-60'}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${teamData.currentStage === 'final' || teamData.currentStage === 'completed' ? 'bg-yellow-600' : 'bg-gray-700'}`}>
                    <Youtube className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Final Submission</h3>
                    <p className="text-sm text-gray-400">Project demonstration video</p>
                  </div>
                </div>
                {hasFinalSubmission && !isEditingFinal && (
                  <Button
                    onClick={() => setIsEditingFinal(true)}
                    variant="outline"
                    className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
                {hasFinalSubmission && teamData.currentStage === 'completed' && (
                  <div className="flex items-center gap-2 text-green-400">
                    <Trophy className="w-5 h-5" />
                    <span className="font-medium">Completed! 🎉</span>
                  </div>
                )}
              </div>

              {teamData.currentStage !== 'final' && teamData.currentStage !== 'completed' ? (
                <div className="flex items-center gap-3 text-yellow-400 bg-yellow-900/20 p-4 rounded">
                  <Lock className="w-5 h-5" />
                  <p className="text-sm">Complete Review 2 submission first</p>
                </div>
              ) : hasFinalSubmission && !isEditingFinal ? (
                <div className="space-y-4 bg-gray-800/50 p-5 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-medium">Final Submission Completed</span>
                    {teamData.currentStage !== 'completed' && <span className="text-gray-400 text-sm">(Click Edit to modify)</span>}
                  </div>
                  <div>
                    <Label className="text-gray-400 text-xs uppercase mb-2">YouTube Video</Label>
                    <a href={teamData.youtubeLink.startsWith('http') ? teamData.youtubeLink : `https://${teamData.youtubeLink}`} 
                       target="_blank" rel="noopener noreferrer" 
                       className="text-red-400 hover:text-red-300 mt-1 block break-all">
                      {teamData.youtubeLink}
                    </a>
                  </div>
                  {teamData.currentStage === 'completed' && (
                    <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4 mt-4">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-medium">🎉 All Submissions Complete!</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">Your team has successfully completed all submission stages.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {hasFinalSubmission && isEditingFinal && (
                    <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Edit2 className="w-5 h-5 text-yellow-400" />
                        <span className="text-yellow-400 font-medium">Edit Mode</span>
                        <span className="text-gray-400 text-sm">- Modify your Final submission</span>
                      </div>
                    </div>
                  )}
                  <div>
                    <Label className="text-white mb-2 block">YouTube Video Link</Label>
                    <Input
                      value={teamData.youtubeLink}
                      onChange={(e) => setTeamData({...teamData, youtubeLink: e.target.value})}
                      placeholder="https://youtube.com/..."
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="flex gap-3">
                    {hasFinalSubmission && isEditingFinal && (
                      <Button 
                        onClick={() => {
                          setIsEditingFinal(false)
                          fetchTeamData() // Reset form data to original values
                        }}
                        variant="outline"
                        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        Cancel
                      </Button>
                    )}
                    <Button 
                      onClick={saveFinalData}
                      disabled={saving}
                      className={`${hasFinalSubmission && isEditingFinal ? 'flex-1' : 'w-full'} bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-5`}
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Trophy className="w-5 h-5 mr-2" />
                          {hasFinalSubmission ? 'Update Final Video' : 'Submit Final Video'}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
