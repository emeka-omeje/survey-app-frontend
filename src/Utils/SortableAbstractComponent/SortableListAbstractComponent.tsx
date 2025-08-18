// components/SortableList.tsx
import React from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  // DraggableAttributes,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandleProps, SortableListProps } from "../dataTypes";
// import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

// type SortableListProps<T> = {
//   items: T[];
//   getId: (item: T) => string;
//   onReorder: (newItems: T[]) => void;
//   renderItem: (item: T) => React.ReactNode;
// };

export function SortableListAbstractComponent<T>({
  items,
  getId,
  onReorder,
  renderItem,
}: SortableListProps<T>) {
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={(event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = items.findIndex((i) => getId(i) === active.id);
        const newIndex = items.findIndex((i) => getId(i) === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          onReorder(arrayMove(items, oldIndex, newIndex));
        }
      }}
    >
      <SortableContext
        items={items.map(getId)}
        strategy={verticalListSortingStrategy}
      >
        {items.map((item) => {
          const index = items.indexOf(item);
          return (
          <SortableItem key={getId(item)} id={getId(item)}>
            {(dragHandleProps) => renderItem(item, index, dragHandleProps)}
          </SortableItem>
        )})}
      </SortableContext>
    </DndContext>
  );
}

function SortableItem({
  id,
  children,
}: {
  id: string;
  children: (dragHandleProps: DragHandleProps) => React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled: false });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "100%",
    // display: "flex",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children({ attributes, listeners })}
    </div>
  );
}
