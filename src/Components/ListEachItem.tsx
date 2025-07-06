import React from "react";
import SpinIcon2 from "../Middlewares/SpinIcon/SpinIcon2";
import style from "./ProjectsComponents/projectComponent.module.css";
import ListEachItemOtherProps from "./ListEachItemOtherProps";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { BsPersonCheck } from "react-icons/bs";
import { FcSurvey } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";
import ProgressBarItem from "./ProjectsComponents/ProgressBarItem";

type ListEachItemProp = {
  sectionType: string;
};

const ListEachItem: React.FC<ListEachItemProp> = ({ sectionType }) => {
  return (
    <section className={style.listEachItem_wrapper}>
      <div className={style.listEachItem_name_container}>
        <SpinIcon2 />
        <p>Demo Name - Project Name</p>
      </div>
      <div className={style.listEachItem_otherProps_wrapper}>
        {sectionType === "projectArray" && (
          <>
            <ProgressBarItem completed={5} total={8} toolTip="Progress" />{" "}
            {/* Progress Bar */}
            <ListEachItemOtherProps
              Icon={FcSurvey}
              numberValue={10}
              toolTip="Number of Surveys"
            />{" "}
            {/* Number of surveys on the project */}
          </>
        )}
        <ListEachItemOtherProps
          Icon={MdOutlinePeopleOutline}
          numberValue={2}
          toolTip="Number of Collaborators"
        />{" "}
        {/* Number of Collaborators */}
        <ListEachItemOtherProps
          Icon={BsPersonCheck}
          stringValue={"Collaborator"}
          toolTip="Role"
        />{" "}
        {/* Number of Collaborators */}
        <ListEachItemOtherProps Icon={RiFileEditFill} toolTip="Edit" />{" "}
        {/* Edit Button */}
        <ListEachItemOtherProps Icon={MdDelete} toolTip="Delete" />{" "}
        {/* Delete Button */}
      </div>
    </section>
  );
};

export default ListEachItem;
