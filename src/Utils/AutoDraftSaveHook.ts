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
  // const onMounted = React.useRef<boolean>(true);
  const prevSerializedRef = React.useRef<string>(JSON.stringify(data));
  const toastIdRef = React.useRef<string | null>(null);
  const firstRunRef = React.useRef(true);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      // onMounted.current = false;
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
        const currentSerialized = JSON.stringify(data);

        if (firstRunRef.current === true) {
          firstRunRef.current = false;
          prevSerializedRef.current = currentSerialized;
          return;
        }

        if (currentSerialized === prevSerializedRef.current) {
          toast.dismiss(toastIdRef.current ?? undefined);
          toastIdRef.current = null;
          return;
        }

        if (!toastIdRef.current) {
          toastIdRef.current = toast.loading("Saving...");
        }

        prevSerializedRef.current = currentSerialized;

        const savedToDraftSuccess = await saveSurveyDraft(data);
        markClean();

        if (savedToDraftSuccess) {
          toast.success("Draft saved", { id: toastIdRef.current });
        } else {
          toast.error("Draft not saved", { id: toastIdRef.current });
        }
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
      } finally {
        toastIdRef.current = null; // ensure toastId is cleared after handling
      }
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [data, data.isDirty, delay]);
};
