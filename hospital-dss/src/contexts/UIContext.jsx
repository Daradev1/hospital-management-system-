import { createContext, useContext, useState, useEffect } from 'react'

const UIContext = createContext(null)
const LG_BREAKPOINT = 1024

export function UIProvider({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)

  // Auto-close the mobile drawer whenever the viewport grows back to desktop size
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= LG_BREAKPOINT) {
        setMobileSidebarOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <UIContext.Provider
      value={{
        sidebarCollapsed,
        toggleSidebar: () => setSidebarCollapsed((s) => !s),
        mobileSidebarOpen,
        openMobileSidebar: () => setMobileSidebarOpen(true),
        closeMobileSidebar: () => setMobileSidebarOpen(false),
        toggleMobileSidebar: () => setMobileSidebarOpen((s) => !s),
        commandPaletteOpen,
        setCommandPaletteOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used within UIProvider')
  return ctx
}
