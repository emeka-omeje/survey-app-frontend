// import { IconType } from "react-icons";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoIosArrowDropdown } from "react-icons/io";
import { MdOutlineShortText } from "react-icons/md";
import { BsTextParagraph } from "react-icons/bs";
import { IoMdStarOutline } from "react-icons/io";
import { RiCalendarEventLine } from "react-icons/ri";
import { PiTimerBold } from "react-icons/pi";
import { MdOutlineFileUpload } from "react-icons/md";
import { QuestionTypeSelectList } from "../../../../Utils/dataTypes";


// Icon registry for the icon names that should be saved to indexedDB instead of the actual icon components
export const iconRegistry = {
  RiCheckboxBlankCircleFill,
  MdOutlineCheckBox,
  IoIosArrowDropdown,
  MdOutlineShortText,
  BsTextParagraph,
  IoMdStarOutline,
  RiCalendarEventLine,
  PiTimerBold,
  MdOutlineFileUpload,
};

export type IconName = keyof typeof iconRegistry; //Convert the icon registry keys to a type


// export type QuestionTypeSelectList = {
//   value: string;
//   label: string;
//   icon: IconName | null;
// };

export const questionTypeSelectListArray: QuestionTypeSelectList[] = [
  // { value: "", label: "Select question type", icon: null},
  {
    value: "multiple-choice",
    label: "Multiple choice",
    icon: "RiCheckboxBlankCircleFill",
  },
  { value: "checkboxes", label: "Checkboxes", icon: "MdOutlineCheckBox" },
  { value: "dropdown", label: "Dropdown", icon: "IoIosArrowDropdown" },
  { value: "short-answer", label: "Short answer", icon: "MdOutlineShortText" },
  { value: "long-answer", label: "Long answer", icon: "BsTextParagraph" },
  { value: "rating", label: "Rating", icon: "IoMdStarOutline" },
  { value: "date", label: "Date", icon: "RiCalendarEventLine" },
  { value: "time", label: "Time", icon: "PiTimerBold" },
  { value: "file-upload", label: "File upload", icon: "MdOutlineFileUpload" },
];
