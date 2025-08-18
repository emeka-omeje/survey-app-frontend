import LogicTypeRouter from "../../Components/SurveysComponents/LogicPageComponents/LogicTypeRouter";
import LogicTypeSelectComponent from "../../Components/SurveysComponents/LogicPageComponents/LogicTypeSelectComponent";
import style from "./createSurveyPages.module.css";

const LogicPage = () => {
  const logicTypeSelectArray: string[] = [
    "Skip/Branch",
    "Display",
    "Scoring",
    "Piping",
    "Default Values",
    "Quotas",
    "Randomisation",
    "Validation",
    "Test Mode",
  ];
  //   const location = useLocation();
  return (
      <section className={style.logicPage_wrapper}>
        <LogicTypeSelectComponent logicTypeSelectArray={logicTypeSelectArray} />
        <LogicTypeRouter />
    </section>
  );
};

export default LogicPage;
