import { Location, useLocation } from "react-router-dom";
import style from "./components.module.css"

interface Link {
  to: string; // The route path
  label: string; // The label for the link
}

const linksLabel: Link[] = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/surveys", label: "Surveys" },
  { to: "/projects", label: "Projects" },
  { to: "/analytics", label: "Analytics" },
  { to: "/activity", label: "Activity" },
  { to: "/settings", label: "Settings" },
  { to: "/resources", label: "Resources" },
  { to: "/user", label: "User Profile" },
  { to: "/notifications", label: "Notifications" },
  { to: "/chats", label: "Chats" },
];

const NavigationTabName = () => {
  const location: Location = useLocation();

  // Find the active link based on the current pathname
  const activeLink = linksLabel.find((link) => link.to === location.pathname);

  if (!activeLink) {
    console.warn(`No label found for path: ${location.pathname}`);
  }
  
  // Get the label or a default value
  const activeLabel = activeLink ? activeLink.label : "Unknown Page";

  return <h1 className={style.NavigationTabName_h1}>{activeLabel}</h1>;
};

export default NavigationTabName;
