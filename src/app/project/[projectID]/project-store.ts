// src/stores/counter-store.ts
import { Project } from '@src/API'
import { createStore } from 'zustand/vanilla'
import { AllElementsType, CanvasElementType, ElementsType, ProjectElementInstance, ProjectElements } from './types/ProjectElements'
import { getProjectData } from './api'
import { RefObject } from 'react'
import { getImageURL } from './clientapi'

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
  fetched: boolean;
  imageRef: RefObject<HTMLImageElement>;
}

export type ProjectActions = {
  fetch: (projectId: string) => void
  updateProjectName: (name: string) => void
  updateZoomLevel: (zoomin: boolean, multiplier: number) => void
  updateScrollLeft: (scrollLeft: number) => void
  updateScrollTop: (scrollTop: number) => void
  addElement: (element: AllElementsType) => void
  updateProjectElement: (id: string, element: ProjectElementInstance) => void
  selectedElements: () => ProjectElementInstance[]
  canvasElements: () => CanvasElementType[]
  projectElements: () => ProjectElementInstance[]
  // updateSelectedElements: (selectedElements: ProjectElementInstance[]) => void
  // removeSelectedElements: () => void
  updateKey: (key: string) => void
  // setAllElementsSelected: () => void
  deleteElement: (id: string) => void
  // deleteSelectedElements: () => void
  updateIsDrawing: (isDrawing?: boolean) => void
  updateCanvasPoints: (elements: CanvasElementType[]) => void
  undo: () => void
  redo: () => void
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
  history: [[]] as AllElementsType[][],
  imageRef: { current: null },
  fetched: false,
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
  initState: ProjectState = defaultInitState
) => {
  return createStore<ProjectStore>()((set, get) => ({
    ...initState,
    fetch: async (projectId: string) => {

      const project = await getProjectData(projectId);
      console.log(project)
      if (!project) return;

      // Need to add unstored extra attributes to each element
      let elements: ProjectElementInstance[] = JSON.parse(
        project.content ?? "[]"
      );

      elements = await prepareElements(elements);
      set({
        projectId,
        projectName: project.name,
        projectDescription: project.description ?? "",
        history: [elements],
        fetched: true,
      });
    },
    updateProjectName: (name: string) => set({ projectName: name }),
    updateZoomLevel(zoomin, multiplier) {
      set((state) => ({ zoomLevel: updateZoomLevel(state.zoomLevel, zoomin, multiplier) }))
    },
    updateScrollLeft: (scrollLeft: number) => set((state) => ({ scrollLeft: state.scrollLeft + scrollLeft })),
    updateScrollTop: (scrollTop: number) => set((state) => ({ scrollTop: state.scrollTop + scrollTop })),
    updateProjectElement: (id: string, element: ProjectElementInstance) => {
      const updatedState = get().history[get().index].map((el) => (el.id === id ? element : el));
      set((state) => ({
        history: [...state.history, updatedState],
        index: state.index + 1
      }))

    },
    canvasElements: () => get().history[get().index]?.filter((el) => 'points' in el) as CanvasElementType[] || [],
    projectElements: () => get().history[get().index]?.filter((el) => 'size' in el) as ProjectElementInstance[] || [],
    selectedElements: () => {
      return get().projectElements().filter((el) => el.selected)
    },
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
    deleteElement: (id: string) => set((state) => ({
      history: [...state.history, state.history[state.index].filter((el) => el.id !== id)
      ],
      index: state.index + 1
    })),
    deleteSelectedElements: () => set((state) => ({
      history: [...state.history, state.history[state.index].filter((el) => !el.selected)],
      index: state.index + 1
    })),
    updateIsDrawing: (isDrawing?: boolean) => set((state) => ({
      isDrawing: isDrawing || !state.isDrawing
    })),
    addElement: (element: AllElementsType) => {
      set((state) => ({
        history: [...state.history, [...state.history[state.index], element]],
        index: state.index + 1,
      }))
    },
    updateCanvasPoints: (elements: CanvasElementType[]) => {
      const historyCopy = [...get().history];
      historyCopy[get().index] = [...elements, ...get().projectElements()];
      set((state) => ({
        history: [...historyCopy],
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

/**
 * Adds unstored attributes to elements after retrieving them from the database
 * Also generates a temporary URL for each image block
 * @param elements
 * @returns
 */
async function prepareElements(elements: ProjectElementInstance[]) {
  return await Promise.all(
    elements.map(async (element: ProjectElementInstance) => {
      element =
        ProjectElements[element.type as ElementsType].addUnstoredAttributes?.(
          element
        ) ?? element;

      element = await refreshImageURL(element);

      return element;
    })
  );
}

async function refreshImageURL(element: ProjectElementInstance) {
  if (element.type !== "ImageBlock") return element;

  const url = await getImageURL(element.extraAttributes?.key);
  if (!url) return element;
  return {
    ...element,
    unstoredAttributes: {
      ...element.unstoredAttributes,
      src: url.href,
    },
  };
}
