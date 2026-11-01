'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertCircle, Maximize2, ZoomIn, ZoomOut } from 'lucide-react'

interface MermaidDiagramProps {
  code: string
}

/** Light-theme diagram colours, aligned with the portfolio palette. */
const MERMAID_LIGHT_VARIABLES = {
  primaryColor: '#eef2ff',
  primaryTextColor: '#0f172a',
  primaryBorderColor: '#6366f1',
  secondaryColor: '#f5f3ff',
  secondaryTextColor: '#0f172a',
  secondaryBorderColor: '#8b5cf6',
  tertiaryColor: '#ecfeff',
  tertiaryTextColor: '#0f172a',
  tertiaryBorderColor: '#0891b2',
  lineColor: '#64748b',
  textColor: '#0f172a',
  mainBkg: '#eef2ff',
  nodeBorder: '#6366f1',
  clusterBkg: '#f8fafc',
  clusterBorder: '#cbd5e1',
  edgeLabelBackground: '#ffffff',
  titleColor: '#0f172a',
  noteBkgColor: '#fffbeb',
  noteTextColor: '#78350f',
  noteBorderColor: '#f59e0b',
  actorBkg: '#eef2ff',
  actorBorder: '#6366f1',
  actorTextColor: '#0f172a',
  signalColor: '#0f172a',
  signalTextColor: '#0f172a',
  labelBoxBkgColor: '#eef2ff',
  labelBoxBorderColor: '#6366f1',
  labelTextColor: '#0f172a',
  loopTextColor: '#0f172a',
  activationBkgColor: '#eef2ff',
  attributionBkgColor: '#f8fafc',
  stateBkg: '#eef2ff',
  stateBorder: '#6366f1',
  stateLabelColor: '#0f172a',
  classText: '#0f172a',
}

/** Dark-theme diagram colours. */
const MERMAID_DARK_VARIABLES = {
  primaryColor: '#1e1b4b',
  primaryTextColor: '#e2e8f0',
  primaryBorderColor: '#818cf8',
  secondaryColor: '#2e1065',
  secondaryTextColor: '#e2e8f0',
  secondaryBorderColor: '#a78bfa',
  tertiaryColor: '#164e63',
  tertiaryTextColor: '#e2e8f0',
  tertiaryBorderColor: '#22d3ee',
  lineColor: '#94a3b8',
  textColor: '#e2e8f0',
  mainBkg: '#1e1b4b',
  nodeBorder: '#818cf8',
  clusterBkg: '#0f172a',
  clusterBorder: '#334155',
  edgeLabelBackground: '#0f172a',
  titleColor: '#f1f5f9',
  noteBkgColor: '#422006',
  noteTextColor: '#fde68a',
  noteBorderColor: '#f59e0b',
  actorBkg: '#1e1b4b',
  actorBorder: '#818cf8',
  actorTextColor: '#e2e8f0',
  signalColor: '#e2e8f0',
  signalTextColor: '#e2e8f0',
  labelBoxBkgColor: '#1e1b4b',
  labelBoxBorderColor: '#818cf8',
  labelTextColor: '#e2e8f0',
  loopTextColor: '#e2e8f0',
  activationBkgColor: '#1e1b4b',
  attributionBkgColor: '#0f172a',
  stateBkg: '#1e1b4b',
  stateBorder: '#818cf8',
  stateLabelColor: '#e2e8f0',
  classText: '#e2e8f0',
}

