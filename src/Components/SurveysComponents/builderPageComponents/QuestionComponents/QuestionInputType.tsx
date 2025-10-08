import React from "react";
import QuestionInputFrame from "./QuestionInputFrame";
import { QuestionFrameProps } from "../../../../Utils/dataTypes";

type QuestionInputTypePropsType = {
  questionType: string;
  questionFrame: QuestionFrameProps;
  sectionId: string;
};

const QuestionInputType: React.FC<QuestionInputTypePropsType> = ({
  questionType,
  questionFrame,
  sectionId,
}) => {
  const questionInputRender = () => {
    switch (questionType) {
      case "multiple-choice":
        return (
          <QuestionInputFrame
            questionType={questionType}
            questionFrame={questionFrame}
            sectionId={sectionId}
          />
        );
      case "checkboxes":
        return (
          <QuestionInputFrame
            questionType={questionType}
            questionFrame={questionFrame}
            sectionId={sectionId}
          />
        );
      case "dropdown":
        return (
          <QuestionInputFrame
            questionType={questionType}
            questionFrame={questionFrame}
            sectionId={sectionId}
          />
        );
      case "short-answer":
        return (
          <QuestionInputFrame
            questionType={questionType}
            questionFrame={questionFrame}
            sectionId={sectionId}
          />
        );
      case "paragraph":
        return (
          <QuestionInputFrame
            questionType={questionType}
            questionFrame={questionFrame}
            sectionId={sectionId}
          />
        );
      case "rating":
        return (
          <QuestionInputFrame
            questionType={questionType}
            questionFrame={questionFrame}
            sectionId={sectionId}
          />
        );
      case "date":
        return (
          <QuestionInputFrame
            questionType={questionType}
            questionFrame={questionFrame}
            sectionId={sectionId}
          />
        );
      case "time":
        return (
          <QuestionInputFrame
            questionType={questionType}
            questionFrame={questionFrame}
            sectionId={sectionId}
          />
        );
      case "file-upload":
        return (
          <QuestionInputFrame
            questionType={questionType}
            questionFrame={questionFrame}
            sectionId={sectionId}
          />
        );
      default:
        return (
          <QuestionInputFrame
            questionType={questionType}
            questionFrame={questionFrame}
            sectionId={sectionId}
          />
        );
    }
  };
  return <>{questionInputRender()}</>;
};

export default QuestionInputType;
