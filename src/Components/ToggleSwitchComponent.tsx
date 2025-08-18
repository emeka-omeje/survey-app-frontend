import React from "react";
import style from "./components.module.css";
import { useBuilderPageFxns } from "../Utils/useBuilderPageFxns";
// import { useAppStateMgtContext } from "../Utils/AppContext";

type ToggleSwitchProps = {
    sectionId: string;
  questionId: string;
  // initialState?: boolean;
  // onHandleQuestionRequiredChange: (state: boolean, sectionId: string, questionId: string) => void;
};

const ToggleSwitchComponent: React.FC<ToggleSwitchProps> = ({
sectionId, questionId
}) => {
  // const { setSurveyData} = useAppStateMgtContext();
  const { handleQuestionRequiredChange } = useBuilderPageFxns();
  const [isRequired, setIsRequired] = React.useState<boolean>(false);

  const handleToggle = () => {
    setIsRequired((prevState) => {
      const newState = !prevState;
      handleQuestionRequiredChange(newState, sectionId, questionId);
      return newState;
    });
  };

  return (
    <span
      className={`${style.toggleSwitch} ${isRequired ? style.on : style.off}`}
      onClick={handleToggle}
      role="button"
      aria-pressed={isRequired}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleToggle();
        }
      }}
    >
      <div className={style.toggleKnob} />
    </span>
  );
};

export default ToggleSwitchComponent;
