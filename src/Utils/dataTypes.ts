import { IconType } from "react-icons";

// Interface for APP Contexts
export interface AppContextProps {
  createNavBTNLabel: string;
  setCreateNavBTNLabel: React.Dispatch<React.SetStateAction<string>>;
  frameCall: boolean;
  setFrameCall: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  publishingStatus: "Idle" | "Publishing" | "Published" | "Error" | "Offline";
  setPublishingStatus: React.Dispatch<
    React.SetStateAction<
      "Idle" | "Publishing" | "Published" | "Error" | "Offline"
    >
  >;
  surveyData: surveyTypeProps;
  setSurveyData: React.Dispatch<React.SetStateAction<surveyTypeProps>>;
  surveyTitle: string;
  setSurveyTitle: React.Dispatch<React.SetStateAction<string>>;
  createEmptyQuestion: (props: QuestionTypeSelectList[]) => QuestionFrameProps;
  sections: sectionTypeProps;
  setSections: React.Dispatch<React.SetStateAction<sectionTypeProps>>;
  currentSurveyID: string
}

export type QuestionTypeSelectList = {
  value: string;
  label: string;
  icon: IconType | null;
};

// This defines the structure of a survey section & question frames
export type QuestionFrameProps = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  questionText: string;
  assignedPoint?: number; // Optional property for assigned number
  questionTypeValue: string;
  questionTypeLabel: string;
  questionTypeIcon: IconType | null;
};

export type sectionTypeProps = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  title: string;
  questionFrames: QuestionFrameProps[];
}[];

// This defines the structure of a survey draft
export type surveyTypeProps = {
  id: string;
  title: string;
  sections: sectionTypeProps;
  modifiedAt: string;
  // createdAt: string;
  // updatedAt: string;
  // queuedAt: string;
  // draftedAt: string;
  // isPublished: boolean;
  // isDraft: boolean;
  isDirty: boolean;
  status: "idle" | "draft" | "in-progress" | "enqueue" | "published" | "conflict" | "offline";
};
// Type for AutoSaveHook Props
export type AutoDraftSaveHookProps = {
  data: surveyTypeProps;
  markClean: () => void;
  delay: number;
};

// Interface for the metadata of a draft survey
export interface DraftMetadata {
  id: string;
  title: string;
  updatedAt: string;
}
