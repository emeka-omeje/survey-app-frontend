import { useAppStateMgtContext } from "../../../../../Utils/AppContext";
import RuleSetter from "./RuleSetter";
import styles from "./skip_branch.module.css"; // Assuming you have a CSS module for styles

const AddRuleModal = () => {
  const { isDropDownCardOpen, setIsDropDownCardOpen } = useAppStateMgtContext();

  return (
    <aside
      className={`${styles.addRuleModal} ${
        isDropDownCardOpen
          ? styles.addRuleModal_open
          : styles.addRuleModal_closed
      }`}
    >
      <div className={styles.addRuleModal_wrapper}>
        <h2>Add Rule</h2>
        <RuleSetter />
        {/* Add your form or content for adding a rule here */}
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
            onClick={() => {
              // Logic to save the rule can be added here
              setIsDropDownCardOpen(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AddRuleModal;
