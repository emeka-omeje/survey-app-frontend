import CreateNewBTN from "../CreateNewBTN";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import style from "./projectComponent.module.css";
import FilterListComponent from "../FilterListComponent";

const ProjectHeader = () => {
  return (
    <div className={style.projectHeader_wrapper}>
      {/* <h1>List of projects</h1> */}
      <CreateNewBTN
        LinkTag="/create-survey"
        Title="New Project"
        Icon={LiaProjectDiagramSolid}
        IconColor="primary-white"
        PaddingRight="20"
        PaddingLeft="14"
      />
      <FilterListComponent />
    </div>
  );
};

export default ProjectHeader;
