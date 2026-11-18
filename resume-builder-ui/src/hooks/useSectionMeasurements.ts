import { useLayoutEffect, useState, type RefObject } from "react";

interface UseSectionMeasurementsProps {
  containerRef: RefObject<HTMLDivElement | null>;
  dependency: unknown;
}

export const useSectionMeasurements = ({
  containerRef,
  dependency,
}: UseSectionMeasurementsProps) => {
  const [sectionHeights, setSectionHeights] = useState<Record<string, number>>(
    {},
  );

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const measure = () => {
      const elements =
        container.querySelectorAll<HTMLElement>("[data-section-id]");

      const measurements: Record<string, number> = {};

      elements.forEach((element) => {
        const id = element.dataset.sectionId;

        if (id) {
          measurements[id] = element.getBoundingClientRect().height;
        }
      });

      setSectionHeights((previous) => {
        const unchanged =
          Object.keys(measurements).length === Object.keys(previous).length &&
          Object.entries(measurements).every(
            ([id, height]) => Math.abs((previous[id] ?? 0) - height) < 1,
          );

        return unchanged ? previous : measurements;
      });
    };

    measure();

    const observer = new ResizeObserver(measure);

    observer.observe(container);

    container
      .querySelectorAll<HTMLElement>("[data-section-id]")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [containerRef, dependency]);

  return sectionHeights;
};
