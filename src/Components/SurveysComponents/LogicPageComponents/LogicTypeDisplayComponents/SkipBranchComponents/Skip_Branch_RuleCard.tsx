import React from "react";
import styles from "./skip_branch.module.css";
import {
  QuestionFrameProps,
  LogicCondition,
  LogicAction,
  thenQuestionStringProps,
} from "../../../../../Utils/dataTypes";
import { renderConditionLabel } from "./ConditionalObject_ArrayStatments";
import LogicActionItemDisplay from "./LogicActionItemDisplay";
import SkipBranchEditDeleteBTN from "./SkipBranch_EditDelete";

// A compact utility to render the value of a logic condition
const renderConditionValue = (
  value: LogicCondition["value"] | undefined
): string => {
  if (value === null || value === undefined) return "(no value)";
  if (typeof value === "object" && "label" in value) return value.label;
  return String(value);
};

// Represents a single rule block for a question that has logic
const SkipBranchRuleCard: React.FC<{
  sectionTitle: string;
  sectionId: string;
  question: QuestionFrameProps;
  ifQuestionNumber: string;
  thenQuestionNumberMap?: Record<string, thenQuestionStringProps>;
}> = ({
  sectionTitle,
  sectionId,
  question,
  ifQuestionNumber,
  thenQuestionNumberMap,
}) => {
  const logic: LogicCondition[] = question.logic ?? [];

  return (
    <article
      className={styles.logicList_item}
      aria-label={`Logic for ${ifQuestionNumber}`}
    >
      <header className={styles.logicList_itemHeader}>
        {/* <div className={styles.logicList_titleWrap}> */}
        <h2 className={styles.logicList_questionTitle}>
          {`${ifQuestionNumber}: ${
            question.questionText || "Untitled question"
          }`}
        </h2>
        <p className={styles.logicList_sectionTag}>{sectionTitle}</p>
        {/* </div> */}
      </header>

      <div className={styles.logicList_body}>
        {logic.map((questionConditionProp: LogicCondition, idx: number) => (
          <div key={idx} className={styles.logicList_conditionRow}>
            <p className={styles.logicList_conditionLabel}>If</p>
            {/* <div className={styles.logicList_conditionDetail}> */}
            <p className={styles.logicList_conditionValue}>
              {renderConditionLabel(questionConditionProp.operator)}
            </p>
            <p>
              condition{" "}
              {questionConditionProp.operator === "includes" ? "contain" : "is"}
            </p>
            <p className={styles.logicList_conditionValue}>
              {renderConditionValue(questionConditionProp.value)}
            </p>
            {/* </div> */}

            {/* <div className={styles.logicList_actionList}> */}
            <p>then</p>
            {questionConditionProp.logicAction &&
            questionConditionProp.logicAction.length > 0 ? (
              questionConditionProp.logicAction.map(
                (questionAction: LogicAction, aIdx: number) => {
                  const questionNumberForTarget =
                    questionAction.targetQuestionId &&
                    thenQuestionNumberMap &&
                    questionAction.targetQuestionId in thenQuestionNumberMap
                      ? thenQuestionNumberMap[questionAction.targetQuestionId]
                          .thenQuestionNumber
                      : "";
                  return (
                    <LogicActionItemDisplay
                      key={aIdx}
                      questionAction={questionAction}
                      questionNumberForTarget={questionNumberForTarget}
                    />
                  );
                }
              )
            ) : (
              <div className={styles.logicList_actionPlaceholder}>
                No action
              </div>
            )}
            {/* </div> */}
            {/* Row-level action buttons (hidden by default, shown on hover) */}
            <div className={styles.logicList_rowActions}>
              <SkipBranchEditDeleteBTN
                buttonLabel={"Edit"}
                sectionId={sectionId}
                questionId={question.id}
                conditionId={questionConditionProp.id}
              />
              <SkipBranchEditDeleteBTN
                buttonLabel={"Delete"}
                sectionId={sectionId}
                questionId={question.id}
                conditionId={questionConditionProp.id}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default SkipBranchRuleCard;
