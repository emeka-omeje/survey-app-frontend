import { IoMdAddCircleOutline } from "react-icons/io"; //for add question
import { RiTextSnippet } from "react-icons/ri"; //add title
import { RiStickyNoteAddFill } from "react-icons/ri"; //for add page
import { TbSection } from "react-icons/tb"; //for add section
import ListEachItemOtherProps from "../../ListEachItemOtherProps";
import style from "./builderPageComponents.module.css";
import { useAppStateMgtContext } from "../../../Utils/AppContext";
// import { IconType } from "react-icons";
import {
  questionTypeSelectListArray,
} from "./QuestionComponents/questionTypeSelectListArray";
import { QuestionTypeSelectList } from "../../../Utils/dataTypes";

// type QuestionTypeSelectList = {
//   value: string;
//   label: string;
//   icon: IconType | null;
// };

type BuilderContentHeaderProps = {
  //   onAddQuestion: () => void;
  addSection: (prop: QuestionTypeSelectList[]) => void;
  addQuestionFrameToSection: (sectionId: string) => void;
  addQuestionFrameToLastSection: () => void;
};

const BuilderContentHeader: React.FC<BuilderContentHeaderProps> = ({
  //   onAddQuestion,
  addSection,
  addQuestionFrameToLastSection,
}) => {
  const { setFrameCall } = useAppStateMgtContext();

  return (
    <span className={style.builderContentHeader_main}>
      <span onClick={() => addQuestionFrameToLastSection()}>
        <ListEachItemOtherProps
          Icon={IoMdAddCircleOutline}
          toolTip="Add question"
          // getCallBack={onAddQuestion}
        />
      </span>
      <ListEachItemOtherProps
        Icon={RiTextSnippet}
        toolTip="Add title and description"
        getCallBack={setFrameCall}
      />
      <span onClick={() => addSection(questionTypeSelectListArray)}>
        <ListEachItemOtherProps Icon={TbSection} toolTip="Add section" />
      </span>

      <ListEachItemOtherProps
        Icon={RiStickyNoteAddFill}
        toolTip="Add page"
        fontSize="10px"
      />
    </span>
  );
};

export default BuilderContentHeader;
