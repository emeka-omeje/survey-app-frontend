import { retryAddToUnpublishedSurveyQueue, retryAddToDraftSurveyQueue } from "./ManualSave";

const handleOnlineStatus = () => {
  retryAddToUnpublishedSurveyQueue();
  retryAddToDraftSurveyQueue();
};

window.addEventListener("online", handleOnlineStatus);

// Cleanup function to remove the event listener when the component unmounts
window.removeEventListener("online", handleOnlineStatus);

window.addEventListener("offline", () => {
  console.warn("You are offline.");
  //   console.warn("You are offline. Surveys will be queued for later sync.");
});