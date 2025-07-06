import React from "react";

import { IoSearch } from "react-icons/io5";
import { MdOutlineNotificationsNone } from "react-icons/md";
import style from "./homeAppLayout.module.css";
// import UserNameTag from "../../Components/UserNameTag";
import NavigationTabName from "../../Components/NavigationTabName";
import NavigationUserTag from "../../Components/NavigationUserTag";

const HomeNavLayout: React.FC = ()=> {

  return (
    <section className={style.appNav_top_layout_wrapper}>
      <NavigationTabName />

      {/* <UserNameTag username={"MalcomDex"} /> */}

      {/* Container for notification icon and user image */}
      <div className={style.appNav_top_layout_container}>

        {/* SearchBar component for searching */}
        <div className={style.appNav_top_layout_searchbar_container}>
          <IoSearch style={{ fontSize: 20 }} />
        </div>

        {/* Notification icon */}
        <div className={style.appNav_top_layout_notificationIcon_container}>
          <MdOutlineNotificationsNone style={{ fontSize: 20 }} />
        </div>

        {/* Placeholder for user image */}
        <NavigationUserTag />
      </div>
    </section>
  );
};

export default HomeNavLayout;
