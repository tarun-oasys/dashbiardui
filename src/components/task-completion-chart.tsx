"use client"

import React, { useEffect, useRef } from "react"

export function TaskCompletionChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Set dimensions
    const width = canvas.width
    const height = canvas.height
    const padding = 40
    const chartWidth = width - (padding * 2)
    const chartHeight = height - (padding * 2)
    
    // Sample data
    const data = [
      { day: 'Mon', completed: 12, total: 15 },
      { day: 'Tue', completed: 8, total: 10 },
      { day: 'Wed', completed: 15, total: 18 },
      { day: 'Thu', completed: 10, total: 12 },
      { day: 'Fri', completed: 14, total: 16 },
      { day: 'Sat', completed: 5, total: 8 },
      { day: 'Sun', completed: 3, total: 5 }
    ]
    
    // Calculate max value for scaling
    const maxValue = Math.max(...data.map(d => d.total)) * 1.2
    
    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = '#cbd5e1' // slate-300
    ctx.lineWidth = 1
    
    // Y-axis
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    
    // X-axis
    ctx.moveTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()
    
    // Draw grid lines
    ctx.beginPath()
    ctx.strokeStyle = '#e2e8f0' // slate-200
    ctx.setLineDash([5, 5])
    
    for (let i = 1; i <= 5; i++) {
      const y = height - padding - (chartHeight / 5 * i)
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
    }
    ctx.stroke()
    ctx.setLineDash([])
    
    // Draw bars
    const barWidth = chartWidth / data.length / 3
    const barGap = barWidth / 2
    
    data.forEach((item, i) => {
      const x = padding + (i * (chartWidth / data.length)) + (chartWidth / data.length / 2) - barWidth
      
      // Total tasks bar (background)
      const totalHeight = chartHeight * (item.total / maxValue)
      ctx.fillStyle = '#e2e8f0' // slate-200
      ctx.fillRect(x - barWidth - barGap, height - padding - totalHeight, barWidth, totalHeight)
      
      // Completed tasks bar
      const completedHeight = chartHeight * (item.completed / maxValue)
      ctx.fillStyle = '#3b82f6' // blue-500
      ctx.fillRect(x, height - padding - completedHeight, barWidth, completedHeight)
      
      // Draw day label
      ctx.fillStyle = '#64748b' // slate-500
      ctx.font = '12px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(item.day, x - barGap, height - padding + 20)
      
      // Draw completion percentage
      const percentage = Math.round((item.completed / item.total) * 100)
      ctx.fillStyle = '#1e293b' // slate-800
      ctx.font = '10px sans-serif'
      ctx.fillText(`${percentage}%`, x, height - padding - completedHeight - 5)
    })
    
    // Draw legend
    const legendX = width - padding - 120
    const legendY = padding + 20
    
    // Total tasks
    ctx.fillStyle = '#e2e8f0' // slate-200
    ctx.fillRect(legendX, legendY, 15, 15)
    ctx.fillStyle = '#1e293b' // slate-800
    ctx.textAlign = 'left'
    ctx.font = '12px sans-serif'
    ctx.fillText('Total Tasks', legendX + 20, legendY + 12)
    
    // Completed tasks
    ctx.fillStyle = '#3b82f6' // blue-500
    ctx.fillRect(legendX, legendY + 25, 15, 15)
    ctx.fillStyle = '#1e293b' // slate-800
    ctx.fillText('Completed', legendX + 20, legendY + 37)
    
  }, [])
  
  return (
    <canvas 
      ref={canvasRef} 
      width={800} 
      height={300} 
      className="w-full h-full"
    />
  )
}