export default function MermaidDiagram({ code }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const mermaidRef = useRef<any>(null)

  const [error, setError] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [fit, setFit] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | null>(
    null
  )

  useEffect(() => {
    let mounted = true

    const renderDiagram = async () => {
      if (!containerRef.current) return

      try {
        if (!mermaidRef.current) {
          const mermaidModule = await import('mermaid')
          mermaidRef.current = mermaidModule.default ?? mermaidModule
        }

        if (!mounted) return

        const dark = document.documentElement.classList.contains('dark')

        mermaidRef.current.initialize({
          startOnLoad: false,
          theme: 'base',
          securityLevel: 'strict',
          fontFamily: 'inherit',
          flowchart: {
            useMaxWidth: false,
            curve: 'basis',
          },
          themeVariables: dark
            ? MERMAID_DARK_VARIABLES
            : MERMAID_LIGHT_VARIABLES,
        })

        const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`
        const { svg } = await mermaidRef.current.render(id, code)

        if (!mounted || !containerRef.current) return

        // The SVG is generated locally from repository-controlled Markdown.
        containerRef.current.innerHTML = svg

        const svgEl = containerRef.current.querySelector('svg') as SVGSVGElement | null
        if (!svgEl) return

        const rawW = svgEl.getAttribute('width') ?? ''
        const rawH = svgEl.getAttribute('height') ?? ''
        const numeric = (value: string) =>
          /^\d+(\.\d+)?$/.test(value) ? parseFloat(value) : null
        const viewBox = svgEl.viewBox?.baseVal
        const parsedW = numeric(rawW) ?? (viewBox?.width ? viewBox.width : null)
        const parsedH = numeric(rawH) ?? (viewBox?.height ? viewBox.height : null)

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
            if (rect && rect.width > 0) {
              setNaturalSize({ w: rect.width, h: rect.height })
            }
          })
        }

        setError(null)
      } catch (err) {
        console.error('Mermaid rendering error:', err)
        if (mounted) {
          setError(
            err instanceof Error ? err.message : 'Failed to render diagram'
          )
        }
      }
    }

    renderDiagram()

    // Re-render when the site theme flips: the diagram palette changes.
    let observer: MutationObserver | null = null
    if (typeof MutationObserver !== 'undefined') {
      observer = new MutationObserver(renderDiagram)
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      })
    }

    return () => {
      mounted = false
      observer?.disconnect()
    }
  }, [code])

  // Fit the diagram to the reading column: at 1:1 a diagram never overflows the
  // page — the zoom controls and fullscreen are there for reading fine detail.
  // Recompute when the container resizes (window resize, or entering/leaving
  // fullscreen, which changes the available width without a resize event).
  useEffect(() => {
    if (!naturalSize) return

    const scroll = scrollRef.current
    if (!scroll) return

    const compute = () => {
      const styles = getComputedStyle(scroll)
      const paddingX =
        parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight)
      const available = Math.max(160, scroll.clientWidth - paddingX)
      setFit(Math.min(1, available / naturalSize.w))
    }

    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [naturalSize, isFullscreen])

  const handleZoomIn = () =>
    setZoom((prev) => Math.min(parseFloat((prev + 0.25).toFixed(2)), 4))
  const handleZoomOut = () =>
    setZoom((prev) => Math.max(parseFloat((prev - 0.25).toFixed(2)), 0.25))
  const handleResetZoom = () => setZoom(1)

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev)
    setZoom(1)
  }

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!event.ctrlKey && !event.metaKey) return
    event.preventDefault()
    const delta = event.deltaY > 0 ? -0.1 : 0.1
    setZoom((prev) =>
      Math.max(0.25, Math.min(4, parseFloat((prev + delta).toFixed(2))))
    )
  }

  if (error) {
    return (
      <div className="mermaid-error-container">
        <div className="mb-2 flex items-center gap-2 text-red-700 dark:text-red-300">
          <AlertCircle className="h-5 w-5" />
          <span className="font-semibold">Diagram error</span>
        </div>
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        <details className="mt-2">
          <summary className="cursor-pointer text-xs text-red-700 dark:text-red-300">
            Show diagram code
          </summary>
          <pre className="mt-2 overflow-x-auto rounded bg-red-100 p-2 text-xs dark:bg-red-900/40">
            {code}
          </pre>
        </details>
      </div>
    )
  }

  const scale = fit * zoom
  const sizedStyle: React.CSSProperties = naturalSize
    ? { width: naturalSize.w * scale, height: naturalSize.h * scale }
    : { width: '100%' }

  return (
    <div className={`mermaid-wrapper ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="zoom-controls-toolbar">
        <button
          type="button"
          onClick={handleZoomOut}
          className="zoom-btn"
          title="Zoom out"
          aria-label="Zoom out"
          disabled={zoom <= 0.25}
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <span className="zoom-level">{Math.round(zoom * 100)}%</span>
        <button
          type="button"
          onClick={handleZoomIn}
          className="zoom-btn"
          title="Zoom in"
          aria-label="Zoom in"
          disabled={zoom >= 4}
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleResetZoom}
          className="zoom-btn"
          title="Reset zoom to 1:1"
          aria-label="Reset zoom to 1:1"
        >
          1:1
        </button>
        <div className="zoom-divider" />
        <button
          type="button"
          onClick={toggleFullscreen}
          className="zoom-btn"
          title="Toggle fullscreen"
          aria-label="Toggle fullscreen"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="mermaid-scroll-container"
        tabIndex={0}
        role="region"
        aria-label="Scrollable diagram"
        onWheel={handleWheel}
      >
        <div className="mermaid-sizer" style={sizedStyle}>
          <div ref={containerRef} className="mermaid-content" />
        </div>
      </div>

      {!isFullscreen && (
        <div className="zoom-hint hidden md:block">
          Tip: use Ctrl + mouse wheel to zoom, or open fullscreen
        </div>
      )}
    </div>
  )
}
