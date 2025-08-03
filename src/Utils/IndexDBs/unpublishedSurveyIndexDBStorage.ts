import { surveyTypeProps } from "./../dataTypes";
import {
  openSurveyDraftDB,
  waitForTransactionCompletion,
  unfinishedSurveysStoreName,
} from "./surveyDraftIndexDBStorage";

// To retrieve all unpublished surveys from the indexedDBStorage
export const getAllUnpublishedSurveys = async (): Promise<surveyTypeProps[]> => {
  try {
    const dbStore = await openSurveyDraftDB();

    return await new Promise((resolve, reject) => {
      const transaction = dbStore.transaction(unfinishedSurveysStoreName, "readonly");
      const store = transaction.objectStore(unfinishedSurveysStoreName);
      const index = store.index("status");

      const request = index.getAll("in-progress");

      request.onsuccess = () => {
        const result = request.result || [];
        resolve(result as surveyTypeProps[]);
      };

      request.onerror = () => {
        console.error("Failed to fetch unpublished surveys:", request.error);
        reject(request.error);
      };
    });
  } catch (err) {
    console.error("Unexpected error during retrieval:", err);
    return []; // Safe fallback in enterprise systems
  }
};


// To save all unpublished surveys to the indexedDBStorage
export const saveAllUnpublishedSurveys = async (
  data: surveyTypeProps[]
): Promise<void> => {
  if (!data.length) return;

  const db = await openSurveyDraftDB();
  const transaction = db.transaction(unfinishedSurveysStoreName, "readwrite");
  const store = transaction.objectStore(unfinishedSurveysStoreName);

  try {
    for (const survey of data) {
      store.put({
        ...survey,
        modifiedAt: new Date().toISOString(),
        status: "in-progress",
      });
    }

    await waitForTransactionCompletion(transaction);
  } catch (error) {
    console.error("Failed to save unpublished surveys:", error);
    throw error;
  }
};


// Deletes surveys after they have been published, from the indexedDBStorage
export const deleteAllPublishedSurveys = async (): Promise<void> => {
  const db = await openSurveyDraftDB();
  const transaction = db.transaction(unfinishedSurveysStoreName, "readwrite");
  const store = transaction.objectStore(unfinishedSurveysStoreName);
  const index = store.index("status");

  const request = index.getAll("published");

  return new Promise((resolve, reject) => {
    request.onsuccess = async () => {
      const publishedSurveys = request.result as surveyTypeProps[];

      for (const survey of publishedSurveys) {
        store.delete(survey.id); // delete by primary key
      }

      try {
        await waitForTransactionCompletion(transaction);
        resolve();
      } catch (error) {
        console.error("Transaction error during delete:", error);
        reject(error);
      }
    };

    request.onerror = () => {
      console.error("Error querying published surveys:", request.error);
      reject(request.error);
    };
  });
};

