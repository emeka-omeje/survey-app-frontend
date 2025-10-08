import React from "react";
import { AvailableQuestionListFlatArrayProps } from "../../../../../Utils/dataTypes";
import { useAppStateMgtContext } from "../../../../../Utils/AppContext";
import { useBuilderPageFxns } from "../../../../../Utils/useBuilderPageFxns";

const useAvailableQuestionsAfterSelected = (
  selectedQuestionId: string
): AvailableQuestionListFlatArrayProps[] => {
  const { surveyData } = useAppStateMgtContext();
  const { getQuestionNumber } = useBuilderPageFxns();

  const flatSortedQuestions = React.useMemo(() => {
    const questions: AvailableQuestionListFlatArrayProps[] = [];

    surveyData.sections.forEach((section, sectionIndex) => {
      section.questionFrames.forEach((questionFrame, questionIndex) => {
        questions.push({
          questionFrame,
          ownSectionProps: {
            sectionId: section.id,
            sectionTitle: section.title,
          },
          questionSectionIndexNumber: sectionIndex,
          questionItemIndexNumber: questionIndex,
          questionNumber: getQuestionNumber(
            sectionIndex,
            questionIndex,
            surveyData.sections.length
          ),
          availableQuestionArrayIndex: questions.length,
        });
      });
    });

    return questions;
  }, [surveyData, getQuestionNumber]);

  const updatedQuestions = React.useMemo(() => {
    if (!selectedQuestionId) return flatSortedQuestions;
    const selectedIndex = flatSortedQuestions.findIndex(
      (q) => q.questionFrame.id === selectedQuestionId
    );
    if (selectedIndex === -1) return flatSortedQuestions;
    return flatSortedQuestions.filter(
      (_question, index) => index > selectedIndex
    );
  }, [flatSortedQuestions, selectedQuestionId]);

  return updatedQuestions;
};

export default useAvailableQuestionsAfterSelected;
