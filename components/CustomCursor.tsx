'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0
    let animId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX - 3 + 'px'
      dot.style.top = mouseY - 3 + 'px'
    }

    function animate() {
      ringX += (mouseX - ringX - 14) * 0.12
      ringY += (mouseY - ringY - 14) * 0.12
      if (ring) {
        ring.style.left = ringX + 'px'
        ring.style.top = ringY + 'px'
      }
      animId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)

    const interactables = document.querySelectorAll<HTMLElement>('button, a, .free-card, .premium-item, .pricing-card')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.width = '44px'
        ring.style.height = '44px'
        ring.style.borderColor = 'rgba(200, 169, 110, 0.9)'
        dot.style.transform = 'scale(2)'
      })
      el.addEventListener('mouseleave', () => {
        ring.style.width = '28px'
        ring.style.height = '28px'
        ring.style.borderColor = 'rgba(200, 169, 110, 0.5)'
        dot.style.transform = 'scale(1)'
      })
    })

    animate()
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
