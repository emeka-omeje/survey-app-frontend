import React from "react";
import styles from "./skip_branch.module.css"; // Assuming you have a CSS module for styles
import { useAppStateMgtContext } from "../../../../../Utils/AppContext";
import RuleSetter from "./RuleSetter";
import AvailableQuestionListFlatArray from "./AvailableQuestionListFlatArray";
import useLogicHandleFxns from "../../../../../Utils/useLogicHandleFxns";
// import { LogicCondition } from "../../../../../Utils/dataTypes";

const AddRuleModal = () => {
  const {
    isDropDownCardOpen,
    setIsDropDownCardOpen,
    setLogicIfQuestion,
    logicIfQuestion,
    logicConditionStatement,
    setLogicConditionStatement,
    logicConditionValue,
    setLogicConditionValue,
    logicActionStatement,
    setLogicActionStatement,
    logicThenQuestion,
    setLogicThenQuestion
  } = useAppStateMgtContext();
  const { handleLogicCompilation } = useLogicHandleFxns();
  const [isAnotherDropDown, setIsAnotherDropDown] =
    React.useState<boolean>(false);
  const AvailableQuestionListArray = AvailableQuestionListFlatArray();

  React.useEffect(() => {
    if (AvailableQuestionListArray && AvailableQuestionListArray.length > 0 && logicIfQuestion === null) {
      setLogicIfQuestion(AvailableQuestionListArray[0]);
    }
  }, [logicIfQuestion, AvailableQuestionListArray]);

  const handleSetQuestionLogic = () => {
    try {
      if (
        !logicIfQuestion ||
        !logicConditionStatement ||
        logicConditionValue === null ||
        !logicActionStatement ||
        !logicThenQuestion
      ) {
        alert("Please complete all logic fields before saving.");
        console.log("Incomplete logic fields:", {
          logicIfQuestion,
          logicConditionStatement,
          logicConditionValue,
          logicActionStatement,
          logicThenQuestion
        });
        return;
      }
      handleLogicCompilation();
      setLogicIfQuestion(null);
      setLogicConditionStatement(null);
      setLogicConditionValue(null);
      setLogicActionStatement(null);
      setLogicThenQuestion(null);
      // setIsDropDownCardOpen(false);
    } catch (error) {
      console.error("Error compiling logic:", error);
      throw error;
    }
    setIsDropDownCardOpen(false);
  };

  return (
    <aside
      className={`${styles.addRuleModal} ${
        isDropDownCardOpen
          ? styles.addRuleModal_open
          : styles.addRuleModal_closed
      }`}
    >
      {/* <section className={styles.addRuleModal_wrapper} onClick={()=> setIsAnotherDropDown(false)}> */}
      <section className={styles.addRuleModal_wrapper}>
        <h2>Add Rule</h2>
        <hr />
        <RuleSetter
          isAnotherDropDown={isAnotherDropDown}
          setIsAnotherDropDown={setIsAnotherDropDown}
        />
        <hr />
        <div className={styles.addRuleModal_btnContainer}>
          <button
            className={styles.addRuleModal_btn}
            onClick={() => setIsDropDownCardOpen(false)}
          >
            Cancel
          </button>
          <button
            className={styles.addRuleModal_btn}
            onClick={() => 
              // Logic to save the rule can be added here
              handleSetQuestionLogic()
            }
          >
            Save
          </button>
        </div>
      </section>
    </aside>
  );
};

export default AddRuleModal;
