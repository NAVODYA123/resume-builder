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

import { Box, Typography, IconButton, Paper, Stack } from "@mui/material";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import type {
  ResumeSectionOrder,
  CustomRightPanelItemProps,
} from "@/types/resume.types";

interface SectionReorderProps {
  sections: ResumeSectionOrder[];
  customRightPanelItem?: CustomRightPanelItemProps[];
  onChange: (sections: ResumeSectionOrder[]) => void;
}

// Individual sortable section
const SortableSection = ({
  section,
  title,
}: {
  section: ResumeSectionOrder;
  title: string;
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
    <Paper
      ref={setNodeRef}
      elevation={isDragging ? 4 : 0}
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1.5,
        mb: 1,
        border: "1px solid",
        borderColor: "divider",
        opacity: isDragging ? 0.5 : 1,
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor: "background.paper",
      }}
    >
      <IconButton
        {...attributes}
        {...listeners}
        size="small"
        sx={{ cursor: "grab", mr: 1 }}
        aria-label={`Drag ${title}`}
      >
        <DragIndicatorIcon />
      </IconButton>

      <Typography variant="body2">{title}</Typography>
    </Paper>
  );
};

export const SectionReorder = ({
  sections,
  customRightPanelItem,
  onChange,
}: SectionReorderProps) => {
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

  const getSectionTitle = (section: ResumeSectionOrder) => {
    switch (section.type) {
      case "workExperience":
        return "Work Experience";

      case "education":
        return "Education";

      case "customRightPanelItem":
        return (
          customRightPanelItem?.find((item) => item.id === section.id)?.title ??
          "Custom Section"
        );

      default:
        return "Section";
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex((section) => section.id === active.id);

    const newIndex = sections.findIndex((section) => section.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    onChange(arrayMove(sections, oldIndex, newIndex));
  };

  return (
    <Box>
      <Stack>
        <Typography variant="h6">Reorder Resume Sections</Typography>

        <Typography variant="body2" color="text.secondary">
          Drag and drop sections to change their order in the resume preview.
        </Typography>
      </Stack>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections.map((section) => section.id)}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((section) => (
            <SortableSection
              key={section.id}
              section={section}
              title={getSectionTitle(section)}
            />
          ))}
        </SortableContext>
      </DndContext>
    </Box>
  );
};
