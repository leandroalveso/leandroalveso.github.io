'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertCircle, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'

interface MermaidDiagramProps {
  code: string
}

export default function MermaidDiagram({ code }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | null>(null)
  const mermaidRef = useRef<any>(null)

  useEffect(() => {
    let mounted = true

    const renderDiagram = async () => {
      if (!containerRef.current) return

      try {
        if (!mermaidRef.current) {
          const mermaidModule = await import('mermaid')
          mermaidRef.current = mermaidModule.default ?? mermaidModule
          mermaidRef.current.initialize({
            startOnLoad: false,
            theme: 'default',
            securityLevel: 'loose',
            fontFamily: 'inherit',
            flowchart: {
              useMaxWidth: false,
              htmlLabels: true,
              curve: 'basis',
            },
          })
        }

        if (!mounted) return

        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
        const { svg } = await mermaidRef.current.render(id, code)

        if (!mounted || !containerRef.current) return

        containerRef.current.innerHTML = svg

        const svgEl = containerRef.current.querySelector('svg') as SVGSVGElement | null
        if (!svgEl) return

        const rawW = svgEl.getAttribute('width')
        const rawH = svgEl.getAttribute('height')
        const parsedW = rawW ? parseFloat(rawW) : null
        const parsedH = rawH ? parseFloat(rawH) : null

        if (!svgEl.getAttribute('viewBox') && parsedW && parsedH) {
          svgEl.setAttribute('viewBox', `0 0 ${parsedW} ${parsedH}`)
        }

        svgEl.removeAttribute('width')
        svgEl.removeAttribute('height')
        svgEl.style.width = '100%'
        svgEl.style.height = 'auto'
        svgEl.style.display = 'block'
        svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet')

        if (parsedW && parsedH) {
          setNaturalSize({ w: parsedW, h: parsedH })
        } else {
          requestAnimationFrame(() => {
            const rect = containerRef.current?.getBoundingClientRect()
            if (rect) setNaturalSize({ w: rect.width, h: rect.height })
          })
        }
      } catch (err) {
        console.error('Mermaid rendering error:', err)
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to render diagram')
        }
      }
    }

    renderDiagram()
    return () => { mounted = false }
  }, [code])

  const handleZoomIn    = () => setZoom(prev => Math.min(parseFloat((prev + 0.25).toFixed(2)), 4))
  const handleZoomOut   = () => setZoom(prev => Math.max(parseFloat((prev - 0.25).toFixed(2)), 0.25))
  const handleResetZoom = () => setZoom(1)

  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev)
    setZoom(1)
  }

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -0.1 : 0.1
      setZoom(prev => Math.max(0.25, Math.min(4, parseFloat((prev + delta).toFixed(2)))))
    }
  }

  if (error) {
    return (
      <div className="mermaid-error-container">
        <div className="flex items-center gap-2 text-red-700 dark:text-red-300 mb-2">
          <AlertCircle className="w-5 h-5" />
          <span className="font-semibold">Diagram Error</span>
        </div>
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        <details className="mt-2">
          <summary className="text-xs cursor-pointer text-red-700 dark:text-red-300">Show diagram code</summary>
          <pre className="mt-2 p-2 bg-red-100 dark:bg-red-900/40 rounded text-xs overflow-x-auto">{code}</pre>
        </details>
      </div>
    )
  }

  const scaledStyle: React.CSSProperties =
    zoom !== 1 && naturalSize
      ? { width: naturalSize.w * zoom, height: naturalSize.h * zoom, transform: `scale(${zoom})`, transformOrigin: 'top left' }
      : { width: '100%', transform: zoom !== 1 ? `scale(${zoom})` : undefined, transformOrigin: 'top left' }

  return (
    <div className={`mermaid-wrapper ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="zoom-controls-toolbar">
        <button onClick={handleZoomOut} className="zoom-btn" title="Zoom Out" aria-label="Zoom out" disabled={zoom <= 0.25}>
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="zoom-level">{Math.round(zoom * 100)}%</span>
        <button onClick={handleZoomIn} className="zoom-btn" title="Zoom In" aria-label="Zoom in" disabled={zoom >= 4}>
          <ZoomIn className="w-4 h-4" />
        </button>
        <button onClick={handleResetZoom} className="zoom-btn" title="Reset Zoom" aria-label="Reset zoom">1:1</button>
        <div className="zoom-divider" />
        <button onClick={toggleFullscreen} className="zoom-btn" title="Toggle Fullscreen" aria-label="Toggle fullscreen">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      <div ref={scrollRef} className="mermaid-scroll-container" onWheel={handleWheel}>
        <div style={scaledStyle}>
          <div ref={containerRef} className="mermaid-content" />
        </div>
      </div>

      {!isFullscreen && (
        <div className="zoom-hint md:block hidden">
          💡 Tip: Use Ctrl + Mouse Wheel to zoom, or click the fullscreen icon
        </div>
      )}
    </div>
  )
}
