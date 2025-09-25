import React from "react";
import style from "../ScoringComponents/scoring.module.css";
import ScoringHeaderBTN from "../ScoringComponents/Scoring_HeaderBTN";
import useScoringLogicFxns from "../../../../../Utils/LogicHandlers/useScoringLogicFxns";

const ScoringHeader: React.FC = () => {
  const { saveChanges, resetAllPoints } = useScoringLogicFxns();
  const [scoringModeAuto, setScoringModeAuto] = React.useState(true);

  return (
    <div className={style.scoring_headerControls}>
      <label className={style.switchLabel}>
        <input
          type="checkbox"
          checked={scoringModeAuto}
          onChange={() => setScoringModeAuto((s) => !s)}
        />
        <span>Auto-sum preview</span>
      </label>
      <ScoringHeaderBTN
        handleClickFXN={saveChanges}
        title="Save Scoring Logic"
        label="Save"
      />
      <ScoringHeaderBTN
        title="Reset points to zero"
        label="Reset"
        handleClickFXN={resetAllPoints}
      />
    </div>
  );
};

export default ScoringHeader;
