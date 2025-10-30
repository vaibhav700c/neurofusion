"use client"

import { MOCK_TEAMS } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { Users, CheckCircle2, Clock } from "lucide-react"

export function AdminStats() {
  const totalTeams = MOCK_TEAMS.length
  const review1Submitted = MOCK_TEAMS.filter((t) => t.review1Submitted).length
  const review2Submitted = MOCK_TEAMS.filter((t) => t.review2Submitted).length
  const pendingReview1 = totalTeams - review1Submitted

  const stats = [
    {
      label: "Total Teams",
      value: totalTeams,
      icon: Users,
      color: "from-cyan-500 to-blue-500",
    },
    {
      label: "Review 1 Submitted",
      value: review1Submitted,
      icon: CheckCircle2,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Review 2 Submitted",
      value: review2Submitted,
      icon: CheckCircle2,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Pending Review 1",
      value: pendingReview1,
      icon: Clock,
      color: "from-orange-500 to-red-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="p-6 border-cyan-500/20 hover:border-cyan-500/50 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div className={`bg-linear-to-br ${stat.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
