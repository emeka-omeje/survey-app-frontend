import React, { useEffect, useState } from "react";
import styles from "./quotas.module.css";
import type {
  Quota,
  AddEditQuotaModalProps,
} from "../../../../../Utils/dataTypes";
import QuotaAttributeSelector from "./QuotaAttributeSelector";
import QuotaValuesInput from "./QuotaValuesInput";

const emptyQuota = (): Quota => ({
  id: `q_${Date.now()}`,
  name: "",
  attribute: "",
  values: [],
  limit: 10,
  count: 0,
  action: "terminate",
});
const AddEditQuotaModal: React.FC<AddEditQuotaModalProps> = ({
  initial,
  onClose,
  onSave,
  availableAttributes,
  attributeOptions,
}) => {
  const [quota, setQuota] = useState<Quota>(initial ?? emptyQuota());
  const [valuesText, setValuesText] = useState(
    (initial && initial.values.join(", ")) ?? ""
  );
  const [redirectUrl, setRedirectUrl] = useState<string>(
    (initial && (initial.redirectUrl ?? "")) ?? ""
  );
  const [displayMessage, setDisplayMessage] = useState<string>(
    (initial && (initial.displayMessage ?? "")) ?? ""
  );
  const [error, setError] = useState<string | null>(null);
  const [allowCustomValues, setAllowCustomValues] = useState<boolean>(true);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    (initial && initial.values) ?? []
  );

  useEffect(() => {
    if (initial) setQuota(initial);
    if (initial) {
      setRedirectUrl(initial.redirectUrl ?? "");
      setDisplayMessage(initial.displayMessage ?? "");
      setAllowCustomValues(
        initial.values == null || initial.values.length === 0
      );
      setSelectedOptions(initial.values ?? []);
    }
  }, [initial]);

  useEffect(() => {
    // simple validation
    if (!quota.name.trim()) setError("Please provide a name for this quota.");
    else if (!quota.attribute.trim()) setError("Select an attribute.");
    else if (!valuesText.trim()) setError("Provide at least one value.");
    else if (quota.limit <= 0) setError("Limit must be greater than 0.");
    else if (quota.action === "redirect" && redirectUrl.trim()) {
      // basic URL validation
      if (!/^https?:\/\//i.test(redirectUrl.trim()))
        setError("Redirect URL must start with http:// or https://");
      else setError(null);
    } else if (quota.action === "message" && !displayMessage.trim()) {
      setError("Please provide a message to display when full.");
    } else setError(null);
  }, [quota, valuesText, redirectUrl, displayMessage]);

  function handleSave() {
    if (error) return;
    const cleaned: Quota = {
      ...quota,
      values: allowCustomValues
        ? valuesText
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : selectedOptions,
      redirectUrl: redirectUrl.trim() || undefined,
      displayMessage: displayMessage.trim() || undefined,
    };
    onSave(cleaned);
    onClose();
  }

  return (
    <div
      className={styles.modal_overlay}
      role="dialog"
      aria-modal="true"
      aria-label={initial ? "Edit quota" : "Add quota"}
    >
      <div className={styles.modal_card}>
        <div className={styles.modal_header}>
          <h3>{initial ? "Edit quota" : "Add quota"}</h3>
          <button aria-label="Close" onClick={onClose} className={styles.btn}>
            ×
          </button>
        </div>

        <div className={styles.modal_fields}>
          <div className={styles.field_row}>
            <div className={styles.field_label}>Name:</div>
            <input
              className={styles.field_input}
              value={quota.name}
              onChange={(e) => setQuota({ ...quota, name: e.target.value })}
            />
          </div>

          <QuotaAttributeSelector
            value={quota.attribute}
            onChange={(v) => setQuota({ ...quota, attribute: v })}
            availableAttributes={availableAttributes}
          />

          <QuotaValuesInput
            allowCustom={allowCustomValues}
            onAllowCustomChange={setAllowCustomValues}
            valuesText={valuesText}
            onValuesTextChange={setValuesText}
            selectedOptions={selectedOptions}
            onToggleOption={(opt, checked) =>
              setSelectedOptions((p) =>
                checked ? [...p, opt] : p.filter((x) => x !== opt)
              )
            }
            attributeOptions={attributeOptions}
            attribute={quota.attribute}
          />

          <div className={styles.field_row}>
            <div className={styles.field_label}>Limit:</div>
            <input
              className={styles.field_input}
              type="number"
              min={1}
              value={quota.limit}
              onChange={(e) =>
                setQuota({ ...quota, limit: Number(e.target.value) })
              }
            />
          </div>

          <div className={styles.field_row}>
            <div className={styles.field_label}>When full:</div>
            <select
              className={styles.field_select}
              value={quota.action}
              onChange={(e) =>
                setQuota({
                  ...quota,
                  action: e.target.value as Quota["action"],
                })
              }
            >
              <option value="terminate">Terminate survey</option>
              <option value="redirect">Redirect</option>
              <option value="message">Display message</option>
            </select>
          </div>

          {quota.action === "redirect" && (
            <div className={styles.field_row}>
              <div className={styles.field_label}>Redirect URL:</div>
              <input
                className={styles.field_input}
                placeholder="https://example.com/thank-you"
                value={redirectUrl}
                onChange={(e) => setRedirectUrl(e.target.value)}
              />
            </div>
          )}

          {quota.action === "message" && (
            <div className={styles.field_row}>
              <div className={styles.field_label}>Message to show:</div>
              <textarea
                className={styles.field_textarea}
                placeholder="This quota is no longer accepting responses."
                value={displayMessage}
                onChange={(e) => setDisplayMessage(e.target.value)}
              />
            </div>
          )}

          {error && (
            <div className={styles.error} role="alert">
              {error}
            </div>
          )}
        </div>

        <div className={styles.modal_actions}>
          <button className={styles.btnSecondary} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.btnPrimary}
            onClick={handleSave}
            disabled={!!error}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditQuotaModal;
