import React from "react";
import {
  QuestionFrameProps,
  sectionTypeProps,
  surveyTypeProps,
} from "./dataTypes";
import {
  QuestionTypeSelectList,
  questionTypeSelectListArray,
} from "../Components/SurveysComponents/builderPageComponents/QuestionComponents/questionTypeSelectListArray";

export const useAppStateMgtHook = () => {
  const [createNavBTNLabel, setCreateNavBTNLabel] =
    React.useState<string>("Builder");
  const [frameCall, setFrameCall] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [publishingStatus, setPublishingStatus] = React.useState<
    "Idle" | "Publishing" | "Published" | "Error" | "Offline"
  >("Idle");

  // Below Survey Data States
  // This sets up the empty question frame with the first question type from the list
  const createEmptyQuestion = (
    props: QuestionTypeSelectList[]
  ): QuestionFrameProps => ({
    id: crypto.randomUUID(),
    questionText: "",
    assignedPoint: 0,
    questionTypeValue: props[0].value,
    questionTypeLabel: props[0].label,
    questionTypeIcon: props[0].icon,
  });

  // This sets up the section state to hold the sections and their questions
  const [sections, setSections] = React.useState<sectionTypeProps>([
    {
      id: crypto.randomUUID(),
      title: "Section 1",
      questionFrames: [createEmptyQuestion(questionTypeSelectListArray)],
    },
  ]);

  // The surveyID is generated using crypto.randomUUID() to ensure uniqueness
  const [currentSurveyID] = React.useState<string>(() => {
    return localStorage.getItem("currentSurveyID") ?? crypto.randomUUID();
  });

  // The state for the title of the survey
  const [surveyTitle, setSurveyTitle] = React.useState<string>("");

  // Initialising the survey data
  const [surveyData, setSurveyData] = React.useState<surveyTypeProps>({
    id: currentSurveyID,
    title: surveyTitle || "New survey",
    sections: sections,
    modifiedAt: new Date().toISOString(),
    // updatedAt: "",
    // queuedAt: "",
    // draftedAt: "",
    // isPublished: false,
    // isDraft: false,
    isDirty: false,
    status: "idle",
  });

  return {
    createNavBTNLabel,
    setCreateNavBTNLabel,
    frameCall,
    setFrameCall,
    isOpen,
    setIsOpen,
    publishingStatus,
    setPublishingStatus,
    surveyTitle,
    setSurveyTitle,
    surveyData,
    setSurveyData,
    createEmptyQuestion,
    sections,
    setSections,
    currentSurveyID,
  };
};
