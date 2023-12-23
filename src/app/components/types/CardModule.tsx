import { UniqueIdentifier } from "@dnd-kit/core"

export type CardModuleProps = {
    id: UniqueIdentifier,
    key: UniqueIdentifier,
    editing: boolean
}

export type CardModule = {
    component: React.FC<CardModuleProps>,
    id: UniqueIdentifier,
}
