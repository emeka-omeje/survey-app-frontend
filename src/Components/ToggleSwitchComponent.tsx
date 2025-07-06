import React from "react";
import style from "./components.module.css";

type ToggleSwitchProps = {
  initialState?: boolean;
  onChange?: (state: boolean) => void;
};

const ToggleSwitchComponent: React.FC<ToggleSwitchProps> = ({
  initialState = false,
  onChange,
}) => {
  const [isOn, setIsOn] = React.useState(initialState);

  const handleToggle = () => {
    setIsOn((prevState) => {
      const newState = !prevState;
      if (onChange) onChange(newState);
      return newState;
    });
  };

  return (
    <span
      className={`${style.toggleSwitch} ${isOn ? style.on : style.off}`}
      onClick={handleToggle}
      role="button"
      aria-pressed={isOn}
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
