import { surveyTypeProps } from "./dataTypes";
import { saveSurveyDraft } from "./IndexDBs/surveyDraftIndexDBStorage";
// import toast from "react-hot-toast";
const QUEUE_KEY = "surveySyncQueue";

const getSurveyFromQueue = (): [] => {
  const queue = localStorage.getItem(QUEUE_KEY);
  return queue ? JSON.parse(queue) : [];
};

const saveSurveyToQueue = (queue: surveyTypeProps[]) => {
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const addToSurveyQueue = (surveyData: surveyTypeProps) => {
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
export const emptySurveyQueue = () => {
  localStorage.removeItem(QUEUE_KEY);
  // Optionally, you can also notify the user that the queue has been emptied
  // toast.success("Survey queue has been emptied.");
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
window.addEventListener("online", retryAddToSurveyQueue);
window.addEventListener("offline", () => {
  console.warn("You are offline.");
  //   console.warn("You are offline. Surveys will be queued for later sync.");
});
