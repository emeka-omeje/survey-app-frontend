import { useAppStateMgtContext } from "../../../../../Utils/AppContext";
import styles from "./skip_branch.module.css"; // Assuming you have a CSS module for styles

const AddRuleModal = () => {
  const { setIsDropDownCardOpen } = useAppStateMgtContext();

  return (
    <div className={styles.addRuleModal_wrapper}>
      <h2>Add Rule</h2>
      {/* Add your form or content for adding a rule here */}
      <div >
        <button
          className={styles.addRuleModal_btn}
          onClick={() => setIsDropDownCardOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddRuleModal;
