"use client"

import type React from "react"

import { useState } from "react"
import { type Team, TIMELINE, updateTeam } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, CheckCircle2, AlertCircle } from "lucide-react"

interface SubmissionFormProps {
  team: Team
  reviewRound: "review1" | "review2"
  onSubmit?: () => void
}

export function SubmissionForm({ team, reviewRound, onSubmit }: SubmissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const review1Deadline = TIMELINE[1].time
  const review2Deadline = TIMELINE[2].time
  const deadline = reviewRound === "review1" ? review1Deadline : review2Deadline
  const isDeadlinePassed = new Date() > deadline
  const isAlreadySubmitted = reviewRound === "review1" ? team.review1Submitted : team.review2Submitted

  const requirements =
    reviewRound === "review1"
      ? ["1-page document (PDF)", "GitHub repository link"]
      : ["GitHub repository link", "Canva presentation link", "YouTube video URL"]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed")
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB")
        return
      }
      setUploadedFile(file)
      setError("")
    }
  }

  const handleSubmit = async () => {
    setError("")
    setSuccess(false)

    if (isDeadlinePassed) {
      setError("Submission deadline has passed")
      return
    }

    if (reviewRound === "review1") {
      if (!uploadedFile) {
        setError("Please upload a PDF document")
        return
      }
      if (!team.githubRepo) {
        setError("GitHub repository link is required")
        return
      }
    } else {
      if (!team.githubRepo || !team.canvaLink || !team.youtubeUrl) {
        setError("All submission links are required")
        return
      }
    }

    setIsSubmitting(true)

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updates =
      reviewRound === "review1"
        ? { review1Submitted: true, review1SubmittedAt: new Date() }
        : { review2Submitted: true, review2SubmittedAt: new Date() }

    updateTeam(team.id, updates)
    setSuccess(true)
    setUploadedFile(null)

    setTimeout(() => {
      onSubmit?.()
    }, 1500)

    setIsSubmitting(false)
  }

  if (isAlreadySubmitted) {
    return (
      <Card className="p-6 border-green-500/30 bg-green-500/5">
        <div className="flex items-center gap-3 mb-3">
          <CheckCircle2 className="w-6 h-6 text-green-500" />
          <h3 className="text-lg font-semibold text-foreground">
            Review {reviewRound === "review1" ? "1" : "2"} Submitted
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Your submission was received on{" "}
          {(reviewRound === "review1" ? team.review1SubmittedAt : team.review2SubmittedAt)?.toLocaleString()}
        </p>
      </Card>
    )
  }

  return (
    <Card className="p-6 border-cyan-500/20">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Submit for Review {reviewRound === "review1" ? "1" : "2"}
      </h3>

      {isDeadlinePassed && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-sm text-red-400">Submission deadline has passed</p>
        </div>
      )}

      <div className="space-y-4 mb-6">
        <div>
          <p className="text-sm font-medium text-foreground mb-2">Requirements:</p>
          <ul className="space-y-1">
            {requirements.map((req, idx) => (
              <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
                {req}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-cyan-500/20 pt-4">
          <p className="text-xs text-muted-foreground mb-2">Deadline: {deadline.toLocaleString()}</p>
        </div>
      </div>

      {reviewRound === "review1" && (
        <div className="mb-6">
          <label className="text-sm font-medium text-foreground block mb-2">Upload 1-Page Document (PDF)</label>
          <div className="border-2 border-dashed border-cyan-500/30 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-colors cursor-pointer">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              disabled={isDeadlinePassed}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <p className="text-sm text-foreground font-medium">
                {uploadedFile ? uploadedFile.name : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-muted-foreground">PDF up to 5MB</p>
            </label>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      {success && <p className="text-sm text-green-500 mb-4">Submission successful!</p>}

      <Button
        onClick={handleSubmit}
        disabled={isSubmitting || isDeadlinePassed}
        className="w-full bg-linear-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </Card>
  )
}
