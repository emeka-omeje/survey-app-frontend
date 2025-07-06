import ChartTrend from "../Components/DashboardComponents/ChartTrend";
import ListingItems from "../Components/DashboardComponents/ListingItems";
import OverviewCards from "../Components/DashboardComponents/OverviewCards";
import DashboardContentHeader from "../Components/DashboardComponents/DashboardContentHeader";
import style from "./appPages.module.css";
// import { GiMovementSensor } from "react-icons/gi";

const Dashboard = () => {
  return (
    <main className={style.dashboard_main}>
      <div className={style.fullPage_scroll}>
        <div className={style.dashboard_main_wrapper_1}>
          <DashboardContentHeader />
          <section className={style.dashboard_main_container_overview}>
            <OverviewCards
              label="created"
              backgroundColor="color-secondary-alt"
            />
            <OverviewCards
              label="participated"
              backgroundColor="color-primary-alt"
            />
            <OverviewCards label="completed" backgroundColor="color-grey-alt" />
          </section>
          <section className={style.dashboard_main_container_trends}>
            <ChartTrend title="Participation" trend="participation" />
            <ChartTrend title="Completion" trend="completion" />
          </section>
        </div>
      </div>
      <div className={style.fullPage_scroll}>
      <div className={style.dashboard_main_wrapper_2}>
        <ListingItems title="Ongoing" tag="ongoing" />
        <ListingItems title="Explore" tag="explore" />
      </div>
      </div>
    </main>
  );
};

export default Dashboard;
