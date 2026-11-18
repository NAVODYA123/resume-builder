import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import type { DragEndEvent } from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import { Box, IconButton } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import type { ReactNode } from "react";
import type { ResumeSectionOrder } from "@/types/resume.types";

interface SortablePreviewSectionsProps {
  sections: ResumeSectionOrder[];
  pages: ResumeSectionOrder[][];
  onChange: (sections: ResumeSectionOrder[]) => void;
  renderSection: (section: ResumeSectionOrder) => ReactNode;
}

const SortablePreviewSection = ({
  section,
  children,
}: {
  section: ResumeSectionOrder;
  children: ReactNode;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: section.id,
  });

  return (
    <Box
      ref={setNodeRef}
      data-section-id={section.id}
      sx={{
        position: "relative",
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <IconButton
        {...attributes}
        {...listeners}
        size="small"
        aria-label="Drag to reorder section"
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 2,
          cursor: "grab",
          "&:active": {
            cursor: "grabbing",
          },
        }}
      >
        <DragIndicatorIcon fontSize="small" />
      </IconButton>

      {children}
    </Box>
  );
};

export const SortablePreviewSections = ({
  sections,
  pages,
  onChange,
  renderSection,
}: SortablePreviewSectionsProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex((section) => section.id === active.id);

    const newIndex = sections.findIndex((section) => section.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    onChange(arrayMove(sections, oldIndex, newIndex));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={pages.flatMap((page) => page.map((section) => section.id))}
        strategy={verticalListSortingStrategy}
      >
        <Box>
          {pages.map((pageSections, pageIndex) => (
            <Box
              key={`column-page-${pageIndex}`}
              className="sortable-page-sections"
            >
              {pageSections.map((section) => (
                <SortablePreviewSection key={section.id} section={section}>
                  {renderSection(section)}
                </SortablePreviewSection>
              ))}
            </Box>
          ))}
        </Box>
      </SortableContext>
    </DndContext>
  );
};
