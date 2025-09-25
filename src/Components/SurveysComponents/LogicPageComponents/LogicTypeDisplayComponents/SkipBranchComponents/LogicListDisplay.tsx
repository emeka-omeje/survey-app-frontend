import React from "react";
import styles from "./skip_branch.module.css";
import { useAppStateMgtContext } from "../../../../../Utils/AppContext";
import {
  QuestionFrameProps,
  //   sectionTypeProps,
  //   conditionStatementObjectArrayProps,
  LogicCondition,
} from "../../../../../Utils/dataTypes";

// A compact utility to render the value of a logic condition
const renderConditionValue = (
  value: LogicCondition["value"] | undefined
): string => {
  if (value === null || value === undefined) return "(no value)";
  if (typeof value === "object" && "label" in value) return value.label;
  return String(value);
};

// Represents a single rule block for a question that has logic
const RuleCard: React.FC<{
  sectionTitle: string;
  question: QuestionFrameProps;
  questionIndex: number;
}> = ({ sectionTitle, question, questionIndex }) => {
  const logic = question.logic ?? [];

  return (
    <article
      className={styles.logicList_item}
      aria-label={`Logic for ${question.questionText}`}
    >
      <header className={styles.logicList_itemHeader}>
        <div className={styles.logicList_titleWrap}>
          <h4 className={styles.logicList_questionTitle}>
            {`Q${questionIndex + 1}: ${
              question.questionText || "Untitled question"
            }`}
          </h4>
          <span className={styles.logicList_sectionTag}>{sectionTitle}</span>
        </div>
      </header>

      <div className={styles.logicList_body}>
        {logic.map((cond, idx) => (
          <div key={idx} className={styles.logicList_conditionRow}>
            <div className={styles.logicList_conditionLabel}>If</div>
            <div className={styles.logicList_conditionDetail}>
              <strong>{cond.operator}</strong>
              <span className={styles.logicList_conditionValue}>
                {renderConditionValue(cond.value)}
              </span>
            </div>
            <div className={styles.logicList_actionList}>
              {cond.logicAction && cond.logicAction.length > 0 ? (
                cond.logicAction.map((act, aIdx) => (
                  <div key={aIdx} className={styles.logicList_actionItem}>
                    <span className={styles.logicList_actionType}>
                      {act.actionType}
                    </span>
                    {act.targetQuestionId ? (
                      <span
                        className={styles.logicList_actionTarget}
                      >{`→ ${act.targetQuestionId}`}</span>
                    ) : null}
                  </div>
                ))
              ) : (
                <div className={styles.logicList_actionPlaceholder}>
                  No action
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

const LogicListDisplay: React.FC = () => {
  const { sections } = useAppStateMgtContext();

  // Build a flat list of questions that have logic defined
  const questionsWithLogic = React.useMemo(() => {
    const result: {
      sectionTitle: string;
      question: QuestionFrameProps;
      questionIndex: number;
    }[] = [];

    sections.forEach((section) => {
      section.questionFrames.forEach((q, qIdx) => {
        if (q.logic && q.logic.length > 0) {
          result.push({
            sectionTitle: section.title,
            question: q,
            questionIndex: qIdx,
          });
        }
      });
    });

    return result;
  }, [sections]);

  if (!questionsWithLogic || questionsWithLogic.length === 0) {
    return (
      <div className={styles.logicList_empty}>
        No skip/branch rules defined yet.
      </div>
    );
  }

  return (
    <section className={styles.logicList_wrapper}>
      {questionsWithLogic.map((item) => (
        <RuleCard
          key={item.question.id}
          sectionTitle={item.sectionTitle}
          question={item.question}
          questionIndex={item.questionIndex}
        />
      ))}
    </section>
  );
};

export default LogicListDisplay;
