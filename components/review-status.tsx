"use client"

import { type Team, TIMELINE } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Clock, Lock } from "lucide-react"

interface ReviewStatusProps {
  team: Team
}

export function ReviewStatus({ team }: ReviewStatusProps) {
  const now = new Date()
  const review1Time = TIMELINE[1].time
  const review2Time = TIMELINE[2].time

  const isReview1Open = now < review1Time
  const isReview2Open = now < review2Time

  const reviews = [
    {
      id: "review1",
      name: "Review 1",
      deadline: review1Time,
      submitted: team.review1Submitted,
      submittedAt: team.review1SubmittedAt,
      requirements: ["1-page document (PDF)", "GitHub repository"],
      isOpen: isReview1Open,
      isLocked: team.review1Submitted && !isReview1Open,
    },
    {
      id: "review2",
      name: "Review 2",
      deadline: review2Time,
      submitted: team.review2Submitted,
      submittedAt: team.review2SubmittedAt,
      requirements: ["GitHub repository", "Canva presentation", "YouTube video"],
      isOpen: isReview2Open,
      isLocked: team.review2Submitted && !isReview2Open,
    },
  ]

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card
          key={review.id}
          className={`p-4 border transition-all ${
            review.submitted
              ? "border-green-500/30 bg-green-500/5"
              : review.isOpen
                ? "border-cyan-500/30 bg-cyan-500/5"
                : "border-gray-600/30 bg-gray-600/5"
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              {review.submitted ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : review.isOpen ? (
                <Clock className="w-5 h-5 text-cyan-400" />
              ) : (
                <Lock className="w-5 h-5 text-gray-500" />
              )}
              <div>
                <h4 className="font-semibold text-foreground">{review.name}</h4>
                <p className="text-xs text-muted-foreground">Deadline: {review.deadline.toLocaleString()}</p>
              </div>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                review.submitted
                  ? "bg-green-500/20 text-green-400"
                  : review.isOpen
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "bg-gray-600/20 text-gray-400"
              }`}
            >
              {review.submitted ? "Submitted" : review.isOpen ? "Open" : "Closed"}
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">Requirements:</p>
            <ul className="space-y-1">
              {review.requirements.map((req, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {review.submitted && review.submittedAt && (
            <p className="text-xs text-green-400 mt-3">Submitted on {review.submittedAt.toLocaleString()}</p>
          )}
        </Card>
      ))}
    </div>
  )
}
