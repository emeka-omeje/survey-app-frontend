import React from "react";
import { useAppContext } from "../../../Utils/AppContext";
import style from "./builderPageComponents.module.css";
import FormHeader from "./FormHeader";
import QuestionFrame from "./QuestionComponents/QuestionFrame";
import { MdDeleteOutline } from "react-icons/md";
// import { sectionTypeProps } from "../../../Utils/dataTypes";
import { QuestionTypeSelectList } from "./QuestionComponents/questionTypeSelectListArray";
import ListEachItemOtherProps from "../../ListEachItemOtherProps";
import { IoMdAddCircleOutline } from "react-icons/io"; //for add question

// type sectionTypeProps = {
//   id: `${string}-${string}-${string}-${string}-${string}`;
//   title: string;
//   questionFrames: {
//     id: `${string}-${string}-${string}-${string}-${string}`;
//     text: string;
//     questionTypeValue: string;
//     questionTypeLabel: string;
//     questionTypeIcon: IconType | null
//   }[];
// }[];

type BuilderContentBodyProps = {
  // totalNumOfQuestionArray: number;
  addSection: (prop: QuestionTypeSelectList[]) => void;
  addQuestionFrameToSection: (sectionId: string) => void;
  chooseDiffQuestionType: (
    sectionId: string,
    questionId: string,
    selectedType: QuestionTypeSelectList
  ) => void;
  onRemoveQuestionFrame: (sectionId: string, questionId: string) => void;
  deleteSection: (sectionId: string) => void;
  // addQuestionFrameToLastSection: () => void;
};

const BuilderContentBody: React.FC<BuilderContentBodyProps> = ({
  // totalNumOfQuestionArray,
  // onRemoveQuestion,
  addQuestionFrameToSection,
  // sections,
  chooseDiffQuestionType,
  onRemoveQuestionFrame,
  deleteSection,
  // addQuestionFrameToLastSection,
}) => {
  const { frameCall, sections, setSurveyTitle } = useAppContext();

  return (
    <div className={style.builderContentBody_main}>
      {frameCall && <FormHeader onGetSurveyTitle={setSurveyTitle} />}
      <section className={style.builderContentBody_main}>
        {sections.map((section) => (
          <div key={section.id} className={style.builderContentBody_section}>
            {sections.length > 1 && (
              <>
                <hr></hr>
                <span className={style.builderContentBody_sectionHeader}>
                  <p>{section.title}</p>
                  <div
                    className={style.builderContentBody_sectionHeaderActions}
                  >
                    <span>
                      <ListEachItemOtherProps
                        Icon={IoMdAddCircleOutline}
                        toolTip="Add question"
                        IconSize="20px"
                        fontSize="10px"
                        getCallBack={() => {
                          addQuestionFrameToSection(section.id);
                        }}
                      />
                      <span onClick={() => deleteSection(section.id)}>
                        <ListEachItemOtherProps
                          Icon={MdDeleteOutline}
                          toolTip="Delete"
                          IconSize="20px"
                          fontSize="10px"
                          // getCallBack={onRemoveQuestionFrame}
                        />
                      </span>
                    </span>
                  </div>
                </span>
              </>
            )}
            {section.questionFrames.map((question) => (
              <QuestionFrame
                key={question.id}
                sectionId={section.id}
                questionType={question}
                chooseDiffQuestionType={chooseDiffQuestionType}
                onRemoveQuestionFrame={onRemoveQuestionFrame}
              />
            ))}
          </div>
        ))}
        {/* This is a temporary solution, we will use the sections state to calculate the total number of questions */}
        {/* {Array.from({ length: totalNumOfQuestionArray }, (_, index) => (
          <QuestionFrame key={index} onRemoveQuestion={onRemoveQuestion} />
        ))} */}
      </section>
    </div>
  );
};

export default BuilderContentBody;
