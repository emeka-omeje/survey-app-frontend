import React from "react";
import { saveSurveyDraft } from "./indexDBStorage";
import { AutoSaveHookProps } from "./dataTypes";
import toast from "react-hot-toast";

export const useAutoSaveHook = ({
    data,
    markClean,
    delay,
  }: AutoSaveHookProps): void => {
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
  