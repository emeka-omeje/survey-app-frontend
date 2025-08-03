import React from "react";
import { saveSurveyDraft } from "./IndexDBs/surveyDraftIndexDBStorage";
import { AutoDraftSaveHookProps } from "./dataTypes";
import toast from "react-hot-toast";
import { addToDraftSurveyQueue } from "./ManualSave";

export const useAutoDraftSaveHook = ({
  data,
  markClean,
  delay,
}: AutoDraftSaveHookProps): void => {
  const timeoutRef = React.useRef<number | null>(null);
  const onMounted = React.useRef<boolean>(true);
  const prevSerializedRef = React.useRef<string>(JSON.stringify(data));
  const toastId = toast.loading("Saving...");
  const toastIdRef = React.useRef<string | null>(null);


  // Cleanup function to clear the timeout and reset the mounted state
  React.useEffect(() => {
    return () => {
      onMounted.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
        toastIdRef.current = null;
      }
    }
  }, []);

  React.useEffect(() => {
    // If the data is not dirty, we do not need to auto-save
    if (!data.isDirty) return;

    // Clear the previous timeout if it exists
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Set a new timeout to auto-save the survey draft
    timeoutRef.current = setTimeout(async () => {
      try {
        if (!toastIdRef.current) {
          toastIdRef.current = toastId;
        } else {
          toast.loading("Autosaving draft...", { id: toastIdRef.current });
        }

        // Check if the data has changed since the last save
        const currentSerialized = JSON.stringify(data);
        if (currentSerialized === prevSerializedRef.current) return;
        prevSerializedRef.current = currentSerialized;

        // Save the survey draft to IndexedDB
        await saveSurveyDraft(data);
        markClean(); // Mark the data as clean after a successful save; This comes before onMounted sincere my markClean function is: markClean: () => setSurveyData((prev) => ({ ...prev, isDirty: false }))
        if(!onMounted.current) return; // This prevent any UI updates if component is unmounted
        toast.success("Autosaved survey draft", { id: toastIdRef.current });
        toastIdRef.current = null;
      } catch (error) {
        console.error('Auto-save (local) failed:', error);
        addToDraftSurveyQueue(data)
        toast.error("Autosave failed", { id: toastId });
      }
    }, delay);

    // Cleanup function to clear the timeout when the component unmounts or dependencies change
    // This prevents memory leaks and ensures that the timeout does not persist longer than necessary
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [data, data.isDirty, delay]);
};
