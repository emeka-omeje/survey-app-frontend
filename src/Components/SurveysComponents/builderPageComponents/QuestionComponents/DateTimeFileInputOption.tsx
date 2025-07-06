import React from "react";
import style from "./questionComponents.module.css";
import { MdCalendarMonth } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { LuFileSymlink } from "react-icons/lu";


// import { IconType } from "react-icons";

type DateTimeFileInputOptionProps = {
  questionType: string;
};

const DateTimeFileInputOption: React.FC<DateTimeFileInputOptionProps> = ({ questionType }) => {
  return (
    <section className={style.dateInputWrapper}>
      {questionType === "date" ? (
        <>
          <MdCalendarMonth size={24} style={{ color: 'var(--color-text-secondary)' }} />
          <p className={style.questionTypeText}>
            Selects from date picker: (day, month, year)
          </p>
        </>
      ) : questionType === "time" ? (
        <>
          <MdAccessTime size={24} style={{ color: 'var(--color-text-secondary)' }} />
          <p className={style.questionTypeText}>
            Selects from time picker: (00:00 AM/PM)
          </p>
        </>
      ) : questionType === "file-upload" ? (
        <>
          <LuFileSymlink size={24} style={{ color: 'var(--color-text-secondary)' }} />
          <p className={style.questionTypeText}>
            Allow respondents to upload files from their device.
          </p>
        </>
      ) : null}
    </section>
  );
};

export default DateTimeFileInputOption;
