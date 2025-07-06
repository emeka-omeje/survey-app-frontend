import style from "./dashboardComponent.module.css";

type OverviewCardsProps = {
  backgroundColor: string;
  label: string;
};

const OverviewCards: React.FC<OverviewCardsProps> = ({ backgroundColor, label}) => {
  return (
    <section className={style.overview_cardWrapper} style={{ backgroundColor: `var(--${backgroundColor})` }}>
      <div className={style.overview_cardContainer}>
        <h3 className={style.overview_card_h3}>0.00</h3>
        <p className={style.overview_card_label}>Surveys {label}</p>
      </div>
      <div className={style.overview_cardContainer}>
        <h4 className={style.overview_card_percent}>+0% increase</h4>
        <p className={style.overview_card_month}>This month</p>
      </div>
    </section>
  );
};

export default OverviewCards;
