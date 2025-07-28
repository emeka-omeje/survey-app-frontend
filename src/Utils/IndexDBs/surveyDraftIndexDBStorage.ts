import { surveyTypeProps } from "../dataTypes";
const DB_NAME = "surveyBuilderDB";
export const unfinishedSurveysStoreName = "surveyDrafts";


// Creates or identifies the indexedDBStorage
export const openSurveyDraftDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = () => {
      const dbStore = request.result;
      if (!dbStore.objectStoreNames.contains(unfinishedSurveysStoreName)) {
        const store = dbStore.createObjectStore(unfinishedSurveysStoreName, {
          keyPath: "id",
        });
        store.createIndex("status", "status", { unique: false });
      }
    };
  });
};

// Waiting for the transaction to complete
export const waitForTransactionCompletion = (
  transaction: IDBTransaction
): Promise<void> => {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
};

// Ensuring draft is saved in the indexedDBStorage
export const saveSurveyDraft = async (data: surveyTypeProps) => {
  const dbStore = await openSurveyDraftDB();
  const transaction = dbStore.transaction(
    unfinishedSurveysStoreName,
    "readwrite"
  );
  transaction
    .objectStore(unfinishedSurveysStoreName)
    .put({ ...data, updatedAt: new Date().toISOString(), status: "draft" } as surveyTypeProps);
  await waitForTransactionCompletion(transaction).then(() => true);
};

// Gets saved survey draft from the indexedDBStorage
export const getSurveyDrafts = async (
  id: string
): Promise<surveyTypeProps | null> => {
  const dbStore = await openSurveyDraftDB();
  return new Promise((resolve, reject) => {
    const transaction = dbStore.transaction(
      unfinishedSurveysStoreName,
      "readonly"
    );
    const draftRequest = transaction
      .objectStore(unfinishedSurveysStoreName)
      .get(id);
    draftRequest.onerror = () => reject(draftRequest.error);
    draftRequest.onsuccess = () => {
      if (draftRequest.result) {
        resolve(draftRequest.result as surveyTypeProps);
      } else {
        resolve(null);
      }
    };
  });
};

// Gets all saved survey drafts from the indexedDBStorage
export const getAllSurveyDrafts = async (): Promise<surveyTypeProps[]> => {
  const dbStore = await openSurveyDraftDB();
  return new Promise((resolve, reject) => {
    const transaction = dbStore.transaction(
      unfinishedSurveysStoreName,
      "readonly"
    );
    const draftRequest = transaction
      .objectStore(unfinishedSurveysStoreName)
      .getAll();
    draftRequest.onerror = () => reject(draftRequest.error);
    draftRequest.onsuccess = () => {
      resolve(draftRequest.result as surveyTypeProps[]);
    };
  });
};

// Deletes a survey draft from the indexedDBStorage
export const deleteSurveyDraft = async (id: string) => {
  const dbStore = await openSurveyDraftDB();
  const transaction = dbStore.transaction(
    unfinishedSurveysStoreName,
    "readwrite"
  );
  transaction.objectStore(unfinishedSurveysStoreName).delete(id);
  await waitForTransactionCompletion(transaction);
};
