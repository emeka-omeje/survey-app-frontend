// import React from "react";
import { questionTypeSelectListArray } from "../Components/SurveysComponents/builderPageComponents/QuestionComponents/questionTypeSelectListArray";
import { useAppStateMgtContext } from "./AppContext";
import { QuestionTypeSelectList, sectionTypeProps } from "./dataTypes";

export const useBuilderPageFxns = () => {
  const { sections, setSections, createEmptyQuestion } =
    useAppStateMgtContext();

  const normalizeSectionTitles = (sectionsArray: sectionTypeProps) => {
    return sectionsArray.map((section, index) => ({
      ...section,
      title: `Section ${index + 1}`,
    }));
  };

  // Function to add a new section
  // It creates a new section with a unique ID and a default question frame.
  // The new section is added to the existing sections state.
  const addSection = (props: QuestionTypeSelectList[]) => {
    const newSection = {
      id: crypto.randomUUID(),
      title: `Section ${sections.length + 1}`,
      questionFrames: [createEmptyQuestion(props)],
    };

    setSections((prev) => normalizeSectionTitles([...prev, newSection]));
  };

  // Function to delete a section
  // It checks if there is more than one section before allowing deletion.
  // If there is only one section, it does nothing.
  // If there are multiple sections, it filters out the section with the specified ID.
  // It also normalizes the section titles after deletion.
  const deleteSection = (sectionId: string) => {
    if (sections.length === 1) return; // Prevent deleting the last section

    const updated = sections.filter((section) => section.id !== sectionId);
    setSections(normalizeSectionTitles(updated));
  };

  // Function to add a question frame to a specific section
  // It takes the section ID as a parameter and updates the state of sections.
  // It maps through the sections and finds the section with the matching ID.
  // Once found, it adds a new question frame to that section using the createEmptyQuestion
  // function, which creates a new question frame with default values.
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

  // Function to add a question frame to the last section
  // This is useful when the user wants to add a question to the last section without specifying
  // which section to add it to.
  // It checks if there are any sections available before proceeding.
  // If there are no sections, it does nothing.
  // If there are sections, it calls the addQuestionFrameToSection function with the last
  const addQuestionFrameToLastSection = () => {
    if (sections.length === 0) return;

    const lastSectionId = sections[sections.length - 1].id;
    addQuestionFrameToSection(lastSectionId);
  };

  // Function to change the question type of a specific question frame
  // It takes the section ID, question ID, and the selected question type as parameters.
  // It updates the state of sections by mapping through them and finding the specific question frame
  // that matches the provided section ID and question ID.
  // Once found, it updates the question type value, label, and icon with the selected
  // question type's properties.
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



  const handleQuestionRequiredChange = (
    isRequired: boolean,
    sectionId: string,
    questionId: string,
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
                    required: isRequired,
                    }
                  : questionFrame
              ),
            }
          : section
      )
    );
  };

  // Function to remove a question frame from a specific section
  // It takes the section ID and question ID as parameters.
  // It updates the state of sections by filtering out the question frame with the specified ID.
  // If the section has only one question frame, it checks if there are multiple sections.
  // If there is only one section with one question frame, it does nothing.
  // If there is only one question frame in a section, it removes the section entirely.
  // If there are multiple question frames, it simply removes the specified question frame.
  // It ensures that at least one section remains with at least one question frame.
  // It also normalizes the section titles after removing a question frame.
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

  return {
    addSection,
    deleteSection,
    addQuestionFrameToSection,
    addQuestionFrameToLastSection,
    chooseDiffQuestionType,
    onRemoveQuestionFrame,
    handleQuestionRequiredChange
  };
};
