import React from "react";
import { AvailableQuestionListFlatArrayProps } from "../../../../../Utils/dataTypes";
import { useAppStateMgtContext } from "../../../../../Utils/AppContext";
import { useBuilderPageFxns } from "../../../../../Utils/useBuilderPageFxns";

const useAvailableQuestionsAfterSelected = (
  selectedQuestionIndex: number
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
            availableQuestionArrayIndex: questions.length
        });
      });
    });

    return questions;
  }, [surveyData, getQuestionNumber]);
    
  const updatedQuestions = React.useMemo(() => {
    return flatSortedQuestions.filter(
      (question, index) => index > selectedQuestionIndex
      // {
      //   const currentIndex = question.questionSectionIndexNumber * surveyData.sections.length + question.questionItemIndexNumber;
      //   return currentIndex > selectedQuestionIndex;
      // }
    );
  }, [flatSortedQuestions, selectedQuestionIndex]);

  return updatedQuestions;
};

export default useAvailableQuestionsAfterSelected;
