import { conditionStatementObjectArrayProps } from "../../../../../Utils/dataTypes";

export const actionStatementObjectArray: conditionStatementObjectArrayProps[] = [
  { label: "Show", value: "show" },
  { label: "Hide", value: "hide" },
  { label: "Skip To", value: "skip_to" },
  { label: "End Survey", value: "end_survey" },
];

export const conditionStatementObjectArray: conditionStatementObjectArrayProps[] = [
  { label: "True/False", value: "true_false" },
  { label: "Equal", value: "equal" },
  { label: "Not Equal", value: "not_equal" },
  { label: "Greater Than", value: "greater_than" },
  { label: "Less Than", value: "less_than" },
  { label: "Includes", value: "includes" },
];

export const booleanObjectArray: conditionStatementObjectArrayProps[] = [
  { label: "True", value: "true" },
  { label: "False", value: "false" },
];


export const renderConditionLabel = (operator: string): string => {
  // Use a switch case or a utility function to abstract this logic
  switch (operator) {
    case "true_false":
      return "True/False";
    case "equal":
      return "Equal";
    case "less_than":
      return "Less Than";
    case "not_equal":
      return "Not Equal";
    case "greater_than":
      return "Greater Than";
    case "includes":
      return "Includes";
    default:
      return operator;
  }
};
export const renderConditionAction = (operator: string): string => {
  // Use a switch case or a utility function to abstract this logic
  switch (operator) {
    case "show":
      return "Show";
    case "hide":
      return "Hide";
    case "skip_to":
      return "Skip To";
    case "end_survey":
      return "End Survey";
    default:
      return operator;
  }
};
