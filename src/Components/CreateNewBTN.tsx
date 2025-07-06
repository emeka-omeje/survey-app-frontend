import { IconType } from "react-icons";
import style from "./components.module.css";
import { useNavigate } from "react-router-dom";

type CreateNewBTNProps = {
  Title: string;
  Icon?: IconType;
  IconColor: string;
  PaddingRight?: string;
  PaddingLeft?: string;
  LinkTag: string;
};

const CreateNewBTN: React.FC<CreateNewBTNProps> = ({ Title, Icon, IconColor, PaddingRight, PaddingLeft, LinkTag }) => {

  const navigate = useNavigate()

  const HandleBTNClick = ()=>{
    navigate(LinkTag);
  }


  return (
    <button className={style.appBTN} style={{ paddingRight: `${PaddingRight}px`, paddingLeft: `${PaddingLeft}px` }} onClick={HandleBTNClick}>
      {Icon && <Icon style={{ fontSize: 20, color: `var(--${IconColor})` }}/>}
      <p>{Title}</p>
    </button>
  );
};

export default CreateNewBTN;
