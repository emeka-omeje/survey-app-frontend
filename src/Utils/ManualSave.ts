import { surveyDraftTypeProps } from "./dataTypes";
import { saveSurveyDraft } from "./indexDBStorage";
// import toast from "react-hot-toast";
const QUEUE_KEY = "surveySyncQueue";


const getSurveyFromQueue = (): [] => {
  const queue = localStorage.getItem(QUEUE_KEY);
  return queue ? JSON.parse(queue) : [];
};

const saveSurveyToQueue = (queue: surveyDraftTypeProps[]) => {
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const addToSurveyQueue = (surveyData: surveyDraftTypeProps) => {
  const prevSurveyQueue = getSurveyFromQueue();
  const updatedQueue = [
    ...prevSurveyQueue,
    { ...surveyData, queuedAt: new Date().toISOString() },
  ];
  saveSurveyToQueue(updatedQueue);
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const retryAddToSurveyQueue = async () => {
  if (!navigator.onLine) return;

  const prevSurveyQueue = getSurveyFromQueue();
  if (prevSurveyQueue.length === 0) return;
  try {
    for (const survey of prevSurveyQueue) {
      // Assuming saveSurveyDraft is a function that saves the survey to the server
      await saveSurveyDraft(survey); // Later replace with backend API call
    }
    // Clear the queue after successful save
    saveSurveyToQueue([]);
  } catch (error) {
    console.error("Failed sync:", error);
    saveSurveyToQueue(prevSurveyQueue); // Keep the queue intact if save fails
  }
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
window.addEventListener("online", retryAddToSurveyQueue);
window.addEventListener("offline", () => {
  console.warn("You are offline.");
  //   console.warn("You are offline. Surveys will be queued for later sync.");
});
