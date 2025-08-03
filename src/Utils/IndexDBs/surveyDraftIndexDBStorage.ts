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
export const saveSurveyDraft = async (data: surveyTypeProps): Promise<boolean> => {
  try {
    const dbStore = await openSurveyDraftDB();
    const transaction = dbStore.transaction(
      unfinishedSurveysStoreName,
      "readwrite"
    );

    const store = transaction.objectStore(unfinishedSurveysStoreName);

    // Add timestamp and enforce draft status
    const payload: surveyTypeProps = {
      ...data,
      modifiedAt: new Date().toISOString(),
      isDirty: false,
      status: "draft",
    };

    store.put(payload);

    await waitForTransactionCompletion(transaction);

    return true;
  } catch (error) {
    console.error("Failed to save survey draft:", error);
    // Optionally, report error to monitoring system like Sentry
    return false;
  }
};


// Gets saved survey draft from the indexedDBStorage
export const getSurveyDraftById = async (
  id: string
): Promise<surveyTypeProps | null> => {
  try {
    const dbStore = await openSurveyDraftDB();

    return await new Promise((resolve, reject) => {
      const transaction = dbStore.transaction(
        unfinishedSurveysStoreName,
        "readonly"
      );
      const objectStore = transaction.objectStore(unfinishedSurveysStoreName);
      const request = objectStore.get(id); // Primary key lookup

      request.onsuccess = () => {
        const result = request.result;
        if (result?.status === "draft") {
          resolve(result as surveyTypeProps);
        } else {
          resolve(null); // Not a draft or not found
        }
      };

      request.onerror = () => {
        console.error("IndexedDB error on getSurveyDraftById:", request.error);
        reject(request.error);
      };
    });
  } catch (err) {
    console.error("Unexpected failure in getSurveyDraftById:", err);
    return null;
  }
};


// Gets all saved survey drafts from the indexedDBStorage
export const getAllSurveyDrafts = async (): Promise<surveyTypeProps[]> => {
  try {
    const dbStore = await openSurveyDraftDB();

    return await new Promise((resolve, reject) => {
      const transaction = dbStore.transaction(
        unfinishedSurveysStoreName,
        "readonly"
      );

      const store = transaction.objectStore(unfinishedSurveysStoreName);
      const index = store.index("status");
      const request = index.getAll("draft");

      request.onsuccess = () => {
        const results = request.result ?? [];
        resolve(results as surveyTypeProps[]);
      };

      request.onerror = () => {
        console.error("Failed to fetch survey drafts:", request.error);
        reject(request.error);
      };
    });
  } catch (err) {
    console.error("Unexpected error during draft retrieval:", err);
    return []; // Safe fallback
  }
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
