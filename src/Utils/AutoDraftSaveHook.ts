import React from "react";
import { saveSurveyDraft } from "./IndexDBs/surveyDraftIndexDBStorage";
import { AutoDraftSaveHookProps } from "./dataTypes";
import toast from "react-hot-toast";

export const useAutoDraftSaveHook = ({
  data,
  markClean,
  delay,
}: AutoDraftSaveHookProps): void => {
  const timeoutRef = React.useRef<number | null>(null);
  const toastId = toast.loading("Saving...");

  React.useEffect(() => {
    if (!data.isDirty) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      try {
        await saveSurveyDraft(data);
        markClean();
        toast.success("Autosaved survey draft", { id: toastId });
      } catch (error) {
        console.error("Auto-save failed:", error);
        toast.error("Autosave failed", { id: toastId });
      }
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [data, data.isDirty, delay]);
};
