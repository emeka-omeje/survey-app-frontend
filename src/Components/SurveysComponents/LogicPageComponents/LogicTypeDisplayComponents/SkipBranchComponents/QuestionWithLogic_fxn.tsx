import React from "react";
// import styles from "./skip_branch.module.css";
// import SkipBranchRuleCard from "./Skip_Branch_RuleCard";
import { useAppStateMgtContext } from "../../../../../Utils/AppContext";
import { questionsWithLogicFxnType, thenQuestionStringProps } from "../../../../../Utils/dataTypes";
import { useBuilderPageFxns } from "../../../../../Utils/useBuilderPageFxns";

// Build a flat list of questions that have logic defined
const useQuestionsWithLogicFxn = () => {
  const { sections } = useAppStateMgtContext();
  const { getQuestionNumber } = useBuilderPageFxns();

    // Map question ids to their section and question indexes for faster lookups
  const questionMapIds = React.useMemo(() => {
    const mapState: Record<string, { sectionIndex: number; questionIndex: number }> = {};
    sections.forEach((section, sectionIndex) => {
      section.questionFrames.forEach((qf, questionIndex) => {
        mapState[qf.id] = { sectionIndex, questionIndex };
      });
    });
    return mapState;
  }, [sections]);

  const questionWithLogic = React.useMemo(() => {
    const result: questionsWithLogicFxnType[] = [];

    sections.forEach((section, sectionIndex) => {
      section.questionFrames.forEach((questionFrame, questionIndex) => {
        if(questionFrame.logic && questionFrame.logic.length > 0) {

          // Build a map of target question ids -> their question-number string
          const thenNumberMap: Record<string, thenQuestionStringProps> = {};

          questionFrame.logic.forEach((logicCondition) => {
            logicCondition.logicAction?.forEach((eachLogicAction) => {
              const targetId = eachLogicAction.targetQuestionId;
              if (targetId && !(targetId in thenNumberMap)) {
                const targetQuestionIds = questionMapIds[targetId];
                if (targetQuestionIds) { 
                  thenNumberMap[targetId] = {
                    thenQuestionNumber: getQuestionNumber(
                      targetQuestionIds.sectionIndex,
                      targetQuestionIds.questionIndex,
                      sections.length
                    ),
                    thenQuestionId: targetId,
                  };
                }
              }
            });
          });

          const ifQuestionNumber = getQuestionNumber(
            sectionIndex,
            questionIndex,
            sections.length
          );

          result.push({
            sectionTitle: section.title,
            sectionID: section.id,
            question: questionFrame,
            questionIndex: questionIndex,
            ifQuestionNumber,
            thenQuestionNumberMap: thenNumberMap,
          });
        }
      });
    });

    return result;
  }, [sections, getQuestionNumber, questionMapIds]);

  return questionWithLogic;
};

export default useQuestionsWithLogicFxn;
