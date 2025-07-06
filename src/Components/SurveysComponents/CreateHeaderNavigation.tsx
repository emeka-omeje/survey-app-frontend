import React from "react";
// import { NavLink } from "react-router-dom";
import style from "./surveyComponent.module.css";

type CreateHeaderNavigationProps = {
  //   NavItem: string;
  Label: string;
  isActive: boolean;
  setButtonName: (value: string)=> void;
};
// type CreateHeaderNavigationProps = {
//   NavItem: string;
//   Label: string;
// };

const CreateHeaderNavigation: React.FC<CreateHeaderNavigationProps> = ({
  //   NavItem,
  Label,
  isActive,
  setButtonName
}) => {
  return (
    <button
      className={`${style.createHeaderNav_Item} ${
          isActive ? style.toggle_active : style.toggle_inactive
        }`}
        onClick={()=> setButtonName(Label)}
    >
      {Label}
    </button>
  );
};

export default CreateHeaderNavigation;
