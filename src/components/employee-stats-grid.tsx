import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Users, CheckCircle2, AlertCircle, Star } from "lucide-react"
import React from "react"

interface EmployeeData {
  id: number
  userName: string
  accountId: string
  startDate: string
  endDate: string
  openAPDIssues: number
  closedAPDIssues: number
  openPRODIssues: number
  closedPRODIssues: number
  openBlockerAPDIssues: number
  closedBlockerAPDIssues: number
  openBlockerPRODIssues: number
  closedBlockerPRODIssues: number
  openAPDBugIssues: number
  closedAPDBugIssues: number
  openPRODBugIssues: number
  closedPRODBugIssues: number
  delayedIssues: number
  allIssues: number
  allBugs: number
  allBlocker: number
  ratings: number
}

interface EmployeeStatsGridProps {
  employees: EmployeeData[]
}

export function EmployeeStatsGrid({ employees }: EmployeeStatsGridProps) {
  // Calculate aggregate stats
  const totalEmployees = employees.length
  const totalClosedIssues = employees.reduce((sum, emp) => sum + emp.closedAPDIssues + emp.closedPRODIssues, 0)
  const totalOpenIssues = employees.reduce((sum, emp) => sum + emp.openAPDIssues + emp.openPRODIssues, 0)
  const avgRating = employees.reduce((sum, emp) => sum + emp.ratings, 0) / totalEmployees

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="transform transition-all duration-300 hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          <Users className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalEmployees}</div>
          <p className="text-xs text-muted-foreground">Active performance records</p>
        </CardContent>
      </Card>

      <Card className="transform transition-all duration-300 hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Closed Issues</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalClosedIssues}</div>
          <p className="text-xs text-muted-foreground">Successfully resolved</p>
        </CardContent>
      </Card>

      <Card className="transform transition-all duration-300 hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
          <AlertCircle className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOpenIssues}</div>
          <p className="text-xs text-muted-foreground">Pending resolution</p>
        </CardContent>
      </Card>

      <Card className="transform transition-all duration-300 hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <Star className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground">Overall performance</p>
        </CardContent>
      </Card>
    </div>
  )
}

