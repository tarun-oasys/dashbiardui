import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Progress } from "./ui/progress"
import React from "react"

interface IssuesSummaryCardProps {
  title: string
  open: number
  closed: number
}

export function IssuesSummaryCard({ title, open, closed }: IssuesSummaryCardProps) {
  const total = open + closed
  const closedPercentage = total > 0 ? (closed / total) * 100 : 0

  return (
    <Card className="transform transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4 mr-1 text-amber-500" />
            <span>Open: {open}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
            <span>Closed: {closed}</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span>Resolution Rate</span>
            <span className="font-medium">{closedPercentage.toFixed(1)}%</span>
          </div>
          <Progress value={closedPercentage} className="h-2" />
        </div>

        <div className="text-xs text-muted-foreground">{total} total issues</div>
      </CardContent>
    </Card>
  )
}

