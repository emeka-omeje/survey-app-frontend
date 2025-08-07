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
  const toastIdRef = React.useRef<string | null>(null);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      onMounted.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      toast.dismiss(toastIdRef.current ?? undefined);
      toastIdRef.current = null;
    };
  }, []);

  React.useEffect(() => {
    if (!data.isDirty) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      try {
        if (!toastIdRef.current) {
          toastIdRef.current = toast.loading("Saving...");
        }

        const currentSerialized = JSON.stringify(data);
        if (currentSerialized === prevSerializedRef.current) {
          toast.dismiss(toastIdRef.current ?? undefined);
          toastIdRef.current = null;
          return;
        };
        prevSerializedRef.current = currentSerialized;

        await saveSurveyDraft(data);
        markClean();

        if (!onMounted.current) return;

        toast.success("Autosaved survey draft", { id: toastIdRef.current });
        toastIdRef.current = null;
      } catch (error) {
        console.error("Auto-save (local) failed:", error);

        if (!navigator.onLine) {
          addToDraftSurveyQueue(data);
          toast.error("Offline: will sync when back online.", {
            id: toastIdRef.current ?? undefined,
          });
        } else {
          toast.error("Autosave failed", {
            id: toastIdRef.current ?? undefined,
          });
        }
        toastIdRef.current = null;
      }
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [data.isDirty, delay]);
};
