import { AvailableQuestionListFlatArrayProps, conditionStatementObjectArrayProps } from "../../../../../Utils/dataTypes";

export function isConditionStatementObjectArray(array: conditionStatementObjectArrayProps[] | AvailableQuestionListFlatArrayProps[]): array is conditionStatementObjectArrayProps[] {
  return array.length > 0 && "label" in array[0];
}

export function isAvailableQuestionListFlatArray(array: conditionStatementObjectArrayProps[] | AvailableQuestionListFlatArrayProps[]): array is AvailableQuestionListFlatArrayProps[] {
  return array.length > 0 && "questionNumber" in array[0];
}
