import React from "react";
// import AppNavbarOverviewChamberSection from './appNavbarOverviewChamberSection'
// import AppNavbarTrendTagChamberSection from './appNavbarTrendTagChamberSection'
// import AppNavbarPersonalChamberSection from './appNavbarPersonalChamberSection'
import style from "./homeAppLayout.module.css";
import logo from "../../assets/images/FieldHiva-logo.png";
import { FiLogOut } from "react-icons/fi";
import { SidebarLink } from "../../Components/SidebarLink";
import { TbLayoutDashboard, TbLayoutDashboardFilled } from "react-icons/tb";
import { RiSurveyLine, RiSurveyFill } from "react-icons/ri";
import { AiOutlineProject, AiFillProject } from "react-icons/ai";
import { SiGoogleanalytics } from "react-icons/si";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FiActivity } from "react-icons/fi";
import { LuSquareActivity } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { TbHelpCircleFilled } from "react-icons/tb";
import { TbHelpCircle } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io";
import { IoChatboxEllipsesOutline, IoChatboxEllipses } from "react-icons/io5";


const HomeAsideLayout: React.FC = function () {
  return (
    <aside className={style.appNav_aside_wrapper}>
      <div className={style.appNav_aside_topWrapper}>
        <section className={style.appNav_aside_logoContainer}>
          <img
            src={logo}
            className={style.appNav_aside_logo}
            alt="DataHivA"
          />
          <h2 className={style.appNav_aside_h2}>
            Data<span>HivA</span>
          </h2>
        </section>
        <div className={style.appNav_aside_linkWrapper}>
          <SidebarLink
            To={"/dashboard"}
            DefaultIcon={TbLayoutDashboard}
            ActiveIcon={TbLayoutDashboardFilled}
            Label={"Dashboard"}
          />
          <SidebarLink
            To={"/projects"}
            DefaultIcon={AiOutlineProject}
            ActiveIcon={AiFillProject}
            Label={"Projects"}
          />
          <SidebarLink
            To={"/surveys"}
            DefaultIcon={RiSurveyLine}
            ActiveIcon={RiSurveyFill}
            Label={"Surveys"}
          />
          <SidebarLink
            To={"/chats"}
            DefaultIcon={IoChatboxEllipsesOutline}
            ActiveIcon={IoChatboxEllipses}
            Label={"Chats"}
          />
          <SidebarLink
            To={"/analytics"}
            DefaultIcon={TbBrandGoogleAnalytics}
            ActiveIcon={SiGoogleanalytics}
            Label={"Analytics"}
          />
          <SidebarLink
            To={"/notifications"}
            DefaultIcon={IoIosNotificationsOutline}
            ActiveIcon={IoIosNotifications}
            Label={"Notifications"}
          />
          <SidebarLink
            To={"/activity"}
            DefaultIcon={FiActivity}
            ActiveIcon={LuSquareActivity}
            Label={"Activity"}
          />
        </div>
        <p className={style.appNav_aside_linkTools}>Tools</p>
        <div className={style.appNav_aside_linkWrapper}>
          <SidebarLink
            To={"/settings"}
            DefaultIcon={IoSettingsOutline}
            ActiveIcon={IoSettings}
            Label={"Settings"}
          />
          <SidebarLink
            To={"/resources"}
            DefaultIcon={TbHelpCircle}
            ActiveIcon={TbHelpCircleFilled}
            Label={"Resources"}
          />
          <SidebarLink
            To={"/account"}
            DefaultIcon={FaRegUser}
            ActiveIcon={FaUser}
            Label={"Manage User"}
          />
        </div>
      </div>
      <section
        aria-label="logout button"
        className={style.appNav_aside_logoutContainer}
      >
        <FiLogOut style={{ fontSize: 20, color: `var(--color-border)` }} />
        <p className={style.appNav_aside_h3}>Logout</p>
      </section>
    </aside>
  );
};

export default HomeAsideLayout;
