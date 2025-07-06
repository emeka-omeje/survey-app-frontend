import style from "./components.module.css";

const NavigationUserTag = () => {
  return (
    <div className={style.appNav_top_layout_img_container}>
      <img
        className={style.appNav_top_layout_img}
        aria-label="User image"
        src="https://www.w3schools.com/howto/img_avatar.png"
      />
      <p>chukwuemekaomeje.rich@gmail.com</p>
    </div>
  );
};

export default NavigationUserTag;
