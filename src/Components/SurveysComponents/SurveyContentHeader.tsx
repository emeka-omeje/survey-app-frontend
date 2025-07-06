import React from "react";
import ItemOwnershipNavigator from "../ItemOwnershipNavigator";
import style from "./surveyComponent.module.css";

const SurveyContentHeader: React.FC = () => {
  return (
    <span className={style.surveyContent_header}>
      {/* <span>Surveys:</span> */}
      <ItemOwnershipNavigator />
    </span>
  );
};

export default SurveyContentHeader;
