import React from "react";
import styles from "./skip_branch.module.css";
import SkipBranchRuleCard from "./Skip_Branch_RuleCard";
// import { useAppStateMgtContext } from "../../../../../Utils/AppContext";
// import { QuestionFrameProps } from "../../../../../Utils/dataTypes";
// import { useBuilderPageFxns } from "../../../../../Utils/useBuilderPageFxns";
import useQuestionsWithLogicFxn from "./QuestionWithLogic_fxn";

const SkipBranchListDisplay: React.FC = () => {
  // const { sections } = useAppStateMgtContext();
  // const { getQuestionNumber } = useBuilderPageFxns();
  const questionsWithLogic = useQuestionsWithLogicFxn();

  // Build a flat list of questions that have logic defined

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
        <SkipBranchRuleCard
          key={item.question.id}
          sectionTitle={item.sectionTitle}
          sectionId={item.sectionID}
          question={item.question}
          ifQuestionNumber={item.ifQuestionNumber}
          thenQuestionNumberMap={item.thenQuestionNumberMap}
        />
      ))}
    </section>
  );
};

export default SkipBranchListDisplay;
