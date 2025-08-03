import { surveyTypeProps } from "./dataTypes";
import { saveSurveyDraft } from "./IndexDBs/surveyDraftIndexDBStorage";
// import toast from "react-hot-toast";
const UNPUBLISHED_QUEUE_KEY = "unpublishedSurveySyncQueue";
const DRAFT_QUEUE_KEY = "draftSurveySyncQueue";

// Function to get unpublished or drafted surveys from localStorage
const getSurveysFromQueue = (queue_key: string): [] => {
  const queue = localStorage.getItem(queue_key);
  return queue ? JSON.parse(queue) : [];
};

// Function to save unpublished or drafted surveys to localStorage
const saveSurveysToQueue = (queue: surveyTypeProps[], queue_key: string) => {
  localStorage.setItem(queue_key, JSON.stringify(queue));
};

// Function to empty the unpublished or drafted surveys queue
export const emptyUnplishedSurveyQueue = () => {
  localStorage.removeItem(UNPUBLISHED_QUEUE_KEY);
};
export const emptyDraftSurveyQueue = () => {
  localStorage.removeItem(DRAFT_QUEUE_KEY);
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Function to add a survey to the draft queue
export const addToDraftSurveyQueue = (surveyData: surveyTypeProps) => {
  const prevSurveyQueue = getSurveysFromQueue(DRAFT_QUEUE_KEY);
  const updatedQueue:surveyTypeProps[] = [
    ...prevSurveyQueue,
    { ...surveyData, modifiedAt: new Date().toISOString(), status: "offline" },
  ];
  saveSurveysToQueue(updatedQueue, DRAFT_QUEUE_KEY);
};

export const addToUnpublishedSurveyQueue = (surveyData: surveyTypeProps) => {
  const prevSurveyQueue = getSurveysFromQueue(UNPUBLISHED_QUEUE_KEY);
  const updatedQueue: surveyTypeProps[] = [
    ...prevSurveyQueue,
    { ...surveyData, modifiedAt: new Date().toISOString(), status: "in-progress" },
  ];
  saveSurveysToQueue(updatedQueue, UNPUBLISHED_QUEUE_KEY);
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const retryAddToUnpublishedSurveyQueue = async () => {
  if (!navigator.onLine) return;

  const prevSurveyQueue = getSurveysFromQueue(UNPUBLISHED_QUEUE_KEY);
  if (prevSurveyQueue.length === 0) return;
  try {
    for (const survey of prevSurveyQueue) {
      // Assuming saveSurveyDraft is a function that saves the survey to the server
      await saveSurveyDraft(survey); // Later replace with backend API call
    }
    // Clear the queue after successful save
    saveSurveysToQueue([], UNPUBLISHED_QUEUE_KEY);
  } catch (error) {
    console.error("Failed sync:", error);
    saveSurveysToQueue(prevSurveyQueue, UNPUBLISHED_QUEUE_KEY); // Keep the queue intact if save fails
  }
};

export const retryAddToDraftSurveyQueue = async () => {
  if (!navigator.onLine) return;

  const prevSurveyQueue = getSurveysFromQueue(DRAFT_QUEUE_KEY);
  if (prevSurveyQueue.length === 0) return;
  try {
    for (const survey of prevSurveyQueue) {
      // SaveSurveyDraft is a function that saves the survey to indexedDB
      await saveSurveyDraft(survey);
    }
    // Clear the queue after successful save
    saveSurveysToQueue([], DRAFT_QUEUE_KEY);
  } catch (error) {
    console.error("Failed sync:", error);
    saveSurveysToQueue(prevSurveyQueue, DRAFT_QUEUE_KEY); // Keep the queue intact if save fails
  }
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>