import { PiSpinnerGapDuotone } from "react-icons/pi";
import { MdOutlineCircle } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

import React from "react";
import style from "./spinIcon.module.css";

const SpinIcon2: React.FC = () => {
  const uncheckedRef1 = React.useRef<HTMLDivElement>(null);
  const spinnerRef2 = React.useRef<HTMLDivElement>(null);
  const checkedRef3 = React.useRef<HTMLDivElement>(null);
  const [checked, setChecked] = React.useState<string>("");
  const [isAdmin, setIsAdmin] = React.useState<boolean>(true);

  const HandleProjectCheck = () => {
    setIsAdmin((prevState) => prevState);
    if (isAdmin) {
      setChecked((prevState) => (prevState === "" ? "checked" : prevState === "checked" ? "unchecked" : "checked"));
    }
    return;
};

  React.useEffect(() => {
    let timer: number
    if (checked === "checked") {
      uncheckedRef1.current?.classList.replace(`${style.svg_active}`, `${style.svg_inactive}`);
      spinnerRef2.current?.classList.replace(`${style.svg_inactive}`, `${style.svg_active}`);
       timer = setTimeout(() => {
        spinnerRef2.current?.classList.replace(`${style.svg_active}`, `${style.svg_inactive}`);
        checkedRef3.current?.classList.replace(`${style.svg_inactive}`, `${style.svg_active}`);
      }, 800);
    } else if(checked === "unchecked") {
        checkedRef3.current?.classList.replace(`${style.svg_active}`, `${style.svg_inactive}`);
        spinnerRef2.current?.classList.replace(`${style.svg_inactive}`, `${style.svg_active}`);
         timer = setTimeout(() => {
            spinnerRef2.current?.classList.replace(`${style.svg_active}`, `${style.svg_inactive}`);
            uncheckedRef1.current?.classList.replace(`${style.svg_inactive}`, `${style.svg_active}`);
        }, 800);
    }
    return () => clearTimeout(timer);
  }, [checked]);

  return (
    <div
      data-testid="spinner2-item"
      className={style.spinner2_container}
      onClick={HandleProjectCheck}
    >
      <div ref={uncheckedRef1} className={`${style.svg_active}`}>
        <MdOutlineCircle style={{ fontSize: 24, color: `var(--navy-blue)` }} />
      </div>
      <div
        ref={spinnerRef2}
        className={`${style.spinner2} ${style.svg_inactive}`}
      >
        <PiSpinnerGapDuotone style={{ fontSize: 24, color: `var(--navy-blue)` }} />
      </div>
      <div ref={checkedRef3} className={`${style.checked} ${style.svg_inactive}`}>
        <IoCheckmarkDoneCircle style={{ fontSize: 24, color: `var(--navy-blue)` }} />
      </div>
    </div>
  );
};

export default SpinIcon2;
