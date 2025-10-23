import React from "react";
import style from "./questionComponents.module.css";
import { MdContentCopy } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import ListEachItemOtherProps from "../../../ListEachItemOtherProps";
import ToggleSwitchComponent from "../../../ToggleSwitchComponent";
import { IoMdMore } from "react-icons/io";
import { QuestionFooterPropsType } from "../../../../Utils/dataTypes";
import { MdDragHandle } from "react-icons/md";
// import { useAppStateMgtContext } from "../../../../Utils/AppContext";
import { useBuilderPageFxns } from "../../../../Utils/useBuilderPageFxns";
import QuestionConfigureModal from "./QuestionConfigureModal";
import { useAppStateMgtContext } from "../../../../Utils/AppContext";

const QuestionFooter: React.FC<QuestionFooterPropsType> = ({
  sectionId,
  questionId,
  onRemoveQuestionFrame,
  dragHandleProps,
  itemIndex,
  sectionIndex,
  totalSections,
}) => {
  // const { surveyData, setSurveyData } = useAppStateMgtContext();
  const { getQuestionNumber } = useBuilderPageFxns();

  const [openMore, setOpenMore] = React.useState(false);
  const [isConfigureModal, setIsConfigureModal] = React.useState(false);

  const handleModalFunction = () => {
    setIsConfigureModal(true);
    setOpenMore(false);
  };

  const { sections, setSections } = useAppStateMgtContext();

  // find the question frame object for the modal
  const questionFrame = React.useMemo(() => {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return null;
    return section.questionFrames.find((q) => q.id === questionId) || null;
  }, [sections, sectionId, questionId]);

  // if (!sectionIndex) return null;
  const questionNumber = getQuestionNumber(
    sectionIndex,
    itemIndex,
    totalSections
  );

  return (
    <div className={style.questionInputFooter_wrapper}>
      <div className={style.questionInputFooter_main}>
        <h4>{questionNumber}</h4>

        {/* <div className={style.questionInputFooter_main}>
        <label htmlFor="assignedPoint">
          <i>Assign point:</i>
        </label>
        <input
          type="text"
          id="assignedPoint"
          value={assignedPointValue}
          onChange={(e) => setAssignedPointValue(Number(e.target.value))}
        />
      </div> */}
      </div>
      <div
        {...dragHandleProps.attributes}
        {...dragHandleProps.listeners}
        style={{
          cursor: "grab",
          padding: "0 8px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <MdDragHandle style={{ fontSize: "24px", color: `var(--navy-blue)` }} />
      </div>
      <div className={style.questionInputFooter_alt}>
        {/* <span>
          <input type="check"  />
        </span> */}
        <span>
          <ListEachItemOtherProps
            Icon={MdContentCopy}
            toolTip="Duplicate"
            IconSize="20px"
            fontSize="10px"
          />
        </span>
        <span onClick={() => onRemoveQuestionFrame(sectionId, questionId)}>
          <ListEachItemOtherProps
            Icon={MdDeleteOutline}
            toolTip="Delete"
            IconSize="24px"
            fontSize="10px"
            // getCallBack={onRemoveQuestionFrame}
          />
        </span>
        <span className={style.requireToggle}>
          <p>Required</p>
          <ToggleSwitchComponent
            sectionId={sectionId}
            questionId={questionId}
          />
        </span>
        {/* <span onClick={()=> setOpenMore(!openMore)}> */}
        <span className={style.moreConfig_wrapper}>
          <span
            onClick={() => setOpenMore(!openMore)}
            className={style.moreConfig_container}
          >
            <IoMdMore style={{ fontSize: "24px", color: `var(--navy-blue)` }} />
          </span>
          {openMore && (
            <span className={style.moreConfig} onClick={handleModalFunction}>
              Advanced Configuration
            </span>
          )}
          {isConfigureModal && questionFrame && (
            <QuestionConfigureModal
              open={isConfigureModal}
              onClose={() => setIsConfigureModal(false)}
              questionFrame={questionFrame}
              sectionId={sectionId}
              setSections={setSections}
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default QuestionFooter;
