"use client"

import { useState, useEffect } from "react"
import { type Team, PROBLEM_STATEMENTS, getTeamById, updateTeam } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

interface TeamFormProps {
  teamId: string
}

export function TeamForm({ teamId }: TeamFormProps) {
  const [team, setTeam] = useState<Team | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    members: [{ name: "", email: "", role: "" }],
    contactInfo: "",
    problemStatement: "",
    githubRepo: "",
    canvaLink: "",
    youtubeUrl: "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  useEffect(() => {
    const foundTeam = getTeamById(teamId)
    if (foundTeam) {
      setTeam(foundTeam)
      setFormData({
        name: foundTeam.name,
        members: foundTeam.members,
        contactInfo: foundTeam.contactInfo,
        problemStatement: foundTeam.problemStatement,
        githubRepo: foundTeam.githubRepo || "",
        canvaLink: foundTeam.canvaLink || "",
        youtubeUrl: foundTeam.youtubeUrl || "",
      })
    }
  }, [teamId])

  const handleSave = async () => {
    setIsSaving(true)
    setSaveMessage("")

    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const updated = updateTeam(teamId, {
      ...formData,
      members: formData.members.filter((m) => m.name && m.email),
    })

    if (updated) {
      setTeam(updated)
      setSaveMessage("Draft saved successfully!")
      setTimeout(() => setSaveMessage(""), 3000)
    }

    setIsSaving(false)
  }

  const handleMemberChange = (index: number, field: string, value: string) => {
    const newMembers = [...formData.members]
    newMembers[index] = { ...newMembers[index], [field]: value }
    setFormData({ ...formData, members: newMembers })
  }

  const addMember = () => {
    setFormData({
      ...formData,
      members: [...formData.members, { name: "", email: "", role: "" }],
    })
  }

  const removeMember = (index: number) => {
    setFormData({
      ...formData,
      members: formData.members.filter((_, i) => i !== index),
    })
  }

  if (!team) return null

  const completionPercentage = Math.round(
    (((formData.name ? 1 : 0) +
      (formData.members.filter((m) => m.name && m.email).length > 0 ? 1 : 0) +
      (formData.contactInfo ? 1 : 0) +
      (formData.problemStatement ? 1 : 0) +
      (formData.githubRepo ? 1 : 0) +
      (formData.canvaLink ? 1 : 0) +
      (formData.youtubeUrl ? 1 : 0)) /
      7) *
      100,
  )

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <Card className="p-4 border-cyan-500/20">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-foreground">Profile Completion</p>
          <p className="text-sm font-bold text-cyan-400">{completionPercentage}%</p>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-linear-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </Card>

      {/* Team Name */}
      <div>
        <label className="text-sm font-medium text-foreground">Team Name</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter team name"
          className="mt-1"
        />
      </div>

      {/* Team Members */}
      <div>
        <label className="text-sm font-medium text-foreground mb-3 block">Team Members</label>
        <div className="space-y-3">
          {formData.members.map((member, index) => (
            <Card key={index} className="p-4 border-cyan-500/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder="Name"
                  value={member.name}
                  onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={member.email}
                  onChange={(e) => handleMemberChange(index, "email", e.target.value)}
                />
                <Input
                  placeholder="Role (e.g., Lead, Developer)"
                  value={member.role}
                  onChange={(e) => handleMemberChange(index, "role", e.target.value)}
                />
              </div>
              {formData.members.length > 1 && (
                <Button
                  onClick={() => removeMember(index)}
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-red-500 hover:text-red-600"
                >
                  Remove
                </Button>
              )}
            </Card>
          ))}
        </div>
        <Button
          onClick={addMember}
          variant="outline"
          className="mt-3 border-cyan-500/30 hover:bg-cyan-500/10 bg-transparent"
        >
          + Add Member
        </Button>
      </div>

      {/* Contact Info */}
      <div>
        <label className="text-sm font-medium text-foreground">Contact Information</label>
        <Input
          value={formData.contactInfo}
          onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
          placeholder="Phone or email"
          className="mt-1"
        />
      </div>

      {/* Problem Statement */}
      <div>
        <label className="text-sm font-medium text-foreground">Problem Statement</label>
        <select
          value={formData.problemStatement}
          onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
          className="w-full mt-1 px-3 py-2 bg-input border border-input rounded-md text-foreground"
        >
          <option value="">Select a problem statement</option>
          {PROBLEM_STATEMENTS.map((ps) => (
            <option key={ps.id} value={ps.id}>
              {ps.title}
            </option>
          ))}
        </select>
        {formData.problemStatement && (
          <Card className="mt-3 p-3 border-purple-500/20 bg-purple-500/5">
            <p className="text-sm text-foreground">
              {PROBLEM_STATEMENTS.find((ps) => ps.id === formData.problemStatement)?.description}
            </p>
          </Card>
        )}
      </div>

      {/* Submission Links */}
      <div className="border-t border-cyan-500/20 pt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Submission Links</h3>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">GitHub Repository</label>
            <Input
              value={formData.githubRepo}
              onChange={(e) => setFormData({ ...formData, githubRepo: e.target.value })}
              placeholder="https://github.com/..."
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">Required before Review 1</p>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Canva Presentation Link</label>
            <Input
              value={formData.canvaLink}
              onChange={(e) => setFormData({ ...formData, canvaLink: e.target.value })}
              placeholder="https://canva.com/..."
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">Required before Review 2</p>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">YouTube Video URL</label>
            <Input
              value={formData.youtubeUrl}
              onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
              placeholder="https://youtube.com/watch?v=..."
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">Required before Review 2</p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-3">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-linear-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
        >
          {isSaving ? "Saving..." : "Save Draft"}
        </Button>
        {saveMessage && (
          <div className="flex items-center gap-2 text-green-500">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm">{saveMessage}</span>
          </div>
        )}
      </div>
    </div>
  )
}
