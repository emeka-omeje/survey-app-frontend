import React from "react";
import style from "./questionComponents.module.css";
// import { IconType } from "react-icons";
import { emojiRatingArrayType } from "./RatingOptionsContainer";

type RatingOptionsDisplayProps = {
  numberPassedToRender: number;
  emojiPassedToRender: emojiRatingArrayType;
};

const RatingOptionsDisplay: React.FC<RatingOptionsDisplayProps> = ({
  numberPassedToRender,
  emojiPassedToRender,
}) => {
  return (
    <div className={style.ratingOption_display_container}>
      {[...Array(numberPassedToRender)].map((_, index) => (
        <div key={index} className={style.ratingOption_display}>
          <p className={style.ratingOption_display_text}>{index + 1}</p>
          <span className={style.ratingOption_display_icon}>
            <emojiPassedToRender.icon size={20} />
          </span>
        </div>
      ))}
    </div>
  );
};

export default RatingOptionsDisplay;
