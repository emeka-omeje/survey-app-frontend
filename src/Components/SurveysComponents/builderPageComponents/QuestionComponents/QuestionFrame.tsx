import React from "react";
import QuestionTypeSelect from "./QuestionTypeSelect";
// import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import style from "./questionComponents.module.css";
// import { IconType } from "react-icons";
import QuestionInputType from "./QuestionInputType";
import QuestionFooter from "./QuestionFooter";
// import { QuestionTypeSelectList } from "./questionTypeSelectListArray";
import { QuestionFrameComponentProps } from "../../../../Utils/dataTypes";



const QuestionFrame: React.FC<QuestionFrameComponentProps> = ({
  sectionId,
  questionType,
  onRemoveQuestionFrame,
  dragHandleProps,
  itemIndex,
  sectionIndex,
  totalSections
}) => {
  // const [questionType, setQuestionType] =
  //   React.useState<QuestionTypeSelectProps>({
  //     value: "multiple-choice",
  //     label: "Multiple choice",
  //     icon: RiCheckboxBlankCircleFill,
  //   });

  return (
    <section className={style.questionFrame_wrapper}>
      <div className={style.questionFrame_main}>
        <QuestionInputType questionType={questionType.questionTypeValue} />
        <QuestionTypeSelect
          sectionId={sectionId}
          questionType={questionType}
          // chooseDiffQuestionType={chooseDiffQuestionType}
        />
      </div>
      <QuestionFooter
        sectionId={sectionId}
        questionId={questionType.id}
        onRemoveQuestionFrame={onRemoveQuestionFrame}
        dragHandleProps={dragHandleProps}
        itemIndex={itemIndex}
        sectionIndex={sectionIndex}
        totalSections={totalSections}
      />
    </section>
  );
};

export default QuestionFrame;
