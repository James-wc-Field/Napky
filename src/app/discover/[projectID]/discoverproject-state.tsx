import { ProjectElementInstance } from "@/components/ProjectElements"
import { createStore } from "zustand"
import { getProjectData } from "./api"

export type DiscoverProjectState = {
    elements: ProjectElementInstance[]
    zoomLevel: number
    scrollLeft: number
    scrollTop: number
}

export type DiscoverProjectActions = {
    fetchElements: (projectId: string) => void
    updateZoomLevel: (zoomin: boolean, multiplier: number) => void
    updateScrollLeft: (scrollLeft: number) => void
    updateScrollTop: (scrollTop: number) => void
}

export type DiscoverProjectStore = DiscoverProjectState & DiscoverProjectActions

export const defaultInitState: DiscoverProjectState = {
    elements: [] as ProjectElementInstance[],
    zoomLevel: 1,
    scrollLeft: 0,
    scrollTop: 0,
}

const updateZoomLevel = (zoomLevel: number, zoomIn: boolean, multiplier: number) => {
    const MIN_ZOOM = 0.05;
    const MAX_ZOOM = 5;
    if ((zoomLevel * multiplier >= MAX_ZOOM && zoomIn) ||
        (zoomLevel / multiplier <= MIN_ZOOM && !zoomIn)
    ) {
        return zoomLevel;
    }
    if (zoomIn) return zoomLevel * multiplier;
    return zoomLevel / multiplier;
}

export const createDiscoverProjectStore = (initState: DiscoverProjectState = defaultInitState) => {
    return createStore<DiscoverProjectStore>()((set) => ({
        ...initState,
        fetchElements: async (projectId: string) => {
            const elements = JSON.parse((await getProjectData(projectId))?.content ?? "[]")
            console.log(elements)
            if (!elements) return
            set({ elements: elements as ProjectElementInstance[] })
            // fetch project data
        },
        updateZoomLevel: (zoomin: boolean, multiplier: number) => {
            set((state) => ({
                zoomLevel: updateZoomLevel(state.zoomLevel, zoomin, multiplier),
            }))
        },
        updateScrollLeft: (scrollLeft: number) => set((state) => ({ scrollLeft: state.scrollLeft - scrollLeft })),
        updateScrollTop: (scrollTop: number) => set((state) => ({ scrollTop: state.scrollTop - scrollTop })),
    }))
}
