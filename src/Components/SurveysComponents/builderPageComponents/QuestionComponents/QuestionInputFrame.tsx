import React from "react";
import style from "./questionComponents.module.css";
import { useAppStateMgtContext } from "../../../../Utils/AppContext";
import {
  QuestionFrameProps,
  QuestionInputFrameComponentProps,
  QuestionOptionItem,
  sectionTypeProps,
} from "../../../../Utils/dataTypes";
import MultipleChoiceInputOptions from "./MultipleChoiceInputOptions";
import CheckboxInputOptions from "./CheckboxInputOptions";
import DropDownInputOptions from "./DropDownInputOptions";
import ParagraphInputOptions from "./ParagraphInputOptions";
import RatingInputOptions from "./RatingOptionsContainer";
import DateTimeFileInputOption from "./DateTimeFileInputOption";
import useDebouncedPersistOptionTexts from "../../../../Utils/BuilderHandlers/useQuestionOptionDebounce";

const QuestionInputFrame: React.FC<QuestionInputFrameComponentProps> = ({
  questionFrame,
  sectionId,
  questionType,
}) => {
  // create an id helper (simple fallback)
  const makeId = () => `opt_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

  // Pull AppContext setter higher so handler functions below can persist changes
  const { setSections } = useAppStateMgtContext();

  const optionItemsToStrings = (items: QuestionOptionItem[]) => {
    return items.map((i) => i.text);
  };

  // Option texts shown for the current question (e.g., ['Yes', 'No'])
  const [optionItemArray, setOptionItemArray] = React.useState<
    QuestionOptionItem[]
  >(
    questionFrame.questionTypeOptions
      ? questionFrame.questionTypeOptions.map((text) => ({
          id: makeId(),
          text,
        }))
      : [{ id: makeId(), text: "" }]
  );

  // Autosave textarea state and persist to AppContext.sections
  const [text, setText] = React.useState<string>(
    questionFrame.questionText || ""
  );

  const { flush } = useDebouncedPersistOptionTexts(
    optionItemsToStrings(optionItemArray),
    sectionId,
    questionFrame.id,
    setSections,
    300
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

  const handleOptionTextChange = (id: string, newText: string) => {
    setOptionItemArray((prev) => {
      const next = prev.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      );
      return next;
    });
  };

  // when adding/removing an option (structural change), persist immediately:
  const handleAddOptions = () => {
    setOptionItemArray((prev) => {
      if (prev.length >= 5) return prev; // max 5 options
      const next = [...prev, { id: makeId(), text: "" }];
      return next;
    });
    flush(); // persist structure immediately
  };

const handleRemoveOptions = (id: string) => {
    setOptionItemArray((prev) => {
      if (prev.length <= 1) return prev; // at least 1 option must remain
      const next = prev.filter((item) => item.id !== id);
      return next;
    });
    flush(); // persist structure immediately
  };


  // ................................................

  // // For checkbox-type questions, track which option indices are selected (ref)
  // const selectedOptionIndicesRef = React.useRef<number[]>([]);

  // // Pull AppContext setter higher so handler functions below can persist changes
  // const { setSections } = useAppStateMgtContext();

  // // Update a single option text (optionTexts is the single source of truth)
  // const handleOptionTextChange = (index: number, value: string) => {
  //   setOptionTexts((previousOptionTexts) => {
  //     const next = Array.isArray(previousOptionTexts) ? [...previousOptionTexts] : [];
  //     while (next.length <= index) next.push("");
  //     next[index] = value;

  //     // persist to sections
  //     setSections((previousSections: sectionTypeProps) =>
  //       previousSections.map((section) =>
  //         section.id === sectionId
  //           ? {
  //               ...section,
  //               questionFrames: section.questionFrames.map((frame) =>
  //                 frame.id === questionFrame.id
  //                   ? { ...frame, questionTypeOptions: next }
  //                   : frame
  //               ),
  //             }
  //           : section
  //       )
  //     );

  //     return next;
  //   });
  // };

  // const handleSelectedOptionIndicesChange = (indices: number[]) => {
  //   selectedOptionIndicesRef.current = indices;
  //   // keep console for dev debugging if needed
  //   console.log(indices);
  // };

  // // Reveal an additional option input row by appending an empty optionText
  // const handleAddOptionRow = () => {
  //   setOptionTexts((previousOptionTexts) => {
  //     const next = Array.isArray(previousOptionTexts) ? [...previousOptionTexts] : [];
  //     if (next.length >= 5) return next;
  //     next.push("");
  //     setSections((previousSections: sectionTypeProps) =>
  //       previousSections.map((section) =>
  //         section.id === sectionId
  //           ? {
  //               ...section,
  //               questionFrames: section.questionFrames.map((frame) =>
  //                 frame.id === questionFrame.id
  //                   ? { ...frame, questionTypeOptions: next }
  //                   : frame
  //               ),
  //             }
  //           : section
  //       )
  //     );
  //     return next;
  //   });
  // };

  // // Remove the last visible option input row (ensure at least one remains)
  // const handleRemoveOptionRow = () => {
  //   setOptionTexts((previousOptionTexts) => {
  //     const next = Array.isArray(previousOptionTexts) ? previousOptionTexts.slice(0, Math.max(1, previousOptionTexts.length - 1)) : [""];
  //     setSections((previousSections: sectionTypeProps) =>
  //       previousSections.map((section) =>
  //         section.id === sectionId
  //           ? {
  //               ...section,
  //               questionFrames: section.questionFrames.map((frame) =>
  //                 frame.id === questionFrame.id
  //                   ? { ...frame, questionTypeOptions: next }
  //                   : frame
  //               ),
  //             }
  //           : section
  //       )
  //     );
  //     return next;
  //   });
  // };

  // React.useEffect(() => {
  //   // Initialize optionTexts from the question frame (or a single empty option)
  //   setOptionTexts(questionFrame.questionTypeOptions ?? [""]);
  // }, [questionFrame.questionTypeValue, questionFrame.questionTypeOptions]);

  // // Autosave textarea state and persist to AppContext.sections
  // const [text, setText] = React.useState<string>(
  //   questionFrame.questionText || ""
  // );

  // React.useEffect(() => {
  //   setText(questionFrame.questionText || "");
  // }, [questionFrame.questionText]);

  // const handleTextChange = (value: string) => {
  //   setText(value);
  //   // Persist change to global sections state
  //   setSections((prev: sectionTypeProps) =>
  //     prev.map((s) =>
  //       s.id === sectionId
  //         ? {
  //             ...s,
  //             questionFrames: s.questionFrames.map((q: QuestionFrameProps) =>
  //               q.id === questionFrame.id ? { ...q, questionText: value } : q
  //             ),
  //           }
  //         : s
  //     )
  //   );
  // };

  return (
    <section
      className={style.questionInputFrame_wrapper}
      // data-qtype-options={optionTexts?.join("|")}
    >
      <textarea
        placeholder="Enter your question here"
        className={style.questionInputFrame_textarea}
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
      />
      {questionType === "multiple-choice" ? (
        <MultipleChoiceInputOptions
          numberOfOptionsCreated={
            optionItemArray && optionItemArray.length
              ? optionItemArray.length
              : 1
          }
          handleOptionTextChange={handleOptionTextChange}
          handleRemoveOptions={handleRemoveOptions}
          handleAddOptions={handleAddOptions}
          optionItemArray={optionItemArray}
        />
      ) : questionType === "checkboxes" ? (
        <CheckboxInputOptions
          numberOfOptionsCreated={
            optionItemArray && optionItemArray.length
              ? optionItemArray.length
              : 1
          }
          optionItemArray={optionItemArray}
          handleOptionTextChange={handleOptionTextChange}
          handleRemoveOptions={handleRemoveOptions}
          handleAddOptions={handleAddOptions}
          // onSelectionChange={handleSelectedOptionIndicesChange}
        />
      ) : questionType === "dropdown" ? (
        <DropDownInputOptions
          numberOfOptionsCreated={
            optionItemArray && optionItemArray.length
              ? optionItemArray.length
              : 1
          }
          handleRemoveOptions={handleRemoveOptions}
          handleAddOptions={handleAddOptions}
          optionItemArray={optionItemArray}
          handleOptionTextChange={handleOptionTextChange}
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
