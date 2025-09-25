import React from "react";
import styles from "./logicType.module.css"; // Assuming you have a CSS module for styles
import { LogicTypeSelectProps } from "../../../Utils/dataTypes";
import { useAppStateMgtContext } from "../../../Utils/AppContext";

const LogicTypeSelectComponent: React.FC<LogicTypeSelectProps> = ({
  logicTypeSelectArray,
}) => {
  const { logicNavBTNLabel, setLogicNavBTNLabel } = useAppStateMgtContext();
  return (
    <ul className={styles.logicTypeSelectList_wrapper}>
      {logicTypeSelectArray.map((type, index) => (
        <li
          className={`${styles.logic_li} ${
            logicNavBTNLabel === type
              ? styles.logicLink_active
              : styles.logicLink_inactive
          }`}
          aria-label={type}
          role="button"
          key={index}
          onClick={() => setLogicNavBTNLabel(type)}
        >
          {type}
        </li>
      ))}
    </ul>
  );
};

export default LogicTypeSelectComponent;
