import React from "react";
import style from "./createSurveyPages.module.css";
import BuilderContentHeader from "../../Components/SurveysComponents/builderPageComponents/BuilderContentHeader";
import BuilderContentBody from "../../Components/SurveysComponents/builderPageComponents/BuilderContentBody";
import { useBuilderPageFxns } from "../../Utils/useBuilderPageFxns";
// import { useAppStateMgtContext } from "../../Utils/AppContext";
// import { useAutoDraftSaveHook } from "../../Utils/AutoDraftSaveHook";
// import { getSurveyDraftById } from "../../Utils/IndexDBs/surveyDraftIndexDBStorage";

const BuilderPage = () => {
  // const {
  //   surveyData,
  //   setSurveyData,
  //   sections,
  //   setSections,
  //   surveyTitle,
  //   setSurveyTitle,
  //   hydrated,
  //   setHydrated,
  // } = useAppStateMgtContext();


  const {
    addSection,
    deleteSection,
    addQuestionFrameToSection,
    addQuestionFrameToLastSection,
    onRemoveQuestionFrame,
  } = useBuilderPageFxns();

  // // Store the current survey ID in localStorage whenever it changes
  // // This allows the application to persist the survey ID across sessions and reloads.
  // // It ensures that the survey ID is always available for reference and can be used to retrieve
  // // the survey data from the database or local storage.
  // React.useEffect(() => {
  //   localStorage.setItem("currentSurveyID", surveyData.id);
  // }, [surveyData.id]);

  // // This effect is used to fetch the survey drafts from IndexedDB when the component mounts.
  // // It retrieves the survey drafts and sets the initial state of the survey data.
  // React.useEffect(() => {
  //   (async () => {
  //     const currentSurveyId = localStorage.getItem("currentSurveyID");
  //     if (currentSurveyId) {
  //       const surveyDrafts = await getSurveyDraftById(currentSurveyId);
  //       if (surveyDrafts) {
  //         setSurveyData(surveyDrafts);
  //         setSections(surveyDrafts.sections || []);
  //         setSurveyTitle(surveyDrafts.title || "");
  //       }
  //     }
  //     setHydrated(true);
  //   })();
  // }, []);

  // // Auto-save the survey data whenever sections or surveyTitle changes
  // // This ensures that the survey data is always up-to-date and reflects the latest changes made
  // // by the user in the builder page.
  // React.useEffect(() => {
  //   console.log("Auto-saving survey data...1");
  //   if (!hydrated) return;
  //       console.log("Auto-saving survey data...2");
  //   setSurveyData((prev) => {
  //     if (prev.sections !== sections || prev.title !== surveyTitle) {
  //       return {
  //         ...prev,
  //         sections: sections,
  //         title: surveyTitle,
  //         modifiedAt: new Date().toISOString(),
  //         isDirty: true, // Mark the survey as dirty when changes are made
  //       };
  //     }
  //     return prev; // No changes, return previous state
  //   });
  // }, [sections, surveyTitle, hydrated]);

  // // Use the custom hook for auto-saving the survey draft
  // // This hook will automatically save the survey draft to IndexedDB whenever the survey data is dirty
  // // and will mark it as clean after a successful save.
  // useAutoDraftSaveHook({
  //   data: surveyData,
  //   markClean: () => setSurveyData((prev) => ({ ...prev, isDirty: false })),
  //   delay: 3000,
  // });

  return (
    <section className={style.builderPage_wrapper}>
      <section className={style.builderPage_header}>
        <BuilderContentHeader
          // onAddQuestion={addQuestionFrame}
          addSection={addSection}
          addQuestionFrameToSection={addQuestionFrameToSection}
          addQuestionFrameToLastSection={addQuestionFrameToLastSection}
        />
      </section>
      <BuilderContentBody
        addSection={addSection}
        addQuestionFrameToSection={addQuestionFrameToSection}
        // chooseDiffQuestionType={chooseDiffQuestionType}
        onRemoveQuestionFrame={onRemoveQuestionFrame}
        deleteSection={deleteSection}
      />
    </section>
  );
};

export default BuilderPage;
