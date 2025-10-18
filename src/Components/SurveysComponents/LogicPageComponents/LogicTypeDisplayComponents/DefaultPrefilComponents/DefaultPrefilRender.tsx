import React from "react";
import styles from "./defaultPrefil.module.css";
import DefaultPrefilRow from "./DefaultPrefilRow";
import type {
  DefaultprefilRenderProps,
  QuestionFrameProps,
} from "../../../../../Utils/dataTypes";

const DefaultprefilRender: React.FC<DefaultprefilRenderProps> = ({
  localSections,
  getQuestionNumber,
  onRowChange,
}) => {
  return (
    <div className={styles.panel_body}>
      {localSections.map((s, sIdx) => (
        <section key={s.id} className={styles.section_group}>
          <div className={styles.section_title}>{s.title}</div>
          <div className={styles.question_list}>
            {s.questionFrames.map((q, qIdx) => (
              <DefaultPrefilRow
                key={q.id}
                question={q}
                questionNumber={getQuestionNumber(
                  sIdx,
                  qIdx,
                  localSections.length
                )}
                onChange={(delta: Partial<QuestionFrameProps>) =>
                  onRowChange(s.id, q.id, delta)
                }
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default DefaultprefilRender;
