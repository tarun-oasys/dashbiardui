"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../src/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../src/components/ui/tabs"
import { Button } from "../../src/components/ui/button"
import { Progress } from "../../src/components/ui/progress"
import { Badge } from "../../src/components/ui/badge"
import { Skeleton } from "../../src/components/ui/skeleton"
import { AlertCircle, Bug, Download, FileSpreadsheet, Clock, ArrowUp, ArrowDown, Search } from 'lucide-react'
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../src/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../src/components/ui/table"

import { EmployeePerformanceChart } from "../../src/components/employee-performance-chart"
import { IssuesSummaryCard } from "../../src/components/issues-summary-card"
import { EmployeeStatsGrid } from "../../src/components/employee-stats-grid"
import React from "react"
import { Input } from "../../src/components/ui/input"
import { PerformanceRatingChart } from "@/components/performance-rating-chart"
import { TaskCompletionChart } from "@/components/task-completion-chart"
import { TeamPerformanceTable } from "@/components/team-performance-table"


// Define the type for our employee data
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
  issues5xx: number
}


export default function DashboardPage() {
  const [employees, setEmployees] = useState<EmployeeData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState("7days")
  const [completionTimeRange, setCompletionTimeRange] = useState("month")
  const [queryParams, setQueryParams] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState<EmployeeData[]>([]);
  useEffect(() => {

    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const userName = urlParams.get("userName");
      const startDate = urlParams.get("startDate");
      const endDate = urlParams.get("endDate");

      if (userName && startDate && endDate) {
        setQueryParams({ userName, startDate, endDate });
      }
    }

    // In a real app, you would fetch from your actual API
    const fetchEmployees = async () => {
      try {
        
        await new Promise(resolve => setTimeout(resolve, 1500))
        // const data = await fetch ('https://sit8.1atesting.in/jira/api/issueCount?userName=aditya.semwal%40oneassist.in&startDate=2023-04-01&endDate=2025-03-22')
        // const mockData: EmployeeData = {
        //   id: 11,
        //   userName: "mahboob.hasan@oneassist.in",
        //   accountId: "5b5e9ed83eb9962cd052a360",
        //   startDate: "2024-04-01",
        //   endDate: "2025-03-22",
        //   openAPDIssues: 5,
        //   closedAPDIssues: 15,
        //   openPRODIssues: 3,
        //   closedPRODIssues: 12,
        //   openBlockerAPDIssues: 1,
        //   closedBlockerAPDIssues: 4,
        //   openBlockerPRODIssues: 0,
        //   closedBlockerPRODIssues: 2,
        //   openAPDBugIssues: 2,
        //   closedAPDBugIssues: 8,
        //   openPRODBugIssues: 1,
        //   closedPRODBugIssues: 6,
        //   delayedIssues: 3,
        //   allIssues: 37,
        //   allBugs: 17,
        //   allBlocker: 7,
        //   ratings: 4.2
        // }
        
        // Create a few more mock entries with different values
        // const mockEmployees = [
        //   mockData,
        //   {
        //     ...mockData,
        //     id: 12,
        //     userName: "tarun.verma@oneassist.in",
        //     openAPDIssues: 3,
        //     closedAPDIssues: 18,
        //     ratings: 4.5,
        //     allIssues: 35,
        //     allBlocker: 2,
        //     allBugs: 8,
        //   },
        //   {
        //     ...mockData,
        //     id: 13,
        //     userName: "jane.smith@oneassist.in",
        //     openPRODIssues: 2,
        //     closedPRODIssues: 14,
        //     ratings: 3.8,
        //     allIssues: 31,
        //     allBlocker: 4,
        //     allBugs: 1,
        //   }
        // ]
        
        // setEmployees([mockEmployees]);
        // setFilteredEmployees([mockEmployees]);
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching employees:', err)
        setError('Failed to load employee data. Please try again later.')
        setIsLoading(false)
      }
    }

    // fetchEmployees()
  }, [])

  useEffect(() => {
    if (queryParams) {
      fetchData(queryParams);
    }
  }, [queryParams]);

  const fetchData = async ({ userName, startDate, endDate }) => {
    try {
      const response = await fetch(
        `https://amos.1atesting.in/jira/api/issueCount?userName=${userName}&startDate=${startDate}&endDate=${endDate}`
      );
      const result = await response.json();
      console.log(result, 'result');
      setEmployees([result]);
      setFilteredEmployees([result]);
    setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error("Error fetching data:", error);
    }
  };

  const handleExportToExcel = () => {
    // In a real app, this would generate and download an Excel file
    alert("Exporting data to Excel... This would download a file in a real application.")
  }


  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredEmployees(employees);
    } else {
      setFilteredEmployees(
        employees.filter(emp => emp?.userName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
  }, [searchQuery, employees]);


  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <p className="text-destructive font-medium mb-4">{error}</p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // const totalDefectsRaised = filteredEmployees.reduce(
  //   (sum, emp) => sum + emp.allIssues, 
  //   0
  // )
  
  // const productionDefects = filteredEmployees.reduce(
  //   (sum, emp) => sum + emp.openPRODIssues + emp.closedPRODIssues, 
  //   0
  // )
  
  // const blockerDefects = filteredEmployees.reduce(
  //   (sum, emp) => sum + emp.allBlocker, 
  //   0
  // )
  
  const defectDensity = 3.8
  
  const taskDelay = "24h"

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r bg-muted/40 lg:flex">
        <div className="flex h-14 items-center border-b px-4">
          <h2 className="text-lg font-semibold flex items-center">
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Performance Track
          </h2>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Employees
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Defects
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Tasks
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Reports
            </Link>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <div className="flex flex-1 items-center gap-4">
            <h1 className="text-xl font-semibold">Performance Dashboard</h1>
            <p className="text-sm text-muted-foreground">Track employee performance metrics</p>
          </div>
          <div className="flex flex-1 items-center justify-end gap-4">
          <div className="relative w-full max-w-sm mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by username..."
              className="w-full bg-background pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
            <Button variant="outline" size="icon" className="rounded-full">
              {/* <img
                src="/placeholder-user.jpg"
                alt="Avatar"
                className="rounded-full"
                height="32"
                width="32"
              /> */}
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {/* Metrics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {isLoading ? (
              <>
                <Skeleton className="h-[120px]" />
                <Skeleton className="h-[120px]" />
                <Skeleton className="h-[120px]" />
                <Skeleton className="h-[120px]" />
                <Skeleton className="h-[120px]" />
              </>
            ) : (
              <>
                {/* Defects Raised */}
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">Defects Raised</p>
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      </div>
                      <div className="text-3xl font-bold">{employees[0].allIssues}</div>
                      <div className="flex items-center text-xs text-green-500">
                        <ArrowUp className="mr-1 h-3 w-3" />
                        <span>12% vs last month</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Production Defects */}
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">Production Defects</p>
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                      </div>
                      <div className="text-3xl font-bold">{employees[0].openPRODIssues}</div>
                      <div className="flex items-center text-xs text-red-500">
                        <ArrowDown className="mr-1 h-3 w-3" />
                        <span>8% vs last month</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Blocker Defects */}
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">Blocker Defects</p>
                        <AlertCircle className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="text-3xl font-bold">{employees[0].allBlocker}</div>
                      <div className="flex items-center text-xs text-green-500">
                        <ArrowUp className="mr-1 h-3 w-3" />
                        <span>15% vs last month</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Defect Density */}
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">Defect Density</p>
                        <Bug className="h-4 w-4 text-purple-500" />
                      </div>
                      <div className="text-3xl font-bold">{defectDensity}</div>
                      <div className="text-xs text-muted-foreground">
                        per 1000 lines of code
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Task Delay */}
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">Task Delay</p>
                        <Clock className="h-4 w-4 text-orange-500" />
                      </div>
                      <div className="text-3xl font-bold">{taskDelay}</div>
                      <div className="flex items-center text-xs text-red-500">
                        <ArrowUp className="mr-1 h-3 w-3" />
                        <span>2h increase</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Charts */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {isLoading ? (
              <>
                <Skeleton className="h-[350px]" />
                <Skeleton className="h-[350px]" />
              </>
            ) : (
              <>
                {/* Performance Rating Chart */}
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-medium">Performance Rating</h3>
                      <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7days">Last 7 days</SelectItem>
                          <SelectItem value="30days">Last 30 days</SelectItem>
                          <SelectItem value="90days">Last 90 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex h-[280px] items-center justify-center">
                      <PerformanceRatingChart rating={4} maxRating={5} />
                    </div>
                  </CardContent>
                </Card>

                {/* Task Completion Rate Chart */}
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-medium">Task Completion Rate</h3>
                      <Select value={completionTimeRange} onValueChange={setCompletionTimeRange}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                          <SelectItem value="quarter">This Quarter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="h-[280px]">
                      <TaskCompletionChart />
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Team Performance Table */}
          <div className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-medium">Team Performance</h3>
                  <Button variant="outline" onClick={handleExportToExcel}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Export to Excel
                  </Button>
                </div>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : (
                  <TeamPerformanceTable employees={employees} />
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

