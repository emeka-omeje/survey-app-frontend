import { surveyTypeProps } from "./../dataTypes";
import { openSurveyDraftDB, waitForTransactionCompletion, unfinishedSurveysStoreName } from "./surveyDraftIndexDBStorage";


// To retrieve all unpublished surveys from the indexedDBStorage
export const getAllUnpublishedSurveys = async (): Promise<surveyTypeProps[]> => {
  const dbStore = await openSurveyDraftDB();
  return new Promise((resolve, reject) => {
    const transaction = dbStore.transaction(unfinishedSurveysStoreName, "readonly");
    const unpublishedRequest = transaction.objectStore(unfinishedSurveysStoreName).getAll();
    unpublishedRequest.onerror = () => reject(unpublishedRequest.error);
    unpublishedRequest.onsuccess = () => resolve(unpublishedRequest.result as surveyTypeProps[]);
  });
}

// To save all unpublished surveys in the indexedDBStorage
export const saveAllUnpublishedSurveys = async (data: surveyTypeProps[]) => {
  const dbStore = await openSurveyDraftDB();
  const transaction = dbStore.transaction(unfinishedSurveysStoreName, "readwrite");
  const store = transaction.objectStore(unfinishedSurveysStoreName);
  data.forEach((survey) => {
    store.put({ ...survey, updatedAt: new Date().toISOString(), status: "in-progress" } as surveyTypeProps);
  });
  await waitForTransactionCompletion(transaction).then(() => true);
}


// Deletes unpublished surveys from the indexedDBStorage
export const deleteAllUnpublishedSurveys = async () => {
    const dbStore = await openSurveyDraftDB();
    const transaction = dbStore.transaction(unfinishedSurveysStoreName, "readwrite");
    transaction.objectStore(unfinishedSurveysStoreName).clear();
    await waitForTransactionCompletion(transaction);
}