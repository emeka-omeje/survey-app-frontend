const DB_NAME = "surveyBuilderDB";
const unpublishedSurveyStoreName = "unpublishedSurveys";
import { surveyTypeProps } from "./../dataTypes";

// Creates or identifies the indexedDBStorage
export const openUnpublishedSurveyDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = () => {
      const dbStore = request.result;
      if (!dbStore.objectStoreNames.contains(unpublishedSurveyStoreName)) {
        dbStore.createObjectStore(unpublishedSurveyStoreName, { keyPath: "id" });
      }
    };
  });
};

// Waiting for the transaction to complete
const waitForTransactionCompletion = (
  transaction: IDBTransaction
): Promise<void> => {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
};

// Ensuring draft is saved in the indexedDBStorage
export const saveUnpublishedSurvey = async (data: surveyTypeProps) => {
  const dbStore = await openUnpublishedSurveyDB();
  const transaction = dbStore.transaction(unpublishedSurveyStoreName, "readwrite");
  transaction
    .objectStore(unpublishedSurveyStoreName)
    .put({ ...data, updatedAt: new Date().toISOString() });
  await waitForTransactionCompletion(transaction).then(() => true);
};


// This is not useful since we will not be fetching unpublished surveys...........................

// // Gets saved survey drafts from the indexedDBStorage
export const getAllUnpublishedSurveys = async (
  id: string
): Promise<surveyTypeProps | null> => {
  const dbStore = await openUnpublishedSurveyDB();
  return new Promise((resolve, reject) => {
    const transaction = dbStore.transaction(unpublishedSurveyStoreName, "readonly");
    const unpublishedRequest = transaction.objectStore(unpublishedSurveyStoreName).get(id);
    unpublishedRequest.onerror = () => reject(unpublishedRequest.error);
    unpublishedRequest.onsuccess = () => {
      if (unpublishedRequest.result) {
        resolve(unpublishedRequest.result as surveyTypeProps);
      } else {
        resolve(null);
      }
    };
  });
};

// Deletes unpublished surveys from the indexedDBStorage
export const deleteAllUnpublishedSurveys = async () => {
    const dbStore = await openUnpublishedSurveyDB();
    const transaction = dbStore.transaction(unpublishedSurveyStoreName, "readwrite");
    transaction.objectStore(unpublishedSurveyStoreName).clear();
    await waitForTransactionCompletion(transaction);
}