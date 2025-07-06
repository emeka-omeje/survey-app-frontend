import React from "react";
import style from "./createSurveyPages.module.css";
import BuilderContentHeader from "../../Components/SurveysComponents/builderPageComponents/BuilderContentHeader";
import BuilderContentBody from "../../Components/SurveysComponents/builderPageComponents/BuilderContentBody";
import {questionTypeSelectListArray } from "../../Components/SurveysComponents/builderPageComponents/QuestionComponents/questionTypeSelectListArray";
import { sectionTypeProps, QuestionTypeSelectList } from "../../Utils/dataTypes";
import { useAppContext } from "../../Utils/AppContext";
// import { getSurveyDrafts } from "../../Utils/indexDBStorage";
// import { useAppContext } from "../../Utils/AppContext";

const BuilderPage = () => {
  const normalizeSectionTitles = (sectionsArray: sectionTypeProps) => {
    return sectionsArray.map((section, index) => ({
      ...section,
      title: `Section ${index + 1}`,
    }));
  };

  const {sections, setSections, createEmptyQuestion} = useAppContext()

  // // Function to handle an empty section and default question object
  // const createEmptyQuestion = (props: QuestionTypeSelectList[]): QuestionFrameProps => ({
  //   id: crypto.randomUUID(),
  //   questionText: "",
  //   assignedPoint: 0, // Default assigned point
  //   questionTypeValue: props[0].value, // as default question type
  //   questionTypeLabel: props[0].label,
  //   questionTypeIcon: props[0].icon,
  // });
  // // Section state to hold the sections and their questions
  // const [sections, setSections] = React.useState<sectionTypeProps>([
  //   {
  //     id: crypto.randomUUID(),
  //     title: "Section 1",
  //     questionFrames: [createEmptyQuestion(questionTypeSelectListArray)],
  //   },
  // ]);

  const addSection = (props: QuestionTypeSelectList[]) => {
    const newSection = {
      id: crypto.randomUUID(),
      title: `Section ${sections.length + 1}`,
      questionFrames: [createEmptyQuestion(props)],
    };

    setSections((prev) => normalizeSectionTitles([...prev, newSection]));
  };
  const deleteSection = (sectionId: string) => {
    if (sections.length === 1) return; // Prevent deleting the last section

    const updated = sections.filter((section) => section.id !== sectionId);
    setSections(normalizeSectionTitles(updated));
  };
  const addQuestionFrameToSection = (sectionId: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              questionFrames: [
                ...section.questionFrames,
                createEmptyQuestion(questionTypeSelectListArray),
              ],
            }
          : section
      )
    );
  };
  const addQuestionFrameToLastSection = () => {
    if (sections.length === 0) return;

    const lastSectionId = sections[sections.length - 1].id;
    addQuestionFrameToSection(lastSectionId);
  };
  const chooseDiffQuestionType = (
    sectionId: string,
    questionId: string,
    selectedType: QuestionTypeSelectList
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
                      questionTypeValue: selectedType.value,
                      questionTypeLabel: selectedType.label,
                      questionTypeIcon: selectedType.icon,
                    }
                  : questionFrame
              ),
            }
          : section
      )
    );
  };

  const onRemoveQuestionFrame = (sectionId: string, questionId: string) => {
    setSections((prevSections) => {
      const sectionToUpdate = prevSections.find(
        (prevSection) => prevSection.id === sectionId
      );
      if (!sectionToUpdate) return prevSections;

      const isOnlyOneSection = prevSections.length === 1;
      const isOnlyOneQuestionFrame =
        sectionToUpdate.questionFrames.length === 1;

      // Case 1: Only 1 section and 1 question → do nothing
      if (isOnlyOneSection && isOnlyOneQuestionFrame) return prevSections;
      // Case 1: > 1 sectin but only 1 question → do nothing
      if (isOnlyOneQuestionFrame) {
        const filtered = prevSections.filter(
          (prevSection) => prevSection.id !== sectionId
        );
        return normalizeSectionTitles(filtered);
      }

      // Case 3: Just remove the question frame
      return prevSections.map((prevSection) =>
        prevSection.id === sectionId
          ? {
              ...prevSection,
              questionFrames: prevSection.questionFrames.filter(
                (questionFrame) => questionFrame.id !== questionId
              ),
            }
          : prevSection
      );
    });
  };

  // // Auto-save states & the managing functions
  // const [surveyTitle, setSurveyTitle] = React.useState<string>("");
  // const [surveyID, setSurveyID] = React.useState<string>(() => {
  //   return localStorage.getItem() ?? crypto.randomUUID()
  // });
  // const surveyID = crypto.randomUUID();

  // // Initializing the survey data with default values
  // const [surveyData, setSurveyData] = React.useState<surveyDraftTypeProps>({
  //   id: crypto.randomUUID(),
  //   title: surveyTitle || "New survey",
  //   sections: sections,
  //   createdAt: new Date().toISOString(),
  //   updatedAt: "",
  //   queuedAt: "",
  //   draftedAt: "",
  //   isPublished: false,
  //   isDraft: false,
  //   isDirty: false,
  // });
  // const [publishingStatus, setPublishingStatus] = React.useState<'Idle' | 'Publishing' | 'Published' | 'Error' | 'Offline'>('Idle');

  // React.useEffect(() => {
  //   const retrieveSurveyFromDraft = async () => {
  //     const draftSurvey = await getSurveyDrafts()
  //   }
  // }, [])

  return (
    <section className={style.builderPage_wrapper}>
      <section className={style.builderPage_header}>
        <BuilderContentHeader
          // onAddQuestion={addQuestionFrame}
          addSection={addSection}
          addQuestionFrameToSection={addQuestionFrameToSection}
          addQuestionFrameToLastSection={addQuestionFrameToLastSection}
        />
      </section>
      <BuilderContentBody
        addSection={addSection}
        addQuestionFrameToSection={addQuestionFrameToSection}
        chooseDiffQuestionType={chooseDiffQuestionType}
        onRemoveQuestionFrame={onRemoveQuestionFrame}
        deleteSection={deleteSection}
      />
    </section>
  );
};

export default BuilderPage;
