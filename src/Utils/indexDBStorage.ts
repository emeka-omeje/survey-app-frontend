const DB_NAME = "surveyBuilderDB";
const dbStoreName = "surveyDrafts";
// const unpublishedSurveyStoreName = "unpublishedSurveys";
import { surveyDraftTypeProps } from "./dataTypes";

// Creates or identifies the indexedDBStorage
export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = () => {
      const dbStore = request.result;
      if (!dbStore.objectStoreNames.contains(dbStoreName)) {
        dbStore.createObjectStore(dbStoreName, { keyPath: "id" });
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
export const saveSurveyDraft = async (data: surveyDraftTypeProps) => {
  const dbStore = await openDB();
  const transaction = dbStore.transaction(dbStoreName, "readwrite");
  transaction
    .objectStore(dbStoreName)
    .put({ ...data, updatedAt: new Date().toISOString() });
  await waitForTransactionCompletion(transaction);
};

// Gets saved survey drafts from the indexedDBStorage
export const getSurveyDrafts = async (
  id: string
): Promise<surveyDraftTypeProps | null> => {
  const dbStore = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = dbStore.transaction(dbStoreName, "readonly");
    const draftRequest = transaction.objectStore(dbStoreName).get(id);
    draftRequest.onerror = () => reject(draftRequest.error);
    draftRequest.onsuccess = () => {
      if (draftRequest.result) {
        resolve(draftRequest.result as surveyDraftTypeProps);
      } else {
        resolve(null);
      }
    };
  });
};

// Deletes a survey draft from the indexedDBStorage
export const deleteSurveyDraft = async (id: string) => {
    const dbStore = await openDB();
    const transaction = dbStore.transaction(dbStoreName, "readwrite");
    transaction.objectStore(dbStoreName).delete(id);
    await waitForTransactionCompletion(transaction);
}