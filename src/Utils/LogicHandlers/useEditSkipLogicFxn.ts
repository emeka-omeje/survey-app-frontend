import React from "react";
import {
  sectionTypeProps,
  QuestionFrameProps,
  LogicCondition,
  AvailableQuestionListFlatArrayProps,
  conditionStatementObjectArrayProps,
} from "../dataTypes";
import { useAppStateMgtContext } from "../AppContext";
import { renderConditionAction, renderConditionLabel } from "../../Components/SurveysComponents/LogicPageComponents/LogicTypeDisplayComponents/SkipBranchComponents/ConditionalObject_ArrayStatments";

const useEditSkipLogicFxn = () => {
  const {
    // logicIfQuestion,
    // logicConditionStatement,
    // logicConditionValue,
    // logicActionStatement,
    // logicThenQuestion,
    setSections,
    setLogicIfQuestion,
    setLogicConditionStatement,
    setLogicConditionValue,
    setLogicActionStatement,
    setLogicThenQuestion,
    setIsDropDownCardOpen,
  } = useAppStateMgtContext();

  // Helper function to find a question by ID in the sections
  const findQuestionById = (
    questionId: string,
    sectionId: string,
    sections: sectionTypeProps
  ) => {
    for (let s = 0; s < sections.length; s++) {
      const sec = sections[s];
      const questionIndex = sec.questionFrames.findIndex(
        (qf: QuestionFrameProps) => qf.id === questionId && sec.id === sectionId
      );
      if (questionIndex !== -1) {
        return {
          sectionIndex: s,
          questionIndex,
          questionFrame: sec.questionFrames[questionIndex],
        };
      }
    }
    return null;
  };

  // Helper function to find a condition by ID within a question
  const findConditionById = (
    questionFrame: QuestionFrameProps,
    conditionId: string
  ) => {
    return (
      questionFrame.logic?.find(
        (cond: LogicCondition) => cond.id === conditionId
      ) || null
    );
  };

  // Optimized function to handle the initiation of editing skip logic rule
  const initiateEditSkipLogicRule = React.useCallback(
    (sectionId: string, questionId: string, conditionId: string) => {
      setSections((currentSections) => {
        // Finding the question and condition
        const questionData = findQuestionById(
          questionId,
          sectionId,
          currentSections
        );
        if (!questionData) {
          console.error("Error: Question not found", {
            sectionId,
            questionId,
            conditionId,
          });
          return currentSections;
        }
        const { sectionIndex, questionIndex, questionFrame } = questionData;

        const condition = findConditionById(questionFrame, conditionId);
        if (!condition) {
          console.error("Error: Condition not found", {
            sectionId,
            questionId,
            conditionId,
          });
          return currentSections;
        }

        // Helper function to generate question number
        const getQuestionNumberLocal = (
          sectionIndex: number,
          questionIndex: number,
          totalSections: number
        ) =>
          totalSections === 1
            ? `Q${questionIndex + 1}`
            : `Q${sectionIndex + 1}.${questionIndex + 1}`;

        const ifQuestionWrapper: AvailableQuestionListFlatArrayProps = {
          questionFrame,
          ownSectionProps: {
            sectionId: currentSections[sectionIndex].id,
            sectionTitle: currentSections[sectionIndex].title,
          },
          questionSectionIndexNumber: sectionIndex,
          questionItemIndexNumber: questionIndex,
          questionNumber: getQuestionNumberLocal(
            sectionIndex,
            questionIndex,
            currentSections.length
          ),
          availableQuestionArrayIndex: 0,
        };

        // Find the first action if available
        const firstAction = condition.logicAction?.[0];
        let thenQuestionWrapper: AvailableQuestionListFlatArrayProps | null =
          null;
        if (firstAction) {
          const targetQuestionData = findQuestionById(
            firstAction.targetQuestionId,
            sectionId,
            currentSections
          );
          if (targetQuestionData) {
            const {
              sectionIndex: targetSectionIndex,
              questionIndex: targetQuestionIndex,
              questionFrame: targetQuestionFrame,
            } = targetQuestionData;
            thenQuestionWrapper = {
              questionFrame: targetQuestionFrame,
              ownSectionProps: {
                sectionId: currentSections[targetSectionIndex].id,
                sectionTitle: currentSections[targetSectionIndex].title,
              },
              questionSectionIndexNumber: targetSectionIndex,
              questionItemIndexNumber: targetQuestionIndex,
              questionNumber: getQuestionNumberLocal(
                targetSectionIndex,
                targetQuestionIndex,
                currentSections.length
              ),
              availableQuestionArrayIndex: 0,
            };
          }
        }

        // Batch the state updates
        try {
          setLogicIfQuestion(ifQuestionWrapper);
          setLogicConditionStatement({
            label: renderConditionLabel(condition.operator),
            value: condition.operator,
          });
          setLogicConditionValue(
            condition.value as unknown as
              | conditionStatementObjectArrayProps
              | string
              | number
          );
          if (firstAction) {
            setLogicActionStatement({
              label: renderConditionAction(firstAction.actionType),
              value: firstAction.actionType,
            });
            if (thenQuestionWrapper) {
              setLogicThenQuestion(thenQuestionWrapper);
            }
          } else {
            setLogicActionStatement(null);
            setLogicThenQuestion(null);
          }
          setIsDropDownCardOpen(true);
        } catch (err) {
          console.error("Error initiating edit for skip logic", err);
        }

        return currentSections;
      });
    },
    [
      setSections,
      setLogicIfQuestion,
      setLogicConditionStatement,
      setLogicConditionValue,
      setLogicActionStatement,
      setLogicThenQuestion,
      setIsDropDownCardOpen,
    ]
  );

  return {
    initiateEditSkipLogicRule,
  };
};

export default useEditSkipLogicFxn;
