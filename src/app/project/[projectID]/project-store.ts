// src/stores/counter-store.ts
import { Project } from '@src/API'
import { createStore } from 'zustand/vanilla'
import { ProjectElementInstance } from './types/ProjectElements'
import { getProjectData } from './api'
import { init } from 'next/dist/compiled/webpack/webpack'
import { useEffect, useState } from 'react'

export type ProjectState = {
    projectId: string
    projectName: string
    projectDescription: string
    zoomLevel: number
    scrollLeft: number
    scrollTop: number
    elements: ProjectElementInstance[]
    key: string
}

export type ElementsState = {
}

export type ProjectActions = {
    fetch: (projectId: string) => void
    updateProjectName: (name: string) => void
    updateZoomLevel: (zoomin: boolean, multiplier: number) => void
    updateScrollLeft: (scrollLeft: number) => void
    updateScrollTop: (scrollTop: number) => void
    addElement: (element: ProjectElementInstance) => void
    updateElement: (id: string, element: ProjectElementInstance) => void
    selectedElements: () => ProjectElementInstance[]
    updateSelectedElements: (selectedElements: ProjectElementInstance[]) => void
    removeSelectedElements: () => void
    updateKey: (key: string) => void
    setAllElementsSelected: () => void
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
    elements: [] as ProjectElementInstance[],
    key: "",
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

// export const useWindowResize = (canvas: HTMLDivElement | null) => {
//     useEffect(() => {
//         const handleResize = () => {
//             if (canvas) {
//                 const boundingBox = canvas.getBoundingClientRect();
//                 setCanvasViewRect({
//                     top: boundingBox.top,
//                     left: boundingBox.left,
//                     right: boundingBox.right,
//                     bottom: boundingBox.bottom,
//                     width: boundingBox.width,
//                     height: boundingBox.height,
//                 });
//             }
//         };
//         window.addEventListener("resize", handleResize);
//         return () => {
//             window.removeEventListener("resize", handleResize);
//         };
//     }, [canvas])
// };

// const [outerMostElements, setOuterMostElements] = useState<{
//     top: ProjectElementInstance | null;
//     left: ProjectElementInstance | null;
//     right: ProjectElementInstance | null;
//     bottom: ProjectElementInstance | null;
// }>({ top: null, left: null, right: null, bottom: null });
// const [canvasViewRect, setCanvasViewRect] = useState({
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     width: 0,
//     height: 0,
// });


//   const useResize = (element: ProjectElementInstance, startPos:Position) => {
//   //   useEffect(() => {
//   //   const handleMouseMove =
//   //   (e: MouseEvent) => {
//   //     if (isResizing){
//   //       const newWidth = element.size.width + e.clientX - startPos.x!
//   //       const newHeight = element.size.height + e.clientY - startPos.y!
//   //       updateElement(element.id, {
//   //         ...element,
//   //         size: {
//   //           width: newWidth,
//   //           height: newHeight
//   //         }
//   //       })
//   //     }
//   //   }
//   //   const handleMouseUp = () => {
//   //     setIsResizing(false)
//   //   }
//   //   window.addEventListener('mousemove', handleMouseMove)
//   //     window.addEventListener('mouseup', handleMouseUp)
//   //   return () => {
//   //     window.removeEventListener('mousemove', handleMouseMove)
//   //     window.removeEventListener('mouseup', handleMouseUp)
//   //   }
//   // }, [isResizing,startPos])
// }



//   useEffect(() => {
//     let top: ProjectElementInstance | null = null;
//     let left: ProjectElementInstance | null = null;
//     let right: ProjectElementInstance | null = null;
//     let bottom: ProjectElementInstance | null = null;

//     elements.forEach((element) => {
//       if (!top || element.position.y < top.position.y) {
//         top = element;
//       }
//       if (!left || element.position.x < left.position.x) {
//         left = element;
//       }
//       if (!right || element.position.x > right.position.x) {
//         right = element;
//       }
//       if (!bottom || element.position.y > bottom.position.y) {
//         bottom = element;
//       }
//     });

//     setOuterMostElements({ top, left, right, bottom });
//   }, [elements]);

export const createProjectStore = (
    initState: ProjectState = defaultInitState,
) => {
    return createStore<ProjectStore>()((set, get) => ({
        ...initState,
        fetch: async (projectId: string) => {
            const project = await getProjectData(projectId)
            if (!project) return
            set({ projectId, projectName: project.name, projectDescription: project.description ?? "", elements: JSON.parse(project.content ?? "[]") })
        },
        updateProjectName: (name: string) => set({ projectName: name }),
        updateZoomLevel(zoomin, multiplier) {
            set((state) => ({ zoomLevel: updateZoomLevel(state.zoomLevel, zoomin, multiplier) }))
        },
        updateScrollLeft: (scrollLeft: number) => set((state) => ({ scrollLeft: state.scrollLeft - scrollLeft })),
        updateScrollTop: (scrollTop: number) => set((state) => ({ scrollTop: state.scrollTop - scrollTop })),
        addElement: (element: ProjectElementInstance) => set((state) => ({
            elements: [...state.elements, element]
        })),
        updateElement: (id: string, element: ProjectElementInstance) => set((state) => ({
            elements: state.elements.map((el) => el.id === id ? element : el)
        })),
        selectedElements: () => {
            return get().elements.filter((el) => el.selected)
        },
        updateSelectedElements: (selectedElements: ProjectElementInstance[]) => {
            set((state) => ({
                ...state,
                elements: updateSelectedElements(state.elements, selectedElements)
            }))
        },
        removeSelectedElements: () => set((state) => ({
            ...state,
            elements: state.elements.map((el) => el.selected ? { ...el, selected: false } : el)
        })),
        updateKey: (key: string) => set({
            key
        }),
        setAllElementsSelected: () => set((state) => ({
            elements: state.elements.map((el) => ({ ...el, selected: true }))
        })),
    }))
}