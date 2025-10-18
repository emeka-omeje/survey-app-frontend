import React, { useMemo, useState } from "react";
import styles from "./quotas.module.css";
import QuotaRow from "./QuotaRow";
import AddEditQuotaModal from "./AddEditQuotaModal";
import { useAppStateMgtContext } from "../../../../../Utils/AppContext";
import type { surveyTypeProps, Quota } from "../../../../../Utils/dataTypes";

const QuotasPanel: React.FC = () => {
  const { sections, surveyData, setSurveyData } = useAppStateMgtContext();

  const quotas: Quota[] = useMemo(() => {
    const sd = surveyData as unknown as Partial<
      surveyTypeProps & { quotas?: Quota[] }
    >;
    return sd.quotas ?? [];
  }, [surveyData]);

  // Build adaptive availableAttributes and attributeOptions from surveyData

  const { availableAttributesAdaptive, attributeOptions } = useMemo(() => {
    let eachQuestionAttributeOptions: Record<string, string[]> = {};
    // const questionAttribute: string = "";

    if (sections.length > 0) {
      sections.forEach((section) => {
        section.questionFrames.forEach((questionFrame) => {
          // logic to extract attributes and options
          const questionAttribute = questionFrame.attribute;

          if (
            questionFrame.questionTypeValue === "Multiple Choice" ||
            questionFrame.questionTypeValue === "Checkbox" ||
            questionFrame.questionTypeValue === "Dropdown"
          ) {
            const optionsList = questionFrame.choicesList.map(
              (choice) => choice.label
            );
            eachQuestionAttributeOptions[questionAttribute] =
              optionsList as string[];
          }
        });
      });
    }
  }, []);

  // const { availableAttributesAdaptive, attributeOptions } = useMemo(() => {
  // const sd = surveyData as unknown as Record<string, unknown> | undefined;
  //   const defaultAttributes = [
  //     "Country",
  //     "Gender",
  //     "Age Group",
  //     "Region",
  //     "Language",
  //   ];

  //   // 1) If surveyData has top-level attributes array, prefer it
  //   if (Array.isArray(sd?.attributes) && sd!.attributes.length > 0) {
  //     return {
  //       availableAttributesAdaptive: sd!.attributes as string[],
  //       attributeOptions: (sd!.attributeOptions as Record<string, string[]>) || {},
  //     };
  //   }

  //   // 2) Else, derive attributes from sections' questionFrames
  //   const attrsSet = new Set<string>();
  //   const optionsMap: Record<string, string[]> = {};
  //   if (Array.isArray(sd?.sections)) {
  //     sd!.sections.forEach((sec) => {
  //       const qframes: unknown[] = Array.isArray(sec?.questionFrames) ? sec.questionFrames : [];
  //       qframes.forEach((q: unknown) => {
  //         const qObj = (q as Record<string, unknown>) || {};
  //         const key =
  //           (typeof qObj["attribute"] === "string"
  //             ? (qObj["attribute"] as string)
  //             : typeof qObj["questionText"] === "string"
  //             ? (qObj["questionText"] as string)
  //             : undefined) as string | undefined;
  //         if (!key) return;
  //         attrsSet.add(key);

  //         // try to extract option list from common properties (choices/options)
  //         const opts = qObj["choices"] ?? qObj["options"] ?? qObj["questionOptions"] ?? qObj["choicesList"];
  //         if (Array.isArray(opts) && opts.length > 0) {
  //           // normalize to string[]
  //           optionsMap[key] = (opts as unknown[]).map((o) => {
  //             if (typeof o === "string") return o;
  //             if (o && typeof o === "object") return (o as { label?: string })["label"] ?? String(o);
  //             return String(o);
  //           });
  //         }
  //       });
  //     });
  //   }

  //   const attrs = Array.from(attrsSet);
  //   return {
  //     availableAttributesAdaptive: attrs.length > 0 ? attrs : defaultAttributes,
  //     attributeOptions: optionsMap,
  //   };
  // }, [surveyData]);

  const [editing, setEditing] = useState<Quota | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("");

  const sorted = useMemo(
    () => [...quotas].sort((a, b) => a.name.localeCompare(b.name)),
    [quotas]
  );
  const visible = useMemo(
    () =>
      sorted.filter(
        (q) =>
          q.name.toLowerCase().includes(filter.toLowerCase()) ||
          q.attribute.toLowerCase().includes(filter.toLowerCase())
      ),
    [sorted, filter]
  );

  const saveQuota = (q: Quota) => {
    setSurveyData((prev) => {
      const prevSurvey = prev as unknown as surveyTypeProps & {
        quotas?: Quota[];
      };
      const existing = prevSurvey.quotas ?? [];
      const next = [...existing];
      const idx = next.findIndex((x) => x.id === q.id);
      if (idx >= 0) next[idx] = q;
      else next.push(q);
      return { ...(prevSurvey as object), quotas: next } as surveyTypeProps & {
        quotas: Quota[];
      };
    });
  };

  const deleteQuota = (id: string) => {
    setSurveyData((prev) => {
      const prevSurvey = prev as unknown as surveyTypeProps & {
        quotas?: Quota[];
      };
      const existing = prevSurvey.quotas ?? [];
      const next = existing.filter((q) => q.id !== id);
      return { ...(prevSurvey as object), quotas: next } as surveyTypeProps & {
        quotas: Quota[];
      };
    });
  };

  return (
    <div className={styles.quotas_wrapper}>
      <header className={styles.quotas_header}>
        <div>
          <h2 className={styles.quotas_title}>Quota Control</h2>
          <div className={styles.small}>
            Define respondent quotas and actions when limits are reached.
          </div>
        </div>

        <div className={styles.quotas_actions}>
          <input
            aria-label="Search quotas"
            placeholder="Search quotas or attributes"
            value={filter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilter(e.target.value)
            }
            className={styles.search_input}
          />
          <button
            className={styles.btnPrimary}
            onClick={() => {
              setEditing(null);
              setShowModal(true);
            }}
          >
            Add quota
          </button>
        </div>
      </header>

      <section className={styles.quota_list} aria-live="polite">
        {visible.length === 0 ? (
          <div className={styles.empty}>
            No quotas yet. Click “Add quota” to create one.
          </div>
        ) : (
          visible.map((q: Quota) => (
            <QuotaRow
              key={q.id}
              quota={q}
              onEdit={(qq: Quota) => {
                setEditing(qq);
                setShowModal(true);
              }}
              onDelete={(id: string) => deleteQuota(id)}
            />
          ))
        )}
      </section>

      {showModal && (
        <AddEditQuotaModal
          initial={editing ?? undefined}
          onClose={() => setShowModal(false)}
          onSave={(q: Quota) => saveQuota(q)}
          availableAttributes={availableAttributesAdaptive}
          attributeOptions={attributeOptions}
        />
      )}
    </div>
  );
};

export default QuotasPanel;
