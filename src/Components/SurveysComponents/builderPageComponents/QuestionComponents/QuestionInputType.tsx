import React from "react";
import QuestionInputFrame from "./QuestionInputFrame";

type QuestionInputTypePropsType = {
  questionType: string;
};

const QuestionInputType: React.FC<QuestionInputTypePropsType> = ({
  questionType,
}) => {
  const questionInputRender = () => {
    switch (questionType) {
      case "multiple-choice":
        return (
          <QuestionInputFrame
            questionType={questionType}
          />
        );
      case "checkboxes":
        return <QuestionInputFrame questionType={questionType} />;
      case "dropdown":
        return <QuestionInputFrame questionType={questionType} />;
      case "short-answer":
        return <QuestionInputFrame questionType={questionType} />;
      case "paragraph":
        return <QuestionInputFrame questionType={questionType} />;
      case "rating":
        return <QuestionInputFrame questionType={questionType} />;
      case "date":
        return <QuestionInputFrame questionType={questionType} />;
      case "time":
        return <QuestionInputFrame questionType={questionType} />;
      case "file-upload":
        return <QuestionInputFrame questionType={questionType} />;
      default:
        return <QuestionInputFrame questionType={questionType} />;
    }
  };
  return <>{questionInputRender()}</>;
};

export default QuestionInputType;
