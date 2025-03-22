"use client"

import { useEffect, useRef } from "react"

interface PerformanceRatingChartProps {
  rating: number
  maxRating: number
}

export function PerformanceRatingChart({ rating, maxRating }: PerformanceRatingChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions
    const size = Math.min(canvas.width, canvas.height)
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = size * 0.4
    const lineWidth = radius * 0.2
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw background circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.strokeStyle = '#e2e8f0' // slate-200
    ctx.lineWidth = lineWidth
    ctx.stroke()
    
    // Calculate the percentage
    const percentage = rating / maxRating
    
    // Draw progress arc
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, (Math.PI * 2 * percentage) - Math.PI / 2)
    ctx.strokeStyle = '#4ade80' // green-400
    ctx.lineWidth = lineWidth
    ctx.stroke()
    
    // Draw text in the center
    ctx.fillStyle = '#1e293b' // slate-800
    ctx.font = 'bold 24px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(`${rating}/${maxRating}`, centerX, centerY)
    
  }, [rating, maxRating])
  
  return (
    <canvas 
      ref={canvasRef} 
      width={300} 
      height={300} 
      className="max-w-full"
    />
  )
}
