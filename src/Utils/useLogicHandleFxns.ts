import React from "react";
import { useAppStateMgtContext } from "./AppContext";
import { LogicCondition } from "./dataTypes";

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
    []
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
          targetSectionId: logicThenQuestion.questionFrame.id,
          targetQuestionId: logicThenQuestion.ownSectionProps.sectionId,
        },
      ],
    };
  };

  const handleLogicCompilation = () => {
    const compiledLogic = compileLogicCondition();
      if (!compiledLogic) {
        console.error("Incomplete logic fields. Cannot compile logic.");
        throw new Error("Incomplete logic fields. Cannot compile logic.");
    };

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
          logicThenQuestion
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
      console.log("handleSetQuestionLogic: Logic compiled and set successfully");
    } catch (error) {
      console.error("Error compiling logic:", error);
      throw error;
    }
    setIsDropDownCardOpen(false);
  };


  return {
    handleLogicCompilation,
    setQuestionLogic,
    handleSetQuestionLogic
  };
};

export default useLogicHandleFxns;
