import React from "react";
import style from "./SurveysComponents/surveyComponent.module.css";

// type ItemOwnershipNavigatorProps = {
//   Item1: string;
//   Item2: string;
// };

// const ItemOwnershipNavigator: React.FC<ItemOwnershipNavigatorProps> = ({
const ItemOwnershipNavigator: React.FC = () => {
  const [activeBTN, setActiveBTN] = React.useState("All");
  return (
    <div className={style.itemOwershipNavigator_wrapper}>
      {["All", "Created", "Collaborated"].map((item, index) => (
        <button key={index}
          className={`${style.itemOwershipNavigator_item} ${
            activeBTN === item ? style.toggle_active : style.toggle_inactive
          }`}
          onClick={()=>setActiveBTN(item)}
        >
          {item}
        </button>
      ))}
      {/* <button className={style.itemOwershipNavigator_item}>{Item2}</button> */}
    </div>
  );
};

export default ItemOwnershipNavigator;
