// import { Outlet } from "react-router-dom";
import CreateHeaderComponent from "../../Components/SurveysComponents/CreateHeaderComponent";
import style from "./createSurveyLayout.module.css";
import { useAppStateMgtContext } from "../../Utils/AppContext";
import BuilderPage from "../../AppPages/CreateSurveyPages/BuilderPage";
import LogicPage from "../../AppPages/CreateSurveyPages/LogicPage";
import PermissionPage from "../../AppPages/CreateSurveyPages/PermissionPage";
import PreviewPage from "../../AppPages/CreateSurveyPages/PreviewPage";

const CreateSurvey = () => {
  const { createNavBTNLabel } = useAppStateMgtContext();

  return (
    <main className={style.createSurvey_main}>
      <CreateHeaderComponent />
      {/* Below are personally crafted outlets under the create route --> <Outlet /> ;
       || Using this approach since I still want the link:http://localhost:5173/surveys/create to still be showing*/}
      {createNavBTNLabel === "Builder" ? (
        <BuilderPage />
      ) : createNavBTNLabel === "Logic" ? (
        <LogicPage />
      ) : createNavBTNLabel === "Permission" ? (
        <PermissionPage />
      ) : createNavBTNLabel === "Preview" ? (
        <PreviewPage />
      )
        : null}
    </main>
  );
};

export default CreateSurvey;
