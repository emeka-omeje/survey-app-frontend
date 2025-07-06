// import { Outlet } from "react-router-dom";
import CreateHeaderComponent from "../../Components/SurveysComponents/CreateHeaderComponent";
import style from "./createSurveyLayout.module.css";
import { useAppContext } from "../../Utils/AppContext";
import BuilderPage from "../../AppPages/CreateSurveyPages/BuilderPage";
import LogicPage from "../../AppPages/CreateSurveyPages/LogicPage";
import DistributionPage from "../../AppPages/CreateSurveyPages/DistributePage";

const CreateSurvey = () => {
  const { createNavBTNLabel } = useAppContext();

  return (
    <main className={style.createSurvey_main}>
      <CreateHeaderComponent />
      {/* Below are outlets --> <Outlet /> */}
      {createNavBTNLabel === "Builder" ? (
        <BuilderPage />
      ) : createNavBTNLabel === "Logic" ? (
        <LogicPage />
      ) : createNavBTNLabel === "Permission" ? (
        <DistributionPage />
      ) : null}
    </main>
  );
};

export default CreateSurvey;
