import CreateNewBTN from "../CreateNewBTN";
import FilterListComponent from "../FilterListComponent";
import style from "./surveyComponent.module.css";
import { IoCreateOutline } from "react-icons/io5";

const SurveyHeader = () => {
  return (
    <div className={style.surveyHeader_wrapper}>
      <CreateNewBTN
      LinkTag="/surveys/create"
        Title="Create New Survey"
        Icon={IoCreateOutline}
        IconColor="primary-white"
      />
      <FilterListComponent />
    </div>
  );
};

export default SurveyHeader;
