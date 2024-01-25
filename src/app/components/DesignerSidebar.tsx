import React from 'react'
import { ProjectElements } from './ProjectElements'
import SidebarBtnElement from './SidebarBtnElement'

function DesignerSidebar() {
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col grow gap-2
    border-r-1 border-slate-500 bg-background overflow-y-auto h-full">
      Components
      <SidebarBtnElement projectElement={ProjectElements.TextBlock} />
    </aside>
  )
}

export default DesignerSidebar