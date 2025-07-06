import style from "./dashboardComponent.module.css";
import { IoCreateOutline } from "react-icons/io5";
import CreateNewBTN from "../CreateNewBTN";
import DayToYearAnalyzeToggler from "../DayToYearAnalyzeToggler";
import React from "react";

// type UsernameTagProps = {
//   username: string;
// };

// const UsernameTag = ({ username }: UsernameTagProps) => {
const DashboardContentHeader = () => {
  const [buttonName, setButtonName] = React.useState("Daily");

  return (
    <div className={style.dashboardContent_tag}>
      {/* <div className={style.dashboardContent_tag_container}>
        <p>An overview of your acitivities.</p> */}
        <section className={style.togglerWrapper}>
          {["Daily", "Weekly", "Monthly", "Yearly"].map((item) => (
            <DayToYearAnalyzeToggler
              key={item}
              ItemName={item}
              isActive={buttonName === item}
              setButtonName={setButtonName}
            />
          ))}
        </section>
      {/* </div> */}

      <CreateNewBTN
      LinkTag="create"
        Title="Create New Survey"
        Icon={IoCreateOutline}
        IconColor="primary-white"
      />
    </div>
  );
};

export default DashboardContentHeader;
