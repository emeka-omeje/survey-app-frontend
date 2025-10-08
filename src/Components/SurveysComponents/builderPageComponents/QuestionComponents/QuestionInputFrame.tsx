import React from "react";
import style from "./questionComponents.module.css";
import { useAppStateMgtContext } from "../../../../Utils/AppContext";
import {
  QuestionFrameProps,
  QuestionInputFrameComponentProps,
  sectionTypeProps,
} from "../../../../Utils/dataTypes";
import MultipleChoiceInputOptions from "./MultipleChoiceInputOptions";
import CheckboxInputOptions from "./CheckboxInputOptions";
import DropDownInputOptions from "./DropDownInputOptions";
import ParagraphInputOptions from "./ParagraphInputOptions";
import RatingInputOptions from "./RatingOptionsContainer";
import DateTimeFileInputOption from "./DateTimeFileInputOption";

const QuestionInputFrame: React.FC<QuestionInputFrameComponentProps> = ({
  questionFrame,
  sectionId,
  questionType,
}) => {
  // Initially show only one option (Option 1)
  const [visibleOptions, setVisibleOptions] = React.useState(1);
  const [optionsNumberArray, setOptionsNumberArray] = React.useState([
    "Option 1",
  ]);

  // This is for CheckboxInputOptions
  const [selectedOptions, setSelectedOptions] = React.useState<number[]>([]);

  // This is for CheckboxInputOptions
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...optionsNumberArray];
    updatedOptions[index] = value;
    setOptionsNumberArray(updatedOptions);
  };
  const handleSelectionChange = (selectedIndices: number[]) => {
    setSelectedOptions(selectedIndices);
    console.log(selectedOptions);
  };

  // Trigger to reveal more options (e.g., options 2, 3, and 4)
  const handleAddOptions = () => {
    // Set visible options to 4 so that Option 1 and Options 2-4 appear
    setVisibleOptions((prev) => prev + 1);
    setOptionsNumberArray((prev) => [...prev, `Option ${prev.length + 1}`]);
  };

  const handleRemoveOptions = () => {
    setVisibleOptions((prev) => prev - 1);
    setOptionsNumberArray((prev) => prev.slice(0, prev.length - 1));
  };

  React.useEffect(() => {
    setOptionsNumberArray(["Option 1"]);
    setVisibleOptions(1);
  }, [questionFrame.questionTypeValue]);

  // Autosave textarea state and persist to AppContext.sections
  const { setSections } = useAppStateMgtContext();
  const [text, setText] = React.useState<string>(
    questionFrame.questionText || ""
  );

  React.useEffect(() => {
    setText(questionFrame.questionText || "");
  }, [questionFrame.questionText]);

  const handleTextChange = (value: string) => {
    setText(value);
    // Persist change to global sections state
    setSections((prev: sectionTypeProps) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              questionFrames: s.questionFrames.map((q: QuestionFrameProps) =>
                q.id === questionFrame.id ? { ...q, questionText: value } : q
              ),
            }
          : s
      )
    );
  };

  return (
    <section className={style.questionInputFrame_wrapper}>
      <textarea
        placeholder="Enter your question here"
        className={style.questionInputFrame_textarea}
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
      />
      {questionType === "multiple-choice" ? (
        <MultipleChoiceInputOptions
          visibleOptions={visibleOptions}
          handleRemoveOptions={handleRemoveOptions}
          handleAddOptions={handleAddOptions}
          optionsNumberArray={optionsNumberArray}
        />
      ) : questionType === "checkboxes" ? (
        <CheckboxInputOptions
          visibleOptions={visibleOptions}
          optionsNumberArray={optionsNumberArray}
          onOptionChange={handleOptionChange}
          handleRemoveOption={handleRemoveOptions}
          handleAddOptions={handleAddOptions}
          onSelectionChange={handleSelectionChange}
        />
      ) : questionType === "dropdown" ? (
        <DropDownInputOptions
          visibleOptions={visibleOptions}
          handleRemoveOptions={handleRemoveOptions}
          handleAddOptions={handleAddOptions}
          optionsNumberArray={optionsNumberArray}
        />
      ) : questionType === "short-answer" ? (
        <ParagraphInputOptions questionType={questionType} />
      ) : questionType === "long-answer" ? (
        <ParagraphInputOptions questionType={questionType} />
      ) : questionType === "rating" ? (
        <RatingInputOptions />
      ) : questionType === "date" ? (
        <DateTimeFileInputOption questionType="date" />
      ) : questionType === "time" ? (
        <DateTimeFileInputOption questionType="time" />
      ) : questionType === "file-upload" ? (
        <DateTimeFileInputOption questionType="file-upload" />
      ) : null}
    </section>
  );
};

export default QuestionInputFrame;
