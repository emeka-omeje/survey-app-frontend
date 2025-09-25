import { AvailableQuestionListFlatArrayProps } from "../../../../../Utils/dataTypes";
import { useAppStateMgtContext } from "../../../../../Utils/AppContext";
import { useBuilderPageFxns } from "../../../../../Utils/useBuilderPageFxns";

const AvailableQuestionListFlatArray =
  (): AvailableQuestionListFlatArrayProps[] => {
    const { surveyData } = useAppStateMgtContext();
    const { getQuestionNumber } = useBuilderPageFxns();
    // Flatten the survey data into a flat array of questions with their section info
    const flatSortedQuestions: AvailableQuestionListFlatArrayProps[] = [];

    surveyData.sections.forEach((section, sectionIndex) => {
      section.questionFrames.forEach((questionFrame, questionIndex) => {
        flatSortedQuestions.push({
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
          availableQuestionArrayIndex: flatSortedQuestions.length,
        });
      });
    });

    return flatSortedQuestions;
  };

export default AvailableQuestionListFlatArray;
