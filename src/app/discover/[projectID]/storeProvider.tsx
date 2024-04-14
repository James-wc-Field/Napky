// src/providers/counter-store-provider.tsx
'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi } from 'zustand'
import { useStoreWithEqualityFn as useStore } from 'zustand/traditional'

import { shallow } from 'zustand/shallow'
import { type DiscoverProjectStore, createDiscoverProjectStore } from './discoverproject-state'

export const DiscoverProjectStoreContext = createContext<StoreApi<DiscoverProjectStore> | null>(
    null,
)

export interface DiscoverProjectProviderProps {
    children: ReactNode
}

export const DiscoverProjectStoreProvider = ({
    children,
}: DiscoverProjectProviderProps) => {
    const storeRef = useRef<StoreApi<DiscoverProjectStore>>()
    if (!storeRef.current) {
        storeRef.current = createDiscoverProjectStore()
    }

    return (
        <DiscoverProjectStoreContext.Provider value={storeRef.current}>
            {children}
        </DiscoverProjectStoreContext.Provider>
    )
}

export const useDiscoverProjectStore = <T,>(
    selector: (store: DiscoverProjectStore) => T,
): T => {
    const discoverProjectStoreContext = useContext(DiscoverProjectStoreContext)

    if (!discoverProjectStoreContext) {
        throw new Error(`useCounterStore must be use within CounterStoreProvider`)
    }

    return useStore(discoverProjectStoreContext, selector, shallow)
}