'use client'
import { useEffect, useRef } from 'react'

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    type Star = { x: number; y: number; r: number; alpha: number; speed: number; phase: number }
    let stars: Star[] = []
    let frame = 0
    let animId: number

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
      initStars()
    }

    function initStars() {
      stars = []
      const count = Math.floor((canvas!.width * canvas!.height) / 3000)
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          r: Math.random() * 1.4 + 0.3,
          alpha: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.3 + 0.05,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height)
      frame++
      for (const s of stars) {
        const twinkle = s.alpha + Math.sin(frame * s.speed * 0.05 + s.phase) * 0.25
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(235, 225, 205, ${Math.max(0, Math.min(1, twinkle))})`
        ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.8,
      }}
    />
  )
}
