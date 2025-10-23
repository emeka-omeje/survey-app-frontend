import React from "react";
import styles from "./scoring.module.css";
import { useAppStateMgtContext } from "../../../../../Utils/AppContext";
import { useBuilderPageFxns } from "../../../../../Utils/useBuilderPageFxns";
import useScoringLogicFxns from "../../../../../Utils/LogicHandlers/useScoringLogicFxns";
import ScoringSideBar from "./Scoring_SideBar";
import EachScoringPoint_Control from "./EachScoringPoint_Control";
import ScoringHeader from "../LogicTypeHeaderComponents/ScoringHeader";

const ScoringLogic: React.FC = () => {
  const { sections } = useAppStateMgtContext();
  // // Local editable copy to allow user to change points and then save
  const [localSections, setLocalSections] = React.useState(sections);

  const { handlePointChange, applyPointsToAll, computeTotals } =
    useScoringLogicFxns(localSections, setLocalSections);
  const { getQuestionNumber } = useBuilderPageFxns();

  // const [scoringModeAuto, setScoringModeAuto] = React.useState(true);
  // Controlled input state for the "Apply points to all" field — default to 0
  const [applyAllValue, setApplyAllValue] = React.useState<number>(0);

  React.useEffect(() => {
    setLocalSections(sections);
  }, [sections]);

  // const handlePointChange = (
  //   sectionId: string,
  //   questionId: string,
  //   value: number
  // ) => {
  //   const sanitized = Number.isNaN(value) || value < 0 ? 0 : Math.floor(value);
  //   setLocalSections((prev) =>
  //     prev.map((s) =>
  //       s.id === sectionId
  //         ? {
  //             ...s,
  //             questionFrames: s.questionFrames.map((q) =>
  //               q.id === questionId ? { ...q, assignedPoint: sanitized } : q
  //             ),
  //           }
  //         : s
  //     )
  //   );
  // };

  // const saveChanges = () => {
  //   setSections(localSections);
  // };

  // const resetAllPoints = () => {
  //   setLocalSections((prev) =>
  //     prev.map((s) => ({
  //       ...s,
  //       questionFrames: s.questionFrames.map((q) => ({
  //         ...q,
  //         assignedPoint: 0,
  //       })),
  //     }))
  //   );
  // };

  // const applyPointsToAll = (value: number) => {
  //   const sanitized = Number.isNaN(value) || value < 0 ? 0 : Math.floor(value);
  //   setLocalSections((prev) =>
  //     prev.map((s) => ({
  //       ...s,
  //       questionFrames: s.questionFrames.map((q) => ({
  //         ...q,
  //         assignedPoint: sanitized,
  //       })),
  //     }))
  //   );
  // };

  // const computeTotals = React.useMemo(() => {
  //   const perSection = localSections.map((s) => ({
  //     sectionId: s.id,
  //     title: s.title,
  //     total: s.questionFrames.reduce(
  //       (acc, q) => acc + (q.assignedPoint ?? 0),
  //       0
  //     ),
  //   }));
  //   const grandTotal = perSection.reduce((acc, p) => acc + p.total, 0);
  //   return { perSection, grandTotal };
  // }, [localSections]);

  if (!sections || sections.length === 0) {
    return (
      <div className={styles.empty}>No questions available for scoring.</div>
    );
  }

  return (
    <section className={styles.scoring_wrapper}>
      <ScoringHeader />
      <section className={styles.scoring_body} aria-label="Scoring interface">
        {/* Sidebar moved to ScoringSideBar component */}
        <ScoringSideBar
          applyAllValue={applyAllValue}
          setApplyAllValue={setApplyAllValue}
          applyPointsToAll={applyPointsToAll}
          computeTotals={computeTotals}
        />

        <main className={styles.scoring_main}>
          {localSections.map((section, sIdx) => (
            <section key={section.id} className={styles.sectionCard}>
              <header className={styles.sectionHeader}>
                <h4>{section.title}</h4>
                <div className={styles.sectionTotal}>
                  {section.questionFrames.reduce(
                    (acc, q) => acc + (q.assignedPoint ?? 0),
                    0
                  )}{" "}
                  pts
                </div>
              </header>

              <div className={styles.questionsList}>
                {section.questionFrames.map((q, qIdx) => (
                  <div key={q.id} className={styles.questionRow}>
                    <div className={styles.questionMeta}>
                      <div className={styles.questionNumber}>
                        {getQuestionNumber(sIdx, qIdx, sections.length)}
                      </div>
                      <div className={styles.questionText}>
                        {q.questionText || "Untitled question"}
                      </div>
                      <div className={styles.questionType}>
                        {q.questionTypeLabel}
                      </div>
                    </div>
                    <EachScoringPoint_Control
                      sectionId={section.id}
                      questionId={q.id}
                      assignedPoint={q.assignedPoint}
                      onPointChange={handlePointChange}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>
        {/* </div> */}
      </section>
    </section>
  );
};

export default ScoringLogic;
