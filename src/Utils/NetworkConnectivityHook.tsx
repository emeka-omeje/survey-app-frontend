import React from "react";
import { retryAddToUnpublishedSurveyQueue, retryAddToDraftSurveyQueue } from "./ManualSave";
import toast from "react-hot-toast";

export const useNetworkConnectivityHook = () => {
  const [isNetworkConnected, setIsNetworkConnected] = React.useState<boolean>(navigator.onLine);
  const retryCallRef = React.useRef<number | null>(null);

  const handleOnlineStatus = React.useCallback(async () => {
    if (navigator.onLine) return;
    setIsNetworkConnected(true);

    toast.success('Back online. Syncing queued work...');

    if (retryCallRef.current) clearTimeout(retryCallRef.current);

    retryCallRef.current = setTimeout(async () => {
      try {
        await retryAddToUnpublishedSurveyQueue()
      } catch (error) {
        console.error("Unpublished queue retry failed", error);
        toast.error('Failed to sync unpublished surveys. Will retry.');
      }

      try {
        await retryAddToDraftSurveyQueue()
      } catch (error) {
        console.error('Draft queue retry failed', error);
        toast.error('Failed to sync draft surveys. Will retry.');
      }
    }, 300);
  }, []);


  const handleOfflineStatus = React.useCallback(() => {
    setIsNetworkConnected(false);
    toast.error('You are offline. Surveys will be queued for later sync.');
  }, []);

  React.useEffect(() => {
    if (navigator.onLine) {
      handleOnlineStatus();
    } else {
      handleOfflineStatus();
    }

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOfflineStatus);

    return ()=> {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOfflineStatus);
      if(retryCallRef.current) clearTimeout(retryCallRef.current);
    }
  }, [handleOnlineStatus, handleOfflineStatus]);
  
  return { isNetworkConnected };
}