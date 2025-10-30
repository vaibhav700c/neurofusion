"use client"

import { useState } from "react"
import { MOCK_TEAMS, PROBLEM_STATEMENTS } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"

export function TeamList() {
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterReview, setFilterReview] = useState<"all" | "review1" | "review2">("all")

  const filteredTeams = MOCK_TEAMS.filter((team) => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterReview === "all" ||
      (filterReview === "review1" && team.review1Submitted) ||
      (filterReview === "review2" && team.review2Submitted)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <Input
          placeholder="Search teams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <select
          value={filterReview}
          onChange={(e) => setFilterReview(e.target.value as "all" | "review1" | "review2")}
          className="px-3 py-2 bg-input border border-input rounded-md text-foreground"
        >
          <option value="all">All Teams</option>
          <option value="review1">Review 1 Submitted</option>
          <option value="review2">Review 2 Submitted</option>
        </select>
      </div>

      {/* Team Cards */}
      <div className="space-y-3">
        {filteredTeams.map((team) => {
          const problemStatement = PROBLEM_STATEMENTS.find((ps) => ps.id === team.problemStatement)
          const isExpanded = expandedTeam === team.id

          return (
            <Card key={team.id} className="border-cyan-500/20 hover:border-cyan-500/50 transition-all overflow-hidden">
              {/* Header */}
              <button
                onClick={() => setExpandedTeam(isExpanded ? null : team.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-cyan-500/5 transition-colors"
              >
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-foreground mb-1">{team.name}</h3>
                  <p className="text-sm text-muted-foreground">{problemStatement?.title}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    {team.review1Submitted && (
                      <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">Review 1 ✓</span>
                    )}
                    {team.review2Submitted && (
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400">
                        Review 2 ✓
                      </span>
                    )}
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t border-cyan-500/20 p-4 bg-cyan-500/5 space-y-4">
                  {/* Team Members */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Team Members</h4>
                    <div className="space-y-1">
                      {team.members.map((member, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{member.name}</span> ({member.role}) -{" "}
                          {member.email}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Contact</h4>
                    <p className="text-sm text-muted-foreground">{team.contactInfo}</p>
                  </div>

                  {/* Submission Links */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Submissions</h4>
                    <div className="space-y-2">
                      {team.githubRepo && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">GitHub Repository</span>
                          <a
                            href={team.githubRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                          >
                            <span className="text-xs">View</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                      {team.canvaLink && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Canva Presentation</span>
                          <a
                            href={team.canvaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                          >
                            <span className="text-xs">View</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                      {team.youtubeUrl && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">YouTube Video</span>
                          <a
                            href={team.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                          >
                            <span className="text-xs">View</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submission Timestamps */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Timeline</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      {team.review1SubmittedAt && <p>Review 1 submitted: {team.review1SubmittedAt.toLocaleString()}</p>}
                      {team.review2SubmittedAt && <p>Review 2 submitted: {team.review2SubmittedAt.toLocaleString()}</p>}
                    </div>
                  </div>

                  {/* Export Button */}
                  <Button
                    onClick={() => {
                      const csv = `Team Name,${team.name}\nProblem,${problemStatement?.title}\nMembers,"${team.members.map((m) => m.name).join(", ")}"\nGitHub,${team.githubRepo || "N/A"}\nCanva,${team.canvaLink || "N/A"}\nYouTube,${team.youtubeUrl || "N/A"}`
                      const blob = new Blob([csv], { type: "text/csv" })
                      const url = window.URL.createObjectURL(blob)
                      const a = document.createElement("a")
                      a.href = url
                      a.download = `${team.name}-submission.csv`
                      a.click()
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Export as CSV
                  </Button>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {filteredTeams.length === 0 && (
        <Card className="p-8 text-center border-cyan-500/20">
          <p className="text-muted-foreground">No teams found matching your criteria.</p>
        </Card>
      )}
    </div>
  )
}
