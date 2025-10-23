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
    // Only persist when we have an array
    if (!Array.isArray(optionTexts)) return;

    // Clear existing timer if any
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Schedule a : new persistence after `delay` ms
    timerRef.current = window.setTimeout(() => {
      setSections((previousSections: sectionTypeProps) =>
        previousSections.map((section) =>
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
        )
      );
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

  // Immediate flush helper (persist right away and cancel pending timer)
  const flush = React.useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (!Array.isArray(optionTexts)) return;
    setSections((previousSections: sectionTypeProps) =>
      previousSections.map((section) =>
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
      )
    );
  }, [optionTexts, sectionId, questionId, setSections]);

  return { flush };
}

export default useDebouncedPersistOptionTexts;