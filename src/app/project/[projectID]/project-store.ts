// src/stores/counter-store.ts
import { Project } from '@src/API'
import { createStore } from 'zustand/vanilla'
import { ProjectElementInstance } from './types/ProjectElements'
import { getProjectData } from './api'

export type ProjectState = {
    projectId: string
    projectName: string
    projectDescription: string
    elements: ProjectElementInstance[]
    zoomLevel: number
    scrollLeft: number
    scrollTop: number
}

export type ProjectActions = {
    addElement: (element: ProjectElementInstance, x?: number, y?: number) => void
    updateElement: (id: string, element: ProjectElementInstance) => void
    fetch: (projectId: string) => void
    updateProjectName: (name: string) => void
    selectedElements: () => ProjectElementInstance[]
    updateZoomLevel: (zoomin: boolean, multiplier: number) => void
    updateSelectedElements: (selectedElements: ProjectElementInstance[]) => void
    updateScrollLeft: (scrollLeft: number) => void
    updateScrollTop: (scrollTop: number) => void
    //     selectedElements: ProjectElementInstance[]
    //     changeSelectedElements: (selectedElements: ProjectElementInstance[]) => void
}

// const updateZoomLevel = (zoomIn: boolean, multiplier: number) => {
//     setZoomLevel((prev) => {
//       if (
//         (prev * multiplier >= MAX_ZOOM && zoomIn) ||
//         (prev / multiplier <= MIN_ZOOM && !zoomIn)
//       ) {
//         return prev;
//       }
//       if (zoomIn) return prev * multiplier;
//       return prev / multiplier;
//     });
//   };

export type ProjectStore = ProjectState & ProjectActions

export const defaultInitState: ProjectState = {
    projectId: "",
    projectName: "",
    projectDescription: "",
    elements: [],
    zoomLevel: 1,
    scrollLeft: 0,
    scrollTop: 0
}

export const createCounterStore = (
    initState: ProjectState = defaultInitState,
) => {
    return createStore<ProjectStore>()((set, get) => ({
        ...initState,
        fetch: async (projectId: string) => {
            const project = await getProjectData(projectId)
            set({ projectId, projectName: project?.name, projectDescription: project?.description || "", elements: JSON.parse(project?.content ?? "") || [] })
        },
        addElement: (element: ProjectElementInstance, x?: number, y?: number) => set((state) => ({
            elements: [...state.elements, element]
        })),
        updateElement: (id: string, element: ProjectElementInstance) => set((state) => ({
            elements: state.elements.map((el) => el.id === id ? element : el)
        })),
        updateProjectName: (name: string) => set({ projectName: name }),
        selectedElements: () => {
            const elements = get()
            console.log(elements)
            return []
            // return elements.filter((el) => el.selected)
        },
        updateZoomLevel: (zoomIn: boolean, multiplier: number) => {
            const MIN_ZOOM = 0.05;
            const MAX_ZOOM = 5;
            let zoomLevel: number;
            if ((get().zoomLevel * multiplier >= MAX_ZOOM && zoomIn) ||
                (get().zoomLevel / multiplier <= MIN_ZOOM && !zoomIn)
            ) {
                zoomLevel = get().zoomLevel;
            }
            else if (zoomIn) {
                zoomLevel = get().zoomLevel * multiplier;
            } else {
                zoomLevel = get().zoomLevel / multiplier;
            }
            set((state) => ({
                zoomLevel: zoomLevel
            }))
        },
        updateSelectedElements: (selectedElements: ProjectElementInstance[]) => {
            set((state) => ({
                elements: state.elements.map((el) => selectedElements.find((sel) => sel.id === el.id) ? { ...el, selected: true } : { ...el, selected: false })
            }))
        },
        updateScrollLeft: (scrollLeft: number) => set({ scrollLeft }),
        updateScrollTop: (scrollTop: number) => set({ scrollTop })
    }))
}


// const addElement = (
//     element: ProjectElementInstance,
//     x?: number,
//     y?: number
//   ) => {
//     setElements((prev) => {
//       let newElements = [...prev];
//       if (x && y) {
//         element.position.x = x;
//         element.position.y = y;
//       }
//       newElements = [...newElements, element];
//       return newElements;
//     });
//   };



// const removeElement = (id: string) => {
//     setElements((prev) => prev.filter((element) => element.id !== id));
//   };