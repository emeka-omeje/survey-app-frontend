import React from "react";
import style from "./projectComponent.module.css";

type ProgressBarItemProps = {
  completed: number;
  total: number;
  toolTip?: string
};

const ProgressBarItem: React.FC<ProgressBarItemProps> = ({
  completed,
  total,
  toolTip
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [completionPercentage, setCompletionPercentage] = React.useState(0);

  React.useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      if (total <= 0) setCompletionPercentage(0);
      const percentage = (completed / total) * 100;
      setCompletionPercentage(Math.min(percentage, 100));
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [completed, total]);

  return (
    <section className={style.progressBarItem_wrapper}>
      <span className={style.ProgressBarItem_container}>
        {isLoading ? (
          <span className={style.ProgressBarItem_shimmer}></span>
        ) : (
          <span
            className={style.ProgressBarItem_progress}
            style={{ width: `${completionPercentage}%` }}
            aria-valuenow={completionPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
          ></span>
        )}
      </span>
      <p className={style.ProgressBarItem_text_container}>
        {completed}/{total}
      </p>
      <span className={style.tooltip}>{toolTip}</span>
    </section>
  );
};

export default ProgressBarItem;
