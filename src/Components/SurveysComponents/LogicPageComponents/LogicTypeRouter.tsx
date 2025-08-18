import React from "react";
import styles from "./logicType.module.css"; // Assuming you have a CSS module for styles
import { useAppStateMgtContext } from "../../../Utils/AppContext";
import SkipBranchLogic from "./LogicTypeDisplayComponents/SkipBranchComponents/Skip_Branch_logic";
import DisplayLogic from "./LogicTypeDisplayComponents/Display_logic";
import ScoringLogic from "./LogicTypeDisplayComponents/Scoring_logic";
import PipingLogic from "./LogicTypeDisplayComponents/Piping_logic";
import DefaultValuesLogic from "./LogicTypeDisplayComponents/DefaultValues_logic";
import QuotasLogic from "./LogicTypeDisplayComponents/Quotas_logic";
import RandomisationLogic from "./LogicTypeDisplayComponents/Randomisation_logic";
import ValidationLogic from "./LogicTypeDisplayComponents/Validation_logic";
import TestModeLogic from "./LogicTypeDisplayComponents/Test_Mode_logic";
import LogicTypeHeader from "./LogicTypeDisplayComponents/LogicTypeHeader";

const LogicTypeRouter: React.FC = () => {
  const { logicNavBTNLabel } = useAppStateMgtContext();

  return (
    <div className={styles.logicTypeDisplay_wrapper}>
      <LogicTypeHeader />
      {/* Render the appropriate logic component based on the selected type */}
      {logicNavBTNLabel === "Skip/Branch" ? (
        <SkipBranchLogic />
      ) : logicNavBTNLabel === "Display" ? (
        <DisplayLogic />
      ) : logicNavBTNLabel === "Scoring" ? (
        <ScoringLogic />
      ) : logicNavBTNLabel === "Piping" ? (
        <PipingLogic />
      ) : logicNavBTNLabel === "Default Values" ? (
        <DefaultValuesLogic />
      ) : logicNavBTNLabel === "Quotas" ? (
        <QuotasLogic />
      ) : logicNavBTNLabel === "Randomisation" ? (
        <RandomisationLogic />
      ) : logicNavBTNLabel === "Validation" ? (
        <ValidationLogic />
      ) : logicNavBTNLabel === "Test Mode" ? (
        <TestModeLogic />
      ) : null}
    </div>
  );
};

export default LogicTypeRouter;