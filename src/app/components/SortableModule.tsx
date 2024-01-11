import React, {useState} from 'react';
import {
  UniqueIdentifier,
} from '@dnd-kit/core';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export default function SortableModule(props: {id: UniqueIdentifier, children: React.ReactNode} & {[key: string] : any}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div  ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {props.children}
    </div>
  );
}
