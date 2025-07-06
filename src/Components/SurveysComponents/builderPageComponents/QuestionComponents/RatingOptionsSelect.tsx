import React from "react";
import style from "./questionComponents.module.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { emojiRatingArrayType } from "./RatingOptionsContainer";
// import { useAppContext } from "../../../../Utils/AppContext";

type RatingOptionsSelectProps = {
  numberPassedToRenderArray?: number[];
  emojiPassedToRenderArray?: emojiRatingArrayType[];
  getNumberOptionState?: (value: number) => void;
  getEmojiOptionState?: (value: emojiRatingArrayType) => void;
};

const RatingOptionsSelect: React.FC<RatingOptionsSelectProps> = ({
  numberPassedToRenderArray,
  emojiPassedToRenderArray,
    getNumberOptionState,
    getEmojiOptionState
}) => {
  // const { isOpen, setIsOpen } = useAppContext();
  // const [numberRatingArray, setNumberRatingArray] = React.useState<number[]>();
  // const [emojiRatingArray, setEmojiRatingArray] = React.useState<emojiRatingArrayType []>();
  const [numberRating, setNumberRating] = React.useState<number>();
  const [emojiRating, setEmojiRating] = React.useState<emojiRatingArrayType>();

  React.useEffect(() => {
      if (numberPassedToRenderArray && getNumberOptionState) {
        setNumberRating(numberPassedToRenderArray[0]);
        getNumberOptionState(numberPassedToRenderArray[0]);
      } else if (emojiPassedToRenderArray && getEmojiOptionState) {
        setEmojiRating(emojiPassedToRenderArray[0]);
        getEmojiOptionState(emojiPassedToRenderArray[0]);
      }
    return;
  }, []);

  const handleSelect = (item: number | emojiRatingArrayType) => {
    setIsOpen(false);
      if (typeof item === "number" && getNumberOptionState) {
        setNumberRating(item);
        getNumberOptionState(item);
      } else if (typeof item === "object" && getEmojiOptionState) {
          setEmojiRating(item);
          getEmojiOptionState(item);
      }
  };

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <span className={style.dropdown_rating}>
      <button className={style.dropdown_btn} onClick={() => setIsOpen(!isOpen)}>
        {numberRating ? (
          <p>{numberRating}</p>
        ) : emojiRating ? (
          <emojiRating.icon size={20} />
        ) : null}
        <MdOutlineArrowDropDown size={24} />
      </button>
      {isOpen && (
        <ul className={style.dropdown_menu}>
          {numberPassedToRenderArray
            ? numberPassedToRenderArray.map((numberLength) => (
                <li
                  key={numberLength}
                  className={
                    numberLength === numberRating ? style.dropdown_chosen : ""
                  }
                  onClick={() => handleSelect(numberLength)}
                >
                  {numberLength}
                </li>
              ))
            : emojiPassedToRenderArray
            ? emojiPassedToRenderArray.map((emojiRatingObject, index) => (
                <li
                  key={index}
                  className={
                    emojiRatingObject.value === emojiRating?.value
                      ? style.dropdown_chosen
                      : ""
                  }
                  onClick={() => handleSelect(emojiRatingObject)}
                >
                  <emojiRatingObject.icon />
                </li>
              ))
            : null}
        </ul>
      )}
    </span>
  );
};

export default RatingOptionsSelect;
