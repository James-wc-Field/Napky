// src/stores/counter-store.ts
import { Project } from '@src/API'
import { createStore } from 'zustand/vanilla'
import { ProjectElementInstance } from './types/ProjectElements'
import { getProjectData } from './api'
import { AllElementsType, CanvasElementType } from './types/NinjaSketchTypes'

export type ProjectState = {
    projectId: string
    projectName: string
    projectDescription: string
    zoomLevel: number
    scrollLeft: number
    scrollTop: number
    key: string
    isDrawing: boolean
    index: number
    history: AllElementsType[][]
}

export type ProjectActions = {
    fetch: (projectId: string) => void
    updateProjectName: (name: string) => void
    updateZoomLevel: (zoomin: boolean, multiplier: number) => void
    updateScrollLeft: (scrollLeft: number) => void
    updateScrollTop: (scrollTop: number) => void
    addProjectElement: (element: ProjectElementInstance) => void
    updateProjectElement: (id: string, element: ProjectElementInstance) => void
    // selectedElements: () => ProjectElementInstance[]
    canvasElements: () => CanvasElementType[]
    projectElements: () => ProjectElementInstance[]
    // updateSelectedElements: (selectedElements: ProjectElementInstance[]) => void
    // removeSelectedElements: () => void
    updateKey: (key: string) => void
    // setAllElementsSelected: () => void
    // deleteElement: (id: string) => void
    // deleteSelectedElements: () => void
    updateIsDrawing: (isDrawing?: boolean) => void
    addCanvasElement(element: CanvasElementType): void
    updateCanvasPoints: (id: string, element: CanvasElementType) => void
    updateHistory: (elements: AllElementsType[], overwrite?: boolean) => void
    undo: () => void
    redo: () => void
    // updateCanvasPoints: (points: { x: number, y: number }) => void

}



export type ProjectStore = ProjectState & ProjectActions

export const defaultInitState: ProjectState = {
    projectId: "",
    projectName: "",
    projectDescription: "",
    zoomLevel: 1,
    scrollLeft: 0,
    scrollTop: 0,
    key: "",
    isDrawing: false,
    index: 0,
    history: [[]] as AllElementsType[][]
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




export const createProjectStore = (
    initState: ProjectState = defaultInitState,
) => {
    return createStore<ProjectStore>()((set, get) => ({
        ...initState,
        fetch: async (projectId: string) => {
            const project = await getProjectData(projectId)
            if (!project) return
            set({ projectId, projectName: project.name, projectDescription: project.description ?? "", projectElements: JSON.parse(project.content ?? "[]") })
        },
        updateProjectName: (name: string) => set({ projectName: name }),
        updateZoomLevel(zoomin, multiplier) {
            set((state) => ({ zoomLevel: updateZoomLevel(state.zoomLevel, zoomin, multiplier) }))
        },
        updateScrollLeft: (scrollLeft: number) => set((state) => ({ scrollLeft: state.scrollLeft + scrollLeft })),
        updateScrollTop: (scrollTop: number) => set((state) => ({ scrollTop: state.scrollTop + scrollTop })),
        addProjectElement: (element: ProjectElementInstance) => {
            console.log(get().history)
            set((state) => ({
                history: [...state.history, [...state.history[state.index], element]],
                index: state.index + 1
            }))
        },
        updateProjectElement: (id: string, element: ProjectElementInstance) => {
            const updatedState = get().history[get().index - 1].map((el) => (el.id === id ? element : el));
            set((state) => ({
                history: [...state.history, updatedState],
            }))
        },

        // const updateElement = (id: string | number, element: AllElementsType, isHistory: boolean = true) => {
        //     const updatedState = [...history][isHistory ? index : index - 1].map((el) => (el.id === id ? element : el));
        //     setHistory((historyState) => [...historyState, updatedState]);
        //     if (isHistory) setIndex((prevState) => prevState + 1);
        // };
        canvasElements: () => get().history[get().index]?.filter((el) => 'points' in el) as CanvasElementType[] || [],
        projectElements: () => get().history[get().index]?.filter((el) => 'size' in el) as ProjectElementInstance[] || [],
        // selectedElements: () => {
        //     return get().history[get().index].filter((el) => el.selected)
        // },
        // updateSelectedElements: (selectedElements: ProjectElementInstance[]) => {
        //     set((state) => ({
        //         ...state,
        //         elements: updateSelectedElements(state.projectElements, selectedElements)
        //     }))
        // },
        // removeSelectedElements: () => set((state) => ({
        //     ...state,
        //     elements: state.projectElements.map((el) => el.selected ? { ...el, selected: false } : el)
        // })),
        updateKey: (key: string) => set({
            key
        }),
        // setAllElementsSelected: () => set((state) => ({
        //     projectElements: state.projectElements.map((el) => ({ ...el, selected: true }))
        // })),
        // deleteElement: (id: string) => set((state) => ({
        //     projectElements: state.projectElements.filter((el) => el.id !== id)
        // })),
        // deleteSelectedElements: () => set((state) => ({
        //     projectElements: state.projectElements.filter((el) => !el.selected)
        // })),
        updateIsDrawing: (isDrawing?: boolean) => set((state) => ({
            isDrawing: isDrawing || !state.isDrawing
        })),
        addCanvasElement: (element: CanvasElementType) => set((state) => ({
            history: [...state.history, [...state.history[state.index], element]],
            index: state.index + 1,
        })),
        updateCanvasPoints: (id: string, element: CanvasElementType) => set((state) => ({
            history: [...state.history, state.history[state.index].map((el) => el.id === id ? element : el)],
            index: state.index + 1
        })),
        updateHistory: (elements: AllElementsType[], overwrite = false) => {
            const historyCopy = get().history
            historyCopy[get().index] = elements
            const updatedState = [...historyCopy].slice(0, get().index + 1)
            set((state) => ({
                history: overwrite ? historyCopy : [...updatedState, elements],
                index: overwrite ? state.index : state.index + 1
            }))
        },
        undo: () => set((state) => ({
            index: state.index > 0 ? state.index - 1 : state.index
        })),
        redo: () => set((state) => ({
            index: state.index < history.length - 1 ? state.index + 1 : state.index
        }))

    }))
}

// if(overwrite) {
//     const historyCopy = [...state.history];
//     historyCopy[index] = action;
//     setHistory(historyCopy);
// } else {
//     const updatedState = [...history].slice(0, index + 1);
//     setHistory([...updatedState, action]);
//   setIndex((prevState) => prevState + 1);
// }