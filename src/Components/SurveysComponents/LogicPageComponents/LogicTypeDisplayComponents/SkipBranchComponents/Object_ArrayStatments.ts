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

  // if(typeof logicConditionValue === "string" || typeof logicConditionValue === "number") return <div>Loading...</div>
