import React from "react";
import styles from "./piping.module.css";
import { useAppStateMgtContext } from "../../../../../Utils/AppContext";
import { useBuilderPageFxns } from "../../../../../Utils/useBuilderPageFxns";
import { sectionTypeProps } from "../../../../../Utils/dataTypes";
import usePipingHandleFxns from "../../../../../Utils/LogicHandlers/usePipingHandleFxns";
import PipingActionBTN from "./PipingActionBTN";
import PipingField from "./PipingField";
import SelectorComponent from "./SelectorComponent";
import PipingTextarea from "./Piping_textarea";
import PipingPreview from "./Piping_preview";
import PipingSidebar from "./Piping_sidebar";

const PipingLogic: React.FC = () => {
  const { sections, setSections } = useAppStateMgtContext();
  const { getQuestionNumber } = useBuilderPageFxns();

  // Build a flattened list of available questions to pipe from

  // local editor state
  const [receiverText, setReceiverText] = React.useState<string>(
    "Hello, {{Q1}}. What do you think about our service?"
  );

  // optional selected sender (not used for now but kept for expansion)
  // removed to avoid unused variable lint
  const [delimiter, setDelimiter] = React.useState<string>(", ");
  const [fallback, setFallback] = React.useState<string>("(no answer)");

  // Selected question in the dropdown (maps to a real question in sections)
  const [selectedQuestionId, setSelectedQuestionId] =
    React.useState<string>("");

  const {
    availableQuestions,
    preview,
    insertTokenFor,
    handleCopyTemplate,
    handleEditorChange,
    handleSaveQuestionText,
    handleResetEditor,
  } = usePipingHandleFxns({
    sections: sections as sectionTypeProps,
    getQuestionNumber,
    receiverText,
    setReceiverText,
    delimiter,
    fallback,
    setSections,
    selectedQuestionId,
  });

  // Initialize selected question when availableQuestions load
  const [autoSelectWarning, setAutoSelectWarning] = React.useState<
    string | null
  >(null);

  // one-shot initializer: run once when availableQuestions first becomes non-empty
  const initializedRef = React.useRef(false);

  React.useEffect(() => {
    if (
      selectedQuestionId === "" &&
      initializedRef.current === false &&
      availableQuestions.length > 0
    ) {
      initializedRef.current = true;
      // only set selection if nothing selected
      setSelectedQuestionId((prev) => prev || availableQuestions[0].id);
      // only set receiverText if it's empty (don't overwrite user edits / tokens)
      setReceiverText((prev) =>
        prev && prev.length > 0 ? prev : availableQuestions[0].text
      );
      setAutoSelectWarning(
        "Selected question not found — defaulted to the first source."
      );
    }
    // intentionally only depend on availableQuestions.length so this is a one-shot
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableQuestions.length]);

  // Clear auto-select warning after a short delay
  React.useEffect(() => {
    if (autoSelectWarning === null) return;
    const t = setTimeout(() => setAutoSelectWarning(null), 4000);
    return () => clearTimeout(t);
  }, [autoSelectWarning]);

  // When selection changes, load the selected question's text into the editor
  React.useEffect(() => {
    if (!selectedQuestionId) return;
    const aq = availableQuestions.find((a) => a.id === selectedQuestionId);
    if (aq) setReceiverText(aq.text);
  }, [selectedQuestionId, availableQuestions]);

  // // Local edit only — changes are not persisted until user confirms Save
  // const handleEditorChange = (value: string) => {
  //   setReceiverText(value);
  // };

  // const handleSaveQuestionText = () => {
  //   if (!selectedQuestionId) return;
  //   setSections((prev) =>
  //     prev.map((s) => ({
  //       ...s,
  //       questionFrames: s.questionFrames.map((q) =>
  //         q.id === selectedQuestionId ? { ...q, questionText: receiverText } : q
  //       ),
  //     }))
  //   );
  //   // Optional: show a small toast here, but keeping hook-agnostic
  // };

  // const handleResetEditor = () => {
  //   if (!selectedQuestionId) {
  //     setReceiverText("");
  //     return;
  //   }
  //   const aq = availableQuestions.find((a) => a.id === selectedQuestionId);
  //   setReceiverText(aq ? aq.text : "");
  // };

  // const handleInsertToken = (qId: string) => {
  //   console.log("handleInsertToken ->", qId);
  //   insertTokenFor(qId);
  // };

  return (
    <div className={styles.piping_wrapper}>
      <header className={styles.piping_header}>
        {/* <h2>Piping / Answer Substitution</h2> */}
        <p className={styles.piping_sub}>
          Insert answers from earlier questions into later text.
        </p>
      </header>
      {autoSelectWarning && (
        <div className={styles.autoSelectWarning} role="status">
          {autoSelectWarning}
        </div>
      )}

      <div className={styles.piping_body}>
        <PipingSidebar
          availableQuestions={availableQuestions}
          insertTokenFor={insertTokenFor}
        />

        <main className={styles.piping_main}>
          <section className={styles.editorCard}>
            <div className={styles.selectorRow}>
              {/* Replaced inline selector with reusable SelectorComponent */}
              <SelectorComponent
                label="Source question"
                options={availableQuestions}
                value={selectedQuestionId}
                onChange={(id: string) => setSelectedQuestionId(id)}
              />
            </div>
            <PipingTextarea
              receiverText={receiverText}
              handleEditorChange={handleEditorChange}
            />

            <div className={styles.settingsRow}>
              <PipingField
                id="piping-delimiter"
                label="Delimiter for multi-value answers"
                value={delimiter}
                onChange={setDelimiter}
                placeholder=", "
              />
              <PipingField
                id="piping-fallback"
                label="Fallback text (if source empty)"
                value={fallback}
                onChange={setFallback}
                placeholder="(no answer)"
              />
            </div>
            <PipingPreview preview={preview} />

            <div className={styles.actionRow}>
              <PipingActionBTN
                label="Save"
                btnType="primary"
                actionHandler={handleSaveQuestionText}
              />
              <PipingActionBTN
                label="Copy template"
                btnType="secondary"
                actionHandler={handleCopyTemplate}
              />
              <PipingActionBTN
                label="Reset"
                btnType="secondary"
                actionHandler={handleResetEditor}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PipingLogic;
