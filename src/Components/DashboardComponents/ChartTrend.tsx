import style from "./dashboardComponent.module.css";

type ChartTrendProps = {
    title: string;
    trend: string;
}

const ChartTrend: React.FC<ChartTrendProps> = ({title, trend})=>{
    return (
        <section className={style.chart_trend_wrapper}>
            <h3>{title} Trend</h3>
            <hr className={style.chart_trend_line} />
            <p>There is no {trend} trend on display at the moment. Expect soonest 🤝</p>
        </section>
    )
}

export default ChartTrend