import style from "./builderPageComponents.module.css";

type FormHeaderProps = {
  onGetSurveyTitle: React.Dispatch<React.SetStateAction<string>>;
};
const FormHeader: React.FC<FormHeaderProps> = ({onGetSurveyTitle}) => {
  return (
    <header className={style.formHeader_header}>
      <input type="text" placeholder="Enter survey title" />
      <textarea placeholder="Enter survey description" onChange={(e)=> onGetSurveyTitle(e.target.value)}></textarea>
    </header>
  );
};

export default FormHeader;
