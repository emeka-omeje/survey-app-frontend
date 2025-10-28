import React from "react";
import styles from "./questionComponents.module.css";
import { IoClose } from "react-icons/io5";
import { sectionTypeProps, QuestionFrameProps } from "../../../../Utils/dataTypes";

type QuestionConfigureModalProps = {
  open: boolean;
  onClose: () => void;
  questionFrame: QuestionFrameProps;
  sectionId: string;
  setSections: (updater: (prev: sectionTypeProps) => sectionTypeProps) => void;
};

const suggestVariableName = (label: string) =>
  label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");


const QuestionConfigureModal: React.FC<QuestionConfigureModalProps> = ({
  open,
  onClose,
  questionFrame,
  sectionId,
  setSections,
}) => {
  // attribute may be a legacy string or a structured object
  const attrObj = questionFrame.advancedConfigData as
          | {
              attributeName?: string;
              attributeValues?: string[];
              variableName?: string;
              captureMetaData?: Record<string, boolean>;
            }
          | undefined;

  const [attributeName, setAttributeName] = React.useState<string>(
    attrObj?.attributeName || ""
  );
  const [variableName, setVariableName] = React.useState<string>(
    attrObj?.variableName || suggestVariableName(attrObj?.attributeName || "")
  );
  const [shuffle, setShuffle] = React.useState<boolean>(
    !!questionFrame.shuffleChoices
  );
  const [hiddenFields, setHiddenFields] = React.useState<{
    response_start_time: boolean;
    response_end_time: boolean;
    device_type: boolean;
    browser_info: boolean;
    referrer_url: boolean;
  }>({
    response_start_time: !!attrObj?.captureMetaData?.response_start_time,
    response_end_time: !!attrObj?.captureMetaData?.response_end_time,
    device_type: !!attrObj?.captureMetaData?.device_type,
    browser_info: !!attrObj?.captureMetaData?.browser_info,
    referrer_url: !!attrObj?.captureMetaData?.referrer_url,
  });

  React.useEffect(() => {
    // keep variable name suggested when attribute changes unless user edited it
    if (!attrObj?.variableName) {
      setVariableName(suggestVariableName(attributeName));
    }
  }, [attributeName, attrObj?.variableName]);

  if (!open) return null;

  const handleSave = () => {
    // persist attribute, variableName, shuffle and hiddenFields into the question frame
    setSections((prevSections: sectionTypeProps) =>
      prevSections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              questionFrames: s.questionFrames.map((q) =>
                q.id === questionFrame.id
                      ? {
                          ...q,
                          advancedConfigData: {
                            attributeName: attributeName || "",
                            attributeValues: Array.isArray(q.questionTypeOptions)
                              ? q.questionTypeOptions.filter(Boolean)
                              : [],
                            variableName:
                              variableName || suggestVariableName(attributeName),
                            captureMetaData: { ...hiddenFields },
                          },
                          shuffleChoices: shuffle,
                        }
                  : q
              ),
            }
          : s
      )
    );

    onClose();
  };

  const toggleHidden = (key: keyof typeof hiddenFields) => {
    setHiddenFields((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={styles.modal_backdrop} role="dialog" aria-modal>
      <div className={styles.modal_card}>
        <header className={styles.modal_header}>
          <h3>Advanced configuration</h3>
          <button className={styles.modal_close} onClick={onClose} aria-label="Close">
            <IoClose size={20} />
          </button>
        </header>

        <div className={styles.modal_body}>
          <label className={styles.field_label}>
            Attribute name
            <input
              className={styles.field_input}
              value={attributeName}
              onChange={(e) => setAttributeName(e.target.value)}
              placeholder="e.g. Country"
            />
          </label>

          <label className={styles.field_label}>
            Variable name
            <input
              className={styles.field_input}
              value={variableName}
              onChange={(e) => setVariableName(e.target.value)}
              placeholder="e.g. country"
            />
            <small className={styles.field_hint}>Used in quotas, piping and analytics</small>
          </label>

          <div className={styles.field_label}>
            <label className={styles.toggle_row}>
              <input
                type="checkbox"
                checked={shuffle}
                onChange={() => setShuffle((s) => !s)}
              />
              <span>Shuffle choice order</span>
            </label>
            <small className={styles.field_hint}>Randomize options when presenting this question</small>
          </div>

          <div className={styles.section_separator} />

          <div>
            <h4 className={styles.section_title}>Hidden fields (capture automatically)</h4>
            <div className={styles.hidden_grid}>
              {(
                [
                  ["response_start_time", "Start time"],
                  ["response_end_time", "End time"],
                  ["device_type", "Device type"],
                  ["browser_info", "Browser info"],
                  ["referrer_url", "Referrer"],
                ] as [keyof typeof hiddenFields, string][]
              ).map(([key, label]) => (
                <label key={key} className={styles.hidden_item}>
                  <input
                    type="checkbox"
                    checked={!!hiddenFields[key]}
                    onChange={() => toggleHidden(key)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <footer className={styles.modal_footer}>
          <button className={styles.btn_secondary} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.btn_primary} onClick={handleSave}>
            Save configuration
          </button>
        </footer>
      </div>
    </div>
  );
};

export default QuestionConfigureModal;
