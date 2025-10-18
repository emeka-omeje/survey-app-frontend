import React from "react";
import styles from "./defaultPrefil.module.css";
import type {
  sectionTypeProps,
  QuestionFrameProps,
  DefaultPrefilPanelProps,
} from "../../../../../Utils/dataTypes";
import DefaultprefilRender from "./DefaultPrefilRender";
import DefaultPrefilButton from "./DefaultPrefilButton";
import { useBuilderPageFxns } from "../../../../../Utils/useBuilderPageFxns";
import { useAppStateMgtContext } from "../../../../../Utils/AppContext";

// type Helper(q: QuestionFrameProps, delta: Partial<QuestionFrameProps>) => QuestionFrameProps

const applyDeltaToQuestion = (
  q: QuestionFrameProps,
  delta: Partial<QuestionFrameProps>
): QuestionFrameProps => {
  const merged = { ...q, ...delta } as QuestionFrameProps;

  // Determine the effective source: prefer delta.defaultSource if present,
  // otherwise fall back to merged.defaultSource.
  const effectiveSource = delta.defaultSource ?? merged.defaultSource;

  if (effectiveSource && effectiveSource !== "static") {
    // Clear any previously stored static default and make it non-editable
    merged.defaultValue = "" as unknown as typeof merged.defaultValue;
    merged.defaultEditable = false;
  }

  return merged;
};

const DefaultPrefilLogic: React.FC<DefaultPrefilPanelProps> = ({ onClose }) => {
  const { sections, setSections } = useAppStateMgtContext();
  const { getQuestionNumber } = useBuilderPageFxns();

  // Local transient state mirrors sections' question defaults while editing
  const [localSections, setLocalSections] =
    React.useState<sectionTypeProps>(sections);

  React.useEffect(() => setLocalSections(sections), [sections]);

  const handleRowChange = (
    sectionId: string,
    questionId: string,
    delta: Partial<QuestionFrameProps>
  ) => {
    setLocalSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              questionFrames: s.questionFrames.map((q) =>
                q.id === questionId ? applyDeltaToQuestion(q, delta) : q
              ),
            }
          : s
      )
    );
  };

  const handleSave = () => {
    setSections(localSections);
    if (onClose) onClose();
  };

  const handleReset = () => setLocalSections(sections);

  return (
    <div className={styles.panel_wrapper} role="dialog" aria-modal="true">
      <header className={styles.panel_header}>
        {/* <h3>Default Values</h3> */}
        <p className={styles.panel_sub}>
          Configure default / prefilled answers for questions.
        </p>
      </header>

      <DefaultprefilRender
        localSections={localSections}
        getQuestionNumber={getQuestionNumber}
        onRowChange={handleRowChange}
      />

      <footer className={styles.panel_footer}>
        {/* <DefaultPrefilButton
          buttonLabel={"Reset"}
          type={"reset"}
          onClick={handleReset}
          variant="secondary"
          ariaLabel="Reset defaults"
        /> */}
        <div style={{ flex: 1 }} />
        <DefaultPrefilButton
          buttonLabel={"Reset"}
          type={"reset"}
          onClick={handleReset}
          variant="secondary"
          ariaLabel="Reset defaults"
        />
        <DefaultPrefilButton
          buttonLabel={"Save default"}
          type={"submit"}
          onClick={handleSave}
          variant="primary"
          ariaLabel="Save defaults"
        />
      </footer>
    </div>
  );
};

export default DefaultPrefilLogic;
