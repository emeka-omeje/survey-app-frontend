import { Location, Outlet, useLocation } from "react-router-dom";
import ListEachItem from "../Components/ListEachItem";
import SurveyContentHeader from "../Components/SurveysComponents/SurveyContentHeader";
import SurveyHeader from "../Components/SurveysComponents/SurveyHeader";
import style from "./appPages.module.css";

const SurveysPage = () => {
  const location: Location = useLocation();

  return (
    <>
    {location.pathname === "/surveys" ? (
      <main className={style.projects_main}>
      <SurveyHeader />
      <hr />
      <div className={style.surveyContent_wrapper}>
        <div className={style.surveyContent_container}>
          <SurveyContentHeader />
          <hr />
          <div className={style.listScroll}>
            <ListEachItem sectionType="surveysArray" />
          </div>
        </div>
        <div className={style.surveyContent_container}></div>
      </div>
    </main>
  ) : (
    <Outlet />
  )}
    </>
  );
};

export default SurveysPage;
