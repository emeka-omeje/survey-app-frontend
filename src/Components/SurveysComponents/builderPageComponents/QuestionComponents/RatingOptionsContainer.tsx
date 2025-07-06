import React from "react";
import style from "./questionComponents.module.css";
import { MdOutlineStarPurple500 } from "react-icons/md";
// import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { BsHandThumbsUp } from "react-icons/bs";
// import { BsHandThumbsUpFill } from "react-icons/bs";
// import { BsHandThumbsDownFill } from "react-icons/bs";
// import { BsHandThumbsDown } from "react-icons/bs";
import { BsEmojiSmile } from "react-icons/bs";

import { IconType } from "react-icons";
import RatingOptionsSelect from "./RatingOptionsSelect";
import RatingOptionsDisplay from "./RatingOptionsDisplay";

export type emojiRatingArrayType = {
  icon: IconType;
  // label: string;
  value: string;
};

const RatingInputOptions: React.FC = () => {
  const numberLengthOfRatingArray: number[] = [5, 6, 7, 8, 9, 10];
  const emojiRatingArray: emojiRatingArrayType[] = [
    {
      icon: MdOutlineStarPurple500,
      // label: "Star",
      value: "star",
    },
    {
      icon: BsEmojiSmile,
      // label: "Star",
      value: "smiley",
    },
    {
      icon: BsHandThumbsUp,
      // label: "Thumbs Up",
      value: "thumbs-up",
    },
  ];

  const [numberRating, setNumberRating] = React.useState<number>();
  const [emojiRating, setEmojiRating] = React.useState<emojiRatingArrayType>();

  return (
    <span className={style.ratingOption_wrapper}>
      <div className={style.ratingOption_container}>
        <RatingOptionsSelect
          numberPassedToRenderArray={numberLengthOfRatingArray}
          getNumberOptionState={setNumberRating}
        />
        <RatingOptionsSelect
          emojiPassedToRenderArray={emojiRatingArray}
          getEmojiOptionState={setEmojiRating}
        />
      </div>
      {numberRating && emojiRating ? (
        <RatingOptionsDisplay
          numberPassedToRender={numberRating}
          emojiPassedToRender={emojiRating}
        />
      ) : null}
    </span>
  );
};

export default RatingInputOptions;
