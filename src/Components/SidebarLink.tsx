import { NavLink } from "react-router-dom";
import style from "./components.module.css";
import { IconType } from "react-icons";

type SidebarLinkProps = {
  To: string; // Path for navigation
  DefaultIcon: IconType; // Default icon
  ActiveIcon: IconType; // Icon to display when active
  Label: string; // Text label
};


export const SidebarLink = ({ To, DefaultIcon, ActiveIcon, Label }: SidebarLinkProps) => {
  return (
    <section>
      <NavLink
        to={To}
        className={({ isActive }) =>
          `${style.appNav_aside_linkContainer} ${
            isActive ? style.sidebar_link_active : style.sidebar_link_inactive
          }`
        }
      >
        <ActiveIcon
          className={style.appNav_aside_activelinkIcon}
          style={{ color: `var(--navy-blue)`, fontSize: 20 }}
        />
        <DefaultIcon
          className={style.appNav_aside_inactivelinkIcon}
          style={{ color: `var(--color-background)`, fontSize: 20 }}
        />
        <p>{Label}</p>
      </NavLink>
    </section>
  );
};
