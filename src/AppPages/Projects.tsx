import ListEachItem from "../Components/ListEachItem";
import ProjectContentHeader from "../Components/ProjectsComponents/ProjectContentHeader";
import ProjectHeader from "../Components/ProjectsComponents/ProjectHeader";
import style from "./appPages.module.css";

const ProjectsPage = () => {
  return (
    <main className={style.projects_main}>
      <ProjectHeader />
      <hr />
      <div className={style.projectContent_wrapper}>
        <ProjectContentHeader />
        <hr />
        <ListEachItem sectionType="projectArray" />
      </div>
    </main>
  );
};

export default ProjectsPage;
