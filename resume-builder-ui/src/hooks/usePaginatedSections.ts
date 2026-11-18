import { useMemo } from "react";
import type { ResumeSectionOrder } from "@/types/resume.types";

interface UsePaginatedSectionsProps {
  sections: ResumeSectionOrder[];
  sectionHeights: Record<string, number>;
  firstPageHeight: number;
  pageHeight: number;
  sectionGap: number;
}

export const usePaginatedSections = ({
  sections,
  sectionHeights,
  firstPageHeight,
  pageHeight,
  sectionGap,
}: UsePaginatedSectionsProps): ResumeSectionOrder[][] => {
  return useMemo(() => {
    if (sections.length === 0) return [];

    const pages: ResumeSectionOrder[][] = [];

    let currentPage: ResumeSectionOrder[] = [];
    let usedHeight = 0;
    let capacity = firstPageHeight;

    sections.forEach((section) => {
      const sectionHeight = sectionHeights[section.id] ?? 0;
      const gap = currentPage.length > 0 ? sectionGap : 0;

      if (
        currentPage.length > 0 &&
        usedHeight + gap + sectionHeight > capacity
      ) {
        pages.push(currentPage);

        currentPage = [];
        usedHeight = 0;
        capacity = pageHeight;
      }

      const nextGap = currentPage.length > 0 ? sectionGap : 0;

      currentPage.push(section);
      usedHeight += nextGap + sectionHeight;
    });

    if (currentPage.length > 0) {
      pages.push(currentPage);
    }

    return pages;
  }, [sections, sectionHeights, firstPageHeight, pageHeight, sectionGap]);
};
