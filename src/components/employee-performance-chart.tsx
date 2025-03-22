"use client"

import { useEffect, useRef } from "react"
import { Skeleton } from "./ui/skeleton"
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

interface EmployeePerformanceChartProps {
  employees: EmployeeData[]
}

export function EmployeePerformanceChart({ employees }: EmployeePerformanceChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!chartRef.current || !employees.length) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height)

    // Set dimensions
    const width = chartRef.current.width
    const height = chartRef.current.height
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Calculate max value for scaling
    const maxValue =
      Math.max(
        ...employees.map((emp) =>
          Math.max(emp.openAPDIssues + emp.openPRODIssues, emp.closedAPDIssues + emp.closedPRODIssues),
        ),
      ) * 1.2 // Add 20% padding

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#94a3b8" // slate-400
    ctx.lineWidth = 1

    // Y-axis
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)

    // X-axis
    ctx.moveTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw labels
    ctx.fillStyle = "#64748b" // slate-500
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"

    // X-axis labels (employees)
    const barWidth = chartWidth / (employees.length * 2 + (employees.length - 1))
    employees.forEach((emp, i) => {
      const x = padding + i * 3 * barWidth + barWidth * 1.5
      ctx.fillText(emp?.userName?.split("@")[0], x, height - padding + 20)
    })

    // Y-axis labels
    ctx.textAlign = "right"
    for (let i = 0; i <= 5; i++) {
      const value = (maxValue / 5) * i
      const y = height - padding - chartHeight * (value / maxValue)
      ctx.fillText(Math.round(value).toString(), padding - 10, y + 4)
    }

    // Draw title
    ctx.fillStyle = "#1e293b" // slate-800
    ctx.font = "bold 14px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Open vs. Closed Issues by Employee", width / 2, padding - 15)

    // Draw bars
    employees.forEach((emp, i) => {
      const openIssues = emp.openAPDIssues + emp.openPRODIssues
      const closedIssues = emp.closedAPDIssues + emp.closedPRODIssues

      const x1 = padding + i * 3 * barWidth + barWidth
      const x2 = x1 + barWidth

      const openHeight = chartHeight * (openIssues / maxValue)
      const closedHeight = chartHeight * (closedIssues / maxValue)

      // Open issues bar (amber)
      ctx.fillStyle = "rgba(245, 158, 11, 0.7)" // amber-500 with opacity
      ctx.fillRect(x1, height - padding - openHeight, barWidth, openHeight)

      // Closed issues bar (green)
      ctx.fillStyle = "rgba(34, 197, 94, 0.7)" // green-500 with opacity
      ctx.fillRect(x2, height - padding - closedHeight, barWidth, closedHeight)

      // Add values on top of bars
      ctx.fillStyle = "#1e293b" // slate-800
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"

      if (openIssues > 0) {
        ctx.fillText(openIssues.toString(), x1 + barWidth / 2, height - padding - openHeight - 5)
      }

      if (closedIssues > 0) {
        ctx.fillText(closedIssues.toString(), x2 + barWidth / 2, height - padding - closedHeight - 5)
      }
    })

    // Draw legend
    const legendX = width - padding - 100
    const legendY = padding + 20

    // Open issues
    ctx.fillStyle = "rgba(245, 158, 11, 0.7)" // amber-500 with opacity
    ctx.fillRect(legendX, legendY, 15, 15)
    ctx.fillStyle = "#1e293b" // slate-800
    ctx.textAlign = "left"
    ctx.fillText("Open Issues", legendX + 20, legendY + 12)

    // Closed issues
    ctx.fillStyle = "rgba(34, 197, 94, 0.7)" // green-500 with opacity
    ctx.fillRect(legendX, legendY + 25, 15, 15)
    ctx.fillStyle = "#1e293b" // slate-800
    ctx.fillText("Closed Issues", legendX + 20, legendY + 37)
  }, [employees])

  if (!employees.length) {
    return <Skeleton className="h-[350px] w-full" />
  }

  return (
    <div className="w-full h-[350px] relative">
      <canvas ref={chartRef} width={800} height={350} className="w-full h-full" />
    </div>
  )
}

