// import { IconType } from "react-icons";
import { DraggableAttributes } from "@dnd-kit/core";
import { IconName } from "../Components/SurveysComponents/builderPageComponents/QuestionComponents/questionTypeSelectListArray";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

// Interface for APP Contexts
export interface AppContextProps {
  createNavBTNLabel: string;
  setCreateNavBTNLabel: React.Dispatch<React.SetStateAction<string>>;
  frameCall: boolean;
  setFrameCall: React.Dispatch<React.SetStateAction<boolean>>;
  isDropDownCardOpen: boolean;
  setIsDropDownCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  currentSurveyID: string;
  isNetworkConnected: boolean;
  accountUser: string | null;
  setAccountUser: React.Dispatch<React.SetStateAction<string | null>>;
  surveyCreator: string | null;
  setSurveyCreator: React.Dispatch<React.SetStateAction<string | null>>;
  hydrated: boolean;
  setHydrated: React.Dispatch<React.SetStateAction<boolean>>;
  logicNavBTNLabel: string;
  setLogicNavBTNLabel: React.Dispatch<React.SetStateAction<string>>;
  logicIfQuestion: string | null;
  setLogicIfQuestion: React.Dispatch<React.SetStateAction<string | null>>;
  logicConditionStatement: string | null;
  setLogicConditionStatement: React.Dispatch<React.SetStateAction<string | null>>;
  logicConditionValue: string | number | boolean | null;
  setLogicConditionValue: React.Dispatch<React.SetStateAction<string | number | boolean | null>>;
}

// export type QuestionTypeSelectList = {
//   value: string;
//   label: string;
//   icon: IconType | null;
// };
export type QuestionTypeSelectList = {
  value: string;
  label: string;
  icon: IconName | null;
};

// This defines the structure of a survey section & question frames
export type QuestionFrameProps = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  questionText: string;
  assignedPoint: number; // Optional property for assigned number
  questionTypeValue: string;
  questionTypeLabel: string;
  questionTypeIcon: IconName | null;
  required: boolean;
  logic?: LogicCondition[];
};

export type sectionTypeProps = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  title: string;
  questionFrames: QuestionFrameProps[];
}[];

// QuestionFrameComponentProps defines the props for QuestionFrame component
// Used: QuestionFrame.tsx
export type QuestionFrameComponentProps = {
  sectionId: string;
  questionType: QuestionFrameProps;
  onRemoveQuestionFrame: (sectionId: string, questionId: string) => void;
  dragHandleProps: DragHandleProps;
  itemIndex: number;
  sectionIndex: number;
  totalSections: number;
};

// QuestionFooterPropsType defines the props for QuestionFooter component
// Used: QuestionFooter.tsx
export type QuestionFooterPropsType = {
  sectionId: string;
  questionId: string;
  onRemoveQuestionFrame: (sectionId: string, questionId: string) => void;
  dragHandleProps: DragHandleProps;
  itemIndex: number;
  sectionIndex: number;
  totalSections: number;
};

// Logic Rule Props Types
export type LogicCondition = {
  id: string; // unique id for this condition
  questionId: QuestionFrameProps["id"]; // which question it targets
  operator: "equals" | "not_equals" | "greater_than" | "less_than" | "includes";
  value: string | number | boolean;
  logicAction: LogicAction[]
};
export type LogicAction = {
  type: "show" | "hide" | "skip_to" | "end_survey";
  targetSectionId?: string;
  targetQuestionId?: string;
};
// export type QuestionLogic = {
//   conditions: LogicCondition[];
//   actions: LogicAction[];
// };

// This defines the structure of a survey draft
export type surveyTypeProps = {
  id: string;
  title: string;
  sections: sectionTypeProps;
  modifiedAt: string;
  isDirty: boolean;
  status: "idle"
    | "draft"
    | "in-progress"
    | "enqueue"
    | "published"
    | "conflict"
    | "offline";
  accountUser?: string | null; // Property for account user
  surveyCreator?: string | null; // Optional property for survey creator
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

// Interface for Sortable List Abstract Component Props
export type SortableListProps<T> = {
  items: T[];
  getId: (item: T) => string;
  onReorder: (newItems: T[]) => void;
  renderItem: (
    item: T,
    index: number,
    dragHandleProps: DragHandleProps
  ) => React.ReactNode;
};

// Interface for Drag Handle Props for Sortable List
export type DragHandleProps =  {
  attributes: DraggableAttributes;
  listeners?: SyntheticListenerMap;
}

export type LogicTypeSelectProps = {
  logicTypeSelectArray: string[];
}

// export type getQuestionNumberProps = {
//   sectionIndex: number;
//   itemIndex: number;
//   totalSections: number;
// }


// Interface for AvailableQuestionListFlatArray
// This is used in AvailableQuestionListFlatArray.tsx
export type AvailableQuestionListFlatArrayProps = {
  questionFrame: QuestionFrameProps;
  ownSectionProps: {
    sectionId: string;
    sectionTitle: string;
  };
  questionSectionIndexNumber: number;
  // questionSectionID: string;
  // questionID: string;
  questionItemIndexNumber: number;
  questionNumber: string;
}

