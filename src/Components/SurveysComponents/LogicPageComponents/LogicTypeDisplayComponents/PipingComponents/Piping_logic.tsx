import React from "react";
import styles from "./piping.module.css";
import { useAppStateMgtContext } from "../../../../../Utils/AppContext";
import { useBuilderPageFxns } from "../../../../../Utils/useBuilderPageFxns";
import {
  QuestionFrameProps,
  sectionTypeProps,
} from "../../../../../Utils/dataTypes";

/*
  Piping UI
  - Lists available questions (senders)
  - Allows inserting a token like {{Q1}} into an example receiver text
  - Lets user pick delimiter for multi-value answers and a fallback value
  - Shows a preview where tokens are substituted from current `sections`
  - Lightweight, no runtime changes to survey rendering; this is a design-time helper
*/

const PipingLogic: React.FC = () => {
  const { sections } = useAppStateMgtContext();
  const { getQuestionNumber } = useBuilderPageFxns();

  // Build a flattened list of available questions to pipe from
  type AvailableQ = { id: string; text: string; label: string };
  const availableQuestions: AvailableQ[] = React.useMemo(() => {
    const secs = sections as sectionTypeProps;
    return secs.flatMap((s, sIdx) =>
      s.questionFrames.map((q: QuestionFrameProps, qIdx: number) => ({
        id: q.id,
        text: q.questionText || "Untitled question",
        label: `${getQuestionNumber(sIdx, qIdx, sections.length)} — ${
          q.questionText || "Untitled"
        }`,
      }))
    );
  }, [sections, getQuestionNumber]);

  const [receiverText, setReceiverText] = React.useState<string>(
    "Please review: {{Q1}}"
  );
  // optional selected sender (not used for now but kept for expansion)
  // removed to avoid unused variable lint
  const [delimiter, setDelimiter] = React.useState<string>(", ");
  const [fallback, setFallback] = React.useState<string>("(no answer)");

  // A simple helper to get a source answer from sections by question id
  const getAnswerForQuestion = React.useCallback(
    (questionId: string) => {
      for (const s of sections as sectionTypeProps) {
        const q = s.questionFrames.find(
          (x: QuestionFrameProps) => x.id === questionId
        );
        if (q) return q.assignedPoint ?? q.questionText ?? ""; // best-effort demo
      }
      return "";
    },
    [sections]
  );

  // Render preview by replacing tokens like {{Q1}} with values from availableQuestions mapping
  const preview = React.useMemo(() => {
    let text = receiverText;
    // token format: {{Q<index>}} or {{questionId}}
    const tokenRegex = /{{\s*([^}]+)\s*}}/g;
    text = text.replace(tokenRegex, (_match: string, token: string) => {
      // First try to find by question number token like Q1, else match question id
      const q = availableQuestions.find(
        (aq: AvailableQ) =>
          aq.id === token ||
          aq.label.startsWith(token) ||
          aq.label.includes(token)
      );
      if (q) {
        const source = getAnswerForQuestion(q.id);
        if (source == null || source === "") return fallback;
        if (Array.isArray(source)) return source.join(delimiter);
        return String(source);
      }
      // If token looks like Q<number>, try to map by that index
      if (/^Q\d+$/i.test(token)) {
        // strip Q and parse number
        const num = Number(token.replace(/[^0-9]/g, ""));
        // attempt to pick the (num-1)th question in availableQuestions
        const idx = num - 1;
        if (availableQuestions[idx]) {
          const source = getAnswerForQuestion(availableQuestions[idx].id);
          if (source == null || source === "") return fallback;
          if (Array.isArray(source)) return source.join(delimiter);
          return String(source);
        }
      }
      return fallback;
    });
    return text;
  }, [
    receiverText,
    availableQuestions,
    delimiter,
    fallback,
    getAnswerForQuestion,
  ]);

  const insertTokenFor = (qId: string) => {
    // insert a token by question ID (use a short label Qn if possible)
    const idx = availableQuestions.findIndex((a: AvailableQ) => a.id === qId);
    const token = idx >= 0 ? `{{Q${idx + 1}}}` : `{{${qId}}}`;
    // place token at cursor end
    setReceiverText((t) => t + " " + token);
  };

  return (
    <div className={styles.piping_wrapper}>
      <header className={styles.piping_header}>
        <h2>Piping / Answer Substitution</h2>
        <p className={styles.piping_sub}>
          Insert answers from earlier questions into later text.
        </p>
      </header>

      <div className={styles.piping_body}>
        <aside className={styles.piping_sidebar}>
          <div className={styles.controlGroup}>
            <label>Available source questions</label>
            <ul className={styles.sourceList}>
              {availableQuestions.map((aq: AvailableQ) => (
                <li key={aq.id} className={styles.sourceItem}>
                  <button
                    type="button"
                    className={styles.insertBtn}
                    onClick={() => insertTokenFor(aq.id)}
                    title={`Insert token for ${aq.text}`}
                  >
                    Insert
                  </button>
                  <div className={styles.sourceMeta}>
                    <strong className={styles.sourceLabel}>{aq.label}</strong>
                    <div className={styles.sourceText}>{aq.text}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className={styles.piping_main}>
          <section className={styles.editorCard}>
            <label className={styles.fieldLabel}>
              Receiver text (edit and place tokens)
            </label>
            <textarea
              className={styles.textarea}
              value={receiverText}
              onChange={(e) => setReceiverText(e.target.value)}
              rows={5}
            />

            <div className={styles.settingsRow}>
              <div>
                <label>Delimiter for multi-value answers</label>
                <input
                  className={styles.smallInput}
                  value={delimiter}
                  onChange={(e) => setDelimiter(e.target.value)}
                />
              </div>
              <div>
                <label>Fallback text (if source empty)</label>
                <input
                  className={styles.smallInput}
                  value={fallback}
                  onChange={(e) => setFallback(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.previewCard}>
              <h3>Preview</h3>
              <div className={styles.previewText} aria-live="polite">
                {preview}
              </div>
            </div>

            <div className={styles.actionRow}>
              <button
                className={styles.btnPrimary}
                onClick={() => navigator.clipboard?.writeText(receiverText)}
              >
                Copy template
              </button>
              <button
                className={styles.btnSecondary}
                onClick={() => setReceiverText("")}
              >
                Reset
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PipingLogic;
