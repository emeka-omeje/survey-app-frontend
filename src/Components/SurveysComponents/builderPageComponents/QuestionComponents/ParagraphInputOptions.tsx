import React from "react";
import style from "./questionComponents.module.css";

type QuestionInputOptionsProps = {
  questionType: string;
};

const ParagraphInputOptions: React.FC<QuestionInputOptionsProps> = ({
  questionType,
}) => {
  return (
    <div className={style.questionInputOptions_main}>
      <p className={style.longShortAnswerText}>
        {questionType === "long-answer"
          ? "Long answer texts"
          : "Short answer texts"}
      </p>
    </div>
  );
};

export default ParagraphInputOptions;
