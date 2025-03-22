"use client"
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"

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

interface TeamPerformanceTableProps {
  employees: EmployeeData[]
}

export function TeamPerformanceTable({ employees }: TeamPerformanceTableProps) {
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Employee</TableHead>
            <TableHead>Issues Resolved</TableHead>
            <TableHead>Resolution Rate</TableHead>
            <TableHead>Blocker Issues</TableHead>
            <TableHead>Bug Issues</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => {
            const totalIssues = employee.allIssues
            const resolvedIssues = employee.closedAPDIssues + employee.closedPRODIssues
            const resolutionRate = totalIssues > 0 ? (resolvedIssues / totalIssues) * 100 : 0
            
            return (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{employee.userName.split('@')[0]}</span>
                    <span className="text-xs text-muted-foreground">{employee.userName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{resolvedIssues} / {totalIssues}</span>
                    <Progress value={resolutionRate} className="h-2 w-24 mt-1" />
                  </div>
                </TableCell>
                <TableCell>{resolutionRate.toFixed(1)}%</TableCell>
                <TableCell>{employee.allBlocker}</TableCell>
                <TableCell>{employee.allBugs}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{employee.ratings.toFixed(1)}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(employee.ratings) ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={employee.ratings >= 4 ? "default" : employee.ratings >= 3 ? "outline" : "destructive"}>
                    {employee.ratings >= 4 ? "Excellent" : employee.ratings >= 3 ? "Good" : "Needs Improvement"}
                  </Badge>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
