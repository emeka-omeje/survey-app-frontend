import React from "react";
import styles from "./defaultPrefil.module.css";
import type { DefaultPrefilRowProps } from "../../../../../Utils/dataTypes";
import DefaultPrefilSelector from "./DefaultPrefilSelector";
import DefaultPrefilCheckBox from "./DefaultPrefilCheckBox";
import DefaultPrefilValue from "./DefaultPrefilValue";
import ConfirmApplyModal from "./ConfirmApplyModal";

const DefaultPrefilRow: React.FC<DefaultPrefilRowProps> = ({
  question,
  onChange,
  questionNumber,
}) => {
  const [value, setValue] = React.useState<string>(
    question.defaultValue ? String(question.defaultValue) : ""
  );
  const [editable, setEditable] = React.useState<boolean>(
    question.defaultEditable ?? false
  );
  const [source, setSource] = React.useState<string>(
    question.defaultSource ?? "static"
  );

  React.useEffect(() => {
    setValue(question.defaultValue ? String(question.defaultValue) : "");
    setEditable(question.defaultEditable ?? false);
    setSource(question.defaultSource ?? "static");
  }, [question.defaultValue, question.defaultEditable, question.defaultSource]);

  const handleApply = () => {
    // If source is not 'static' we should clear any previously saved static
    // default value and make the field non-editable. This guarantees that
    // applying a new source/value will overwrite any earlier saved default
    // in localSections rather than leaving stale data behind.
    // show confirmation modal instead of applying immediately
    setShowModal(true);
  };

  const [showModal, setShowModal] = React.useState(false);

  const handleConfirmApply = () => {
    onChange({
      defaultValue: source === "static" ? value : "",
      defaultEditable: source === "static" ? editable : false,
      defaultSource: source,
    });
    setShowModal(false);
  };

  const handleCancelApply = () => setShowModal(false);

  return (
    <div className={styles.row_wrapper}>
      <div className={styles.row_label}>
        <div className={styles.row_title}>
          <span className={styles.row_qnum}>{questionNumber}</span>
          {": "}
          {question.questionText}
        </div>
      </div>

      <div className={styles.row_controls}>
        {/* <select
          className={styles.row_select}
          value={source}
          onChange={(e) => setSource(e.target.value)}
        >
          <option value="static">Static value</option>
          <option value="url">From URL</option>
          <option value="crm">From CRM</option>
        </select> */}
        <DefaultPrefilSelector
          sourceValue={source}
          onSourceChange={setSource}
          // value={value}
          ariaLabelSource={`Select default source for question ${questionNumber}`}
        />

        <DefaultPrefilValue
          value={value}
          onChange={setValue}
          ariaLabel={`Input default value for question ${questionNumber}`}
          disabled={source !== "static"}
        />

        <DefaultPrefilCheckBox
          checked={editable}
          onChange={setEditable}
          ariaLabel={`Toggle editable for question ${questionNumber}`}
          disabled={source !== "static"}
        />

        <button className={styles.row_applyBtn} onClick={handleApply}>
          Apply
        </button>
        <ConfirmApplyModal
          open={showModal}
          questionLabel={question.questionText}
          questionNumber={questionNumber}
          onConfirm={handleConfirmApply}
          onCancel={handleCancelApply}
        />
      </div>
    </div>
  );
};

export default DefaultPrefilRow;
