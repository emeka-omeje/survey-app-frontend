
import React from "react";
import style from "./questionComponents.module.css";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
// NOTE: this component uses the parent `optionItemArray` as its source of truth.
// Any persistence (debounced or immediate) should be handled by the parent.
import { QuestionOptionItem } from "../../../../Utils/dataTypes";

type DropDownInputOptionsProps = {
  numberOfOptionsCreated: number;
  handleRemoveOptions: (id: string) => void;
  handleAddOptions: () => void;
  optionItemArray: QuestionOptionItem[];
  handleOptionTextChange: (id: string, newText: string) => void;
};

const DropDownInputOptions: React.FC<DropDownInputOptionsProps> = ({
  numberOfOptionsCreated,
  handleRemoveOptions,
  handleAddOptions,
  optionItemArray,
  handleOptionTextChange
  // setOptionItemArray,
  // sectionId,
  // questionId
}) => {

  // Render only the number of options specified by numberOfOptionsCreated
  return (
    <div className={style.questionInputOptions_main}>
      {optionItemArray.slice(0, numberOfOptionsCreated).map((eachOptionItem, index) => (
        <div key={eachOptionItem.id} className={style.option}>
          <p>{index + 1}.</p>
          {/* <label htmlFor={`option${index}`}>{eachPlaceholder}</label> */}
          <input
            id={eachOptionItem.id}
            type="text"
            placeholder={`Option ${index + 1}`}
            className={style.optionInputText}
            value={eachOptionItem.text}
            onChange={(e) => handleOptionTextChange(eachOptionItem.id, e.target.value)}
          />
          {numberOfOptionsCreated > 0 && (
            <span onClick={()=> handleRemoveOptions(eachOptionItem.id)}>
              <MdOutlineCancel size={18} />
            </span>
          )}
        </div>
      ))}
        <span className={style.questionInputOptions_add} onClick={handleAddOptions}><IoMdAddCircleOutline size={18} />Add</span>
    </div>
  );
};

export default DropDownInputOptions;
