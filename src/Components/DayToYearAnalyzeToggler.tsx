import style from "./components.module.css";
import React from "react";

type DayToYearAnalyzeTogglerProps = {
  ItemName: string;
  isActive: boolean;
  setButtonName: (value: string)=> void;
};

const DayToYearAnalyzeToggler: React.FC<DayToYearAnalyzeTogglerProps> = ({
  ItemName,
  isActive,
  setButtonName
}) => {
    
  return (
    // <section className={style.dayToYearAnalyzeToggler_wrapper}>
      <button
        className={
          `${style.dayToYearAnalyzeToggler_item} ${
            isActive ? style.toggle_active : style.toggle_inactive
          }`
        }
        onClick={()=> setButtonName(ItemName)}
      >
        {ItemName}
      </button>
    // </section>
  );
};

export default DayToYearAnalyzeToggler;
