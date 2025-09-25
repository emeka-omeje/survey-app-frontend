import React from "react";
import { useAppStateMgtContext } from "./AppContext";
import {
  LogicCondition,
  AvailableQuestionListFlatArrayProps,
  QuestionFrameProps,
  conditionStatementObjectArrayProps,
} from "./dataTypes";

const useLogicHandleFxns = () => {
  const {
    logicIfQuestion,
    logicConditionStatement,
    logicConditionValue,
    logicActionStatement,
    logicThenQuestion,
    setSections,
    setLogicIfQuestion,
    setLogicConditionStatement,
    setLogicConditionValue,
    setLogicActionStatement,
    setLogicThenQuestion,
    setIsDropDownCardOpen,
  } = useAppStateMgtContext();

  // Function to set the logic for a specific question frame
  const setQuestionLogic = React.useCallback(
    (
      sectionId: string,
      questionId: string,
      logicConditions: LogicCondition
    ) => {
      setSections((prev) =>
        prev.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                questionFrames: section.questionFrames.map((questionFrame) =>
                  questionFrame.id === questionId
                    ? {
                        ...questionFrame,
                        logic: [
                          ...(questionFrame.logic ?? []),
                          logicConditions,
                        ],
                      }
                    : questionFrame
                ),
              }
            : section
        )
      );
      console.log("setQuestionLogic", logicConditions);
    },
    [setSections]
  );

  // Compiled the Logic Setting Props
  const compileLogicCondition = (): LogicCondition | null => {
    if (
      !logicIfQuestion ||
      !logicConditionStatement ||
      !logicConditionValue ||
      !logicActionStatement ||
      !logicThenQuestion
    ) {
      return null;
    }
    return {
      id: `logic-${crypto.randomUUID()}`,
      questionId: logicIfQuestion.questionFrame.id,
      operator: logicConditionStatement.value,
      value: logicConditionValue,
      logicAction: [
        {
          logicActionId: `${logicIfQuestion.questionFrame.id}_${logicThenQuestion.questionFrame.id}`,
          actionType: logicActionStatement.value,
          targetQuestionId: logicThenQuestion.questionFrame.id,
          targetSectionId: logicThenQuestion.ownSectionProps.sectionId,
        },
      ],
    };
  };

  const handleLogicCompilation = () => {
    const compiledLogic = compileLogicCondition();
    if (!compiledLogic) {
      console.error("Incomplete logic fields. Cannot compile logic.");
      throw new Error("Incomplete logic fields. Cannot compile logic.");
    }

    try {
      setQuestionLogic(
        logicIfQuestion!.ownSectionProps.sectionId,
        logicIfQuestion!.questionFrame.id,
        compiledLogic
      );
      console.log("handleLogicCompilation", compiledLogic);
    } catch (error) {
      console.error("Error setting question logic:", error);
      throw error;
    }
  };

  const handleSetQuestionLogic = () => {
    try {
      if (
        !logicIfQuestion ||
        !logicConditionStatement ||
        logicConditionValue === null ||
        !logicActionStatement ||
        !logicThenQuestion
      ) {
        alert("Please complete all logic fields before saving.");
        console.log("Incomplete logic fields:", {
          logicIfQuestion,
          logicConditionStatement,
          logicConditionValue,
          logicActionStatement,
          logicThenQuestion,
        });
        return;
      }
      handleLogicCompilation();
      setLogicIfQuestion(null);
      setLogicConditionStatement(null);
      setLogicConditionValue(null);
      setLogicActionStatement(null);
      setLogicThenQuestion(null);
      // setHydrated(true);
      console.log(
        "handleSetQuestionLogic: Logic compiled and set successfully"
      );
    } catch (error) {
      console.error("Error compiling logic:", error);
      throw error;
    }
    setIsDropDownCardOpen(false);
  };

  // Delete a logic condition (rule) from a specific question frame
  const deleteSkipLogicRule = React.useCallback(
    (sectionId: string, questionId: string, conditionId: string) => {
      setSections((prevSections) =>
        prevSections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                questionFrames: section.questionFrames.map((questionFrame) =>
                  questionFrame.id === questionId
                    ? {
                        ...questionFrame,
                        logic: (questionFrame.logic ?? []).filter(
                          (lc) => lc.id !== conditionId
                        ),
                      }
                    : questionFrame
                ),
              }
            : section
        )
      );
      console.log("deleteSkipLogicRule", {
        sectionId,
        questionId,
        conditionId,
      });
    },
    [setSections]
  );

  // Prepare existing logic condition for editing by populating shared logic state
  const initiateEditSkipLogicRule = React.useCallback(
    (sectionId: string, questionId: string, conditionId: string) => {
      setSections((currentSections) => {
        let foundCondition: LogicCondition | null = null;
        let foundSectionIndex = -1;
        let foundQuestionIndex = -1;
        let foundQuestionFrame: QuestionFrameProps | null = null;

        for (let s = 0; s < currentSections.length; s++) {
          const sec = currentSections[s];
          const qIndex = sec.questionFrames.findIndex(
            (qf) => qf.id === questionId && sec.id === sectionId
          );
          if (qIndex !== -1) {
            foundSectionIndex = s;
            foundQuestionIndex = qIndex;
            foundQuestionFrame = sec.questionFrames[qIndex];
            if (foundQuestionFrame.logic) {
              const cond = foundQuestionFrame.logic.find(
                (c) => c.id === conditionId
              );
              if (cond) foundCondition = cond;
            }
            break;
          }
        }

        if (
          !foundCondition ||
          !foundQuestionFrame ||
          foundSectionIndex === -1 ||
          foundQuestionIndex === -1
        ) {
          console.error(
            "initiateEditSkipLogicRule: condition or question not found",
            { sectionId, questionId, conditionId }
          );
          return currentSections;
        }

        // helper to build question-number string
        const getQuestionNumberLocal = (
          sectionIndex: number,
          itemIndex: number,
          totalSections: number
        ) =>
          totalSections === 1
            ? `Q${itemIndex + 1}`
            : `Q${sectionIndex + 1}.${itemIndex + 1}`;

        const ifQuestionWrapper: AvailableQuestionListFlatArrayProps = {
          questionFrame: foundQuestionFrame,
          ownSectionProps: {
            sectionId: currentSections[foundSectionIndex].id,
            sectionTitle: currentSections[foundSectionIndex].title,
          },
          questionSectionIndexNumber: foundSectionIndex,
          questionItemIndexNumber: foundQuestionIndex,
          questionNumber: getQuestionNumberLocal(
            foundSectionIndex,
            foundQuestionIndex,
            currentSections.length
          ),
          availableQuestionArrayIndex: 0,
        };

        // Pre-fill logicAction target (take first action if present)
        let thenQuestionWrapper: AvailableQuestionListFlatArrayProps | null =
          null;
        if (
          foundCondition.logicAction &&
          foundCondition.logicAction.length > 0
        ) {
          const firstAction = foundCondition.logicAction[0];
          for (let s = 0; s < currentSections.length; s++) {
            const sec = currentSections[s];
            const qIndex = sec.questionFrames.findIndex(
              (qf) => qf.id === firstAction.targetQuestionId
            );
            if (qIndex !== -1) {
              thenQuestionWrapper = {
                questionFrame: sec.questionFrames[qIndex],
                ownSectionProps: { sectionId: sec.id, sectionTitle: sec.title },
                questionSectionIndexNumber: s,
                questionItemIndexNumber: qIndex,
                questionNumber: getQuestionNumberLocal(
                  s,
                  qIndex,
                  currentSections.length
                ),
                availableQuestionArrayIndex: 0,
              };
              break;
            }
          }
        }

        try {
          setLogicIfQuestion(ifQuestionWrapper);
          setLogicConditionStatement({
            label: foundCondition.operator,
            value: foundCondition.operator,
          });
          setLogicConditionValue(
            foundCondition.value as unknown as
              | conditionStatementObjectArrayProps
              | string
              | number
          );
          if (
            foundCondition.logicAction &&
            foundCondition.logicAction.length > 0
          ) {
            const firstAction = foundCondition.logicAction[0];
            setLogicActionStatement({
              label: firstAction.actionType,
              value: firstAction.actionType,
            });
            if (thenQuestionWrapper) setLogicThenQuestion(thenQuestionWrapper);
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
    handleLogicCompilation,
    setQuestionLogic,
    handleSetQuestionLogic,
    deleteSkipLogicRule,
    initiateEditSkipLogicRule,
  };
};

export default useLogicHandleFxns;
