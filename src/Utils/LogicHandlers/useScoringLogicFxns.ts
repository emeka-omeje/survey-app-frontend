import React from "react";
import { useAppStateMgtContext } from "../AppContext";
import { sectionTypeProps } from "../dataTypes";
// import { useBuilderPageFxns } from "../useBuilderPageFxns";

const useScoringLogicFxns = (
  localSectionsProp?: sectionTypeProps,
  setLocalSectionsProp?: React.Dispatch<React.SetStateAction<sectionTypeProps>>
) => {
  const { sections, setSections } = useAppStateMgtContext();
  //   const { getQuestionNumber } = useBuilderPageFxns();

  // Local editable copy to allow user to change points and then save
  // const [localSections, setLocalSections] = React.useState(sections);
  //   const [scoringModeAuto, setScoringModeAuto] = React.useState(true);

  // React.useEffect(() => {
  //   setLocalSections(sections);
  // }, [sections]);

  // Use injected localSections/setLocalSections when provided, otherwise fall back to AppContext sections
  const effectiveLocalSections = localSectionsProp ?? sections;
  const effectiveSetLocalSections: React.Dispatch<
    React.SetStateAction<sectionTypeProps>
  > =
    setLocalSectionsProp ??
    ((updater: React.SetStateAction<sectionTypeProps>) => {
      // fallback: apply updater to the AppContext sections and persist
      if (typeof updater === "function") {
        // updater is (prev) => newState
        setSections((prev) =>
          (updater as (p: sectionTypeProps) => sectionTypeProps)(prev)
        );
      } else {
        // updater is a direct value
        setSections(updater as sectionTypeProps);
      }
    });

  const handlePointChange = (
    sectionId: string,
    questionId: string,
    value: number
  ) => {
    const sanitized = Number.isNaN(value) || value < 0 ? 0 : Math.floor(value);
    effectiveSetLocalSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              questionFrames: s.questionFrames.map((q) =>
                q.id === questionId ? { ...q, assignedPoint: sanitized } : q
              ),
            }
          : s
      )
    );
  };

  const saveChanges = (payloadSections?: sectionTypeProps) => {
    // If caller provides explicit payload use it, otherwise persist effectiveLocalSections
    const toSave = payloadSections ?? effectiveLocalSections;
    setSections(toSave);
  };

  const resetAllPoints = () => {
    effectiveSetLocalSections((prev) =>
      prev.map((s) => ({
        ...s,
        questionFrames: s.questionFrames.map((q) => ({
          ...q,
          assignedPoint: 0,
        })),
      }))
    );
  };

  const applyPointsToAll = (value: number) => {
    const sanitized = Number.isNaN(value) || value < 0 ? 0 : Math.floor(value);
    effectiveSetLocalSections((prev) =>
      prev.map((s) => ({
        ...s,
        questionFrames: s.questionFrames.map((q) => ({
          ...q,
          assignedPoint: sanitized,
        })),
      }))
    );
  };

  const computeTotals = React.useMemo(() => {
    const perSection = effectiveLocalSections.map((s) => ({
      sectionId: s.id,
      title: s.title,
      total: s.questionFrames.reduce(
        (acc, q) => acc + (q.assignedPoint ?? 0),
        0
      ),
    }));
    const grandTotal = perSection.reduce((acc, p) => acc + p.total, 0);
    return { perSection, grandTotal };
  }, [effectiveLocalSections]);

  return {
    handlePointChange,
    saveChanges,
    resetAllPoints,
    applyPointsToAll,
    computeTotals,
    // expose effectiveLocalSections for callers that may want to read it
    // localSections: effectiveLocalSections,
    // setLocalSections: effectiveSetLocalSections,
  };
};

export default useScoringLogicFxns;
