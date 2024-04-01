// src/providers/counter-store-provider.tsx
'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'

import { type ProjectStore, createCounterStore } from '../[projectID]/project-store'

export const ProjectStoreContext = createContext<StoreApi<ProjectStore> | null>(
    null,
)

export interface ProjectStoreProviderProps {
    children: ReactNode
}

export const ProjectStoreProvider = ({
    children,
}: ProjectStoreProviderProps) => {
    const storeRef = useRef<StoreApi<ProjectStore>>()
    if (!storeRef.current) {
        storeRef.current = createCounterStore()
    }

    return (
        <ProjectStoreContext.Provider value={storeRef.current}>
            {children}
        </ProjectStoreContext.Provider>
    )
}

export const useProjectStore = <T,>(
    selector: (store: ProjectStore) => T,
): T => {
    const projectStoreContext = useContext(ProjectStoreContext)

    if (!projectStoreContext) {
        throw new Error(`useCounterStore must be use within CounterStoreProvider`)
    }

    return useStore(projectStoreContext, selector)
}