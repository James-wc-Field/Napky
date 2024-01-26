import React from 'react'
import { ProjectElements } from './ProjectElements'
import SidebarBtnElement from './SidebarBtnElement'

function DesignerSidebar() {
  return (
    <aside className="w-fit max-w-[225px] flex flex-col grow gap-2
    border-r-1 border-slate-500 bg-background h-full p-4">
      <SidebarBtnElement projectElement={ProjectElements.TextBlock} />
      <SidebarBtnElement projectElement={ProjectElements.ImageBlock} />
    </aside>
  )
}

export default DesignerSidebar