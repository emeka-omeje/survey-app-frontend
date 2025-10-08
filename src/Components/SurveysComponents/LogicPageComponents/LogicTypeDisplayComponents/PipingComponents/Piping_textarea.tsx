import React from "react";
import styles from "./piping.module.css";


const PipingTextarea: React.FC<{
    receiverText: string;
    handleEditorChange: (text: string) => void;
}> = ({ receiverText, handleEditorChange}) => {
  return (
    <>
      <label className={styles.fieldLabel}>
        Receiver text (edit and place tokens)
      </label>
      <textarea
        className={styles.textarea}
        value={receiverText}
        onChange={(e) => handleEditorChange(e.target.value)}
        rows={5}
      />
    </>
  );
};

export default PipingTextarea;
