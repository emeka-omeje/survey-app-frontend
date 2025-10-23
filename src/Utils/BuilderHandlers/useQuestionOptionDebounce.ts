import React from "react";
import { sectionTypeProps } from "../dataTypes";

const useDebouncedPersistOptionTexts = (
  optionTexts: string[] | undefined,
  sectionId: string,
  questionId: string,
  setSections: React.Dispatch<React.SetStateAction<sectionTypeProps>>,
  delayTimer: number
) => {
  const timerRef = React.useRef<number | null>(null);

  // Effect: debounce persisting optionTexts whenever optionTexts changes
  React.useEffect(() => {
    console.log("useDebouncedPersistOptionTexts effect triggered");
    // Only persist when we have an array
    if (!Array.isArray(optionTexts)) return;

    // Clear existing timer if any
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Schedule a new persistence after `delay` ms
    timerRef.current = window.setTimeout(() => {
      // Avoid writing back identical arrays (this prevents a re-render loop when
      // the persisted data is immediately read back as a new array reference).
      setSections((previousSections: sectionTypeProps) => {
        const section = previousSections.find((s) => s.id === sectionId);
        if (!section) return previousSections;
        const frame = section.questionFrames.find((f) => f.id === questionId);
        // If no frame found, skip
        if (!frame) return previousSections;

        const current = frame.questionTypeOptions;
        const next = optionTexts;
        const areEqual =
          Array.isArray(current) &&
          current.length === next.length &&
          current.every((v, i) => v === next[i]);

        if (areEqual) {
          // nothing to change
          return previousSections;
        }

        // Perform update only when different
        return previousSections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                questionFrames: section.questionFrames.map((frame) =>
                  frame.id === questionId
                    ? { ...frame, questionTypeOptions: optionTexts }
                    : frame
                ),
              }
            : section
        );
      });

      timerRef.current = null;
    }, delayTimer);

    // Cleanup on dependency change
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
    // include setSections, sectionId, questionId and delay so effect is stable
  }, [optionTexts, sectionId, questionId, setSections, delayTimer]);
  // }, [optionTexts, sectionId, questionId, setSections, delayTimer]);

  // Immediate flush helper (persist right away and cancel pending timer)
  const flush = React.useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (!Array.isArray(optionTexts)) return;

    setSections((previousSections: sectionTypeProps) => {
      const section = previousSections.find((s) => s.id === sectionId);
      if (!section) return previousSections;
      const frame = section.questionFrames.find((f) => f.id === questionId);
      if (!frame) return previousSections;

      const current = frame.questionTypeOptions;
      const next = optionTexts;
      const areEqual =
        Array.isArray(current) &&
        current.length === next.length &&
        current.every((v, i) => v === next[i]);

      if (areEqual) return previousSections;

      return previousSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              questionFrames: section.questionFrames.map((frame) =>
                frame.id === questionId
                  ? { ...frame, questionTypeOptions: optionTexts }
                  : frame
              ),
            }
          : section
      );
    });
  }, [optionTexts, sectionId, questionId, setSections]);
  // }, [optionTexts, sectionId, questionId, setSections]);

  return { flush };
}

export default useDebouncedPersistOptionTexts;