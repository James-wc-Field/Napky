// src/stores/counter-store.ts
import { Project } from '@src/API'
import { createStore } from 'zustand/vanilla'
import { ProjectElementInstance } from './types/ProjectElements'
import { getProjectData } from './api'
import { init } from 'next/dist/compiled/webpack/webpack'

export type ProjectState = {
    projectId: string
    projectName: string
    projectDescription: string
    zoomLevel: number
    scrollLeft: number
    scrollTop: number
    elements: ProjectElementInstance[]
}

export type ElementsState = {
}

export type ProjectActions = {
    fetch: (projectId: string) => void
    updateProjectName: (name: string) => void
    updateZoomLevel: (zoomin: boolean, multiplier: number) => void
    updateScrollLeft: (scrollLeft: number) => void
    updateScrollTop: (scrollTop: number) => void
    addElement: (element: ProjectElementInstance, x?: number, y?: number) => void
    updateElement: (id: string, element: ProjectElementInstance) => void
    selectedElements: () => ProjectElementInstance[]
    updateSelectedElements: (selectedElements: ProjectElementInstance[]) => void
    //     selectedElements: ProjectElementInstance[]
    //     changeSelectedElements: (selectedElements: ProjectElementInstance[]) => void
}

export type ElementsActions = {
}


export type ProjectStore = ProjectState & ProjectActions
export type ElementsStore = ElementsState & ElementsActions

export const defaultInitState: ProjectState = {
    projectId: "",
    projectName: "",
    projectDescription: "",
    zoomLevel: 1,
    scrollLeft: 0,
    scrollTop: 0,
    elements: [] as ProjectElementInstance[]
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


const updateSelectedElements = (elements: ProjectElementInstance[], selectedElements: ProjectElementInstance[]) => {
    return elements.map((el) => selectedElements.find((sel) => sel.id === el.id) ? { ...el, selected: true } : { ...el, selected: false })
}

export const createElementsStore = (
    initState: ElementsState = { elements: [] }) => {
    return createStore<ElementsStore>((set) => ({
        ...initState,

    }))
}


export const createProjectStore = (
    initState: ProjectState = defaultInitState,
) => {
    return createStore<ProjectStore>()((set, get) => ({
        ...initState,
        fetch: async (projectId: string) => {
            const project = await getProjectData(projectId)

            set({ projectId, projectName: project?.name, projectDescription: project?.description || "", elements: JSON.parse(project?.content ?? "") || [] })
            console.log(get().elements)
        },
        updateProjectName: (name: string) => set({ projectName: name }),
        updateZoomLevel(zoomin, multiplier) {
            set((state) => ({ zoomLevel: updateZoomLevel(state.zoomLevel, zoomin, multiplier) }))
        },
        updateScrollLeft: (scrollLeft: number) => set({ scrollLeft }),
        updateScrollTop: (scrollTop: number) => set({ scrollTop }),
        addElement: (element: ProjectElementInstance, x?: number, y?: number) => set((state) => ({
            elements: [...state.elements, element]
        })),
        updateElement: (id: string, element: ProjectElementInstance) => set((state) => ({
            elements: state.elements.map((el) => el.id === id ? element : el)
        })),
        selectedElements: () => {
            return []
            // return elements.filter((el) => el.selected)
        },
        updateSelectedElements: (selectedElements: ProjectElementInstance[]) => {
            set((state) => ({
                ...state,
                elements: updateSelectedElements(state.elements, selectedElements)
            }))
        },
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